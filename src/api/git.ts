import { asyncForEach } from "../utils";
import { decodeUnicodeBase64, encodeUnicodeBase64 } from "../utils/encode";

const BASE_URL = "https://api.github.com/repos/";
async function fetchJsonDataFromGit(url: string, githubToken: string) {
  // https://api.github.com/repos/NJG-connect/landingpageCMS/contents/src/data/services.json?ref=myCMS

  try {
    const reponse = await fetch(BASE_URL + url, {
      method: "GET",
      headers: {
        Accept: "application/vnd.github.v3+json",
        Authorization: `token ${githubToken}`,
      },
    });
    if (reponse.ok) {
      const responseJSON = await reponse.json();
      const data = JSON.parse(decodeUnicodeBase64(responseJSON.content));
      return { succes: true, data, sha: responseJSON.sha };
    }
    return { succes: false, data: reponse };
  } catch (error) {
    return { succes: false, data: error };
  }
}

async function fetchImageDataFromGit(
  repo: string,
  githubToken: string,
  branch: string,
  mediaFolder: string
) {
  // https://api.github.com/repos/NJG-connect/landingpageCMS/contents/src/data/services.json?ref=myCMS

  const AllFormatImage = [
    ".jpg",
    ".jpeg",
    ".svg",
    ".png",
    ".tif",
    ".tiff",
    ".bmp",
    ".gif",
  ];
  try {
    const reponse = await fetch(
      BASE_URL + `${repo}/contents${mediaFolder}?ref=${branch}`,
      {
        method: "GET",
        headers: {
          Accept: "application/vnd.github.v3+json",
          Authorization: `token ${githubToken}`,
        },
      }
    );
    if (reponse.ok) {
      const dataJson = await reponse.json();
      const data = {};

      await asyncForEach(dataJson, async (element: any) => {
        if (
          element.type === "file" &&
          AllFormatImage.some((el) => element.name.endsWith(el))
        ) {
          const url = await getBlobFile(
            element.sha,
            githubToken,
            element.name.split(".")[1],
            repo,
            branch
          );
          data[element.name] = { name: element.name, url, sha: element.sha };
        }
      });

      return { succes: true, data };
    }
    return { succes: false, data: reponse };
  } catch (error) {
    return { succes: false, data: error };
  }
}

async function getBlobFile(
  sha: string,
  token: string,
  type: string,
  repo: string,
  branch: string
) {
  const reponseJson = await fetch(
    `https://api.github.com/repos/${repo}/git/blobs/${sha}?branch=${branch}`,
    {
      method: "GET",
      headers: {
        Accept: "application/vnd.github.v3+json",
        Authorization: `token ${token}`,
      },
    }
  );
  const response = await reponseJson.json();

  let { buffer } = Uint8Array.from(atob(response.content), (c) =>
    c.charCodeAt(0)
  );

  let blob = new Blob([buffer], {
    type: type === "svg" && "image/svg+xml",
  });
  return URL.createObjectURL(blob);
}

async function updateJsonDataOnGit(
  url: string,
  branch: string,
  data: any,
  githubToken: string
) {
  try {
    // retrieve sha from the branch
    const infoJSON = await fetch(`${BASE_URL}${url}/commits?sha=${branch}`, {
      method: "GET",
      headers: {
        Accept: "application/vnd.github.v3+json",
        Authorization: `token ${githubToken}`,
      },
    });
    const info = await infoJSON.json();

    // get the last sha from all commit
    const LastSha = info[0].sha;

    // create a branch with the last commit
    const nameOfnewBranch = `newBranch-${Date.now()}`;
    const reponseJSON = await fetch(BASE_URL + url + "/git/refs", {
      method: "POST",
      headers: {
        Accept: "application/vnd.github.v3+json",
        Authorization: `token ${githubToken}`,
      },
      body: JSON.stringify({
        ref: `refs/heads/${nameOfnewBranch}`,
        sha: LastSha,
      }),
    });

    const response = await reponseJSON.json();
    const infoFromNewBranch = {
      sha: response.sha,
      name: nameOfnewBranch,
      ref: response.ref,
    };

    // for all modification file update
    for await (const el of data) {
      const body = {
        branch: infoFromNewBranch.name,
        sha: el.sha,
        content: encodeUnicodeBase64(JSON.stringify(el.data)),
        message: "🤗 File Update from NJG Connect CMS 🤗",
      };

      await fetch(`${BASE_URL}${url}/contents${el.file}`, {
        method: "PUT",
        headers: {
          Accept: "application/vnd.github.v3+json",
          Authorization: `token ${githubToken}`,
        },
        body: JSON.stringify(body),
      });
    }

    // create a pull request with the new branch for apply content on favoris branch
    const createdPullRequestResponseJSON = await fetch(
      `${BASE_URL}${url}/pulls`,
      {
        method: "POST",
        headers: {
          Accept: "application/vnd.github.v3+json",
          Authorization: `token ${githubToken}`,
        },
        body: JSON.stringify({
          title: "🤗 Pull Request from NJG Connect CMS 🤗",
          head: infoFromNewBranch.name,
          base: branch,
        }),
      }
    );
    const createdPullRequestResponse =
      await createdPullRequestResponseJSON.json();

    // merge new branch
    const mergedPullRequestJSON = await fetch(
      `${BASE_URL}${url}/pulls/${createdPullRequestResponse.number}/merge`,
      {
        method: "PUT",
        headers: {
          Accept: "application/vnd.github.v3+json",
          Authorization: `token ${githubToken}`,
        },
        body: JSON.stringify({
          title: "🤗 Pull Request from NJG Connect CMS 🤗",
          head: infoFromNewBranch.name,
          base: branch,
        }),
      }
    );

    const mergedPullRequest = await mergedPullRequestJSON.json();

    if (mergedPullRequest.merged) {
      return { succes: true, data: "success" };
    }
    return { succes: false, data: undefined };
  } catch (error) {
    return { succes: false, data: error };
  }
}

async function postFileOnGit(
  url: string,
  file: {
    name: string;
    content: string;
    branch: string;
  },
  githubToken: string
) {
  try {
    const reponseJson = await fetch(`${BASE_URL}${url}`, {
      method: "PUT",
      headers: {
        Accept: "application/vnd.github.v3+json",
        Authorization: `token ${githubToken}`,
      },
      body: JSON.stringify({
        branch: file.branch,
        content: file.content,
        message: `New file upload: ${file.name}`,
      }),
    });

    const data = await reponseJson.json();
    if (reponseJson.ok) {
      return {
        succes: true,
        data: {
          name: data.content.name,
          url: data.content.download_url,
          sha: data.content.sha,
        },
      };
    }
    return { succes: false, data };
  } catch (error) {
    return { succes: false, data: error };
  }
}

export {
  fetchJsonDataFromGit,
  fetchImageDataFromGit,
  updateJsonDataOnGit,
  postFileOnGit,
};
