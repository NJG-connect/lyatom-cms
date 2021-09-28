## More Information about LyatomCMS

We will see together how to set up LyatomCMS on an existing Project or a new React.js project.

LaytomCms is a Git-based CMS meaning that changes are first saved to your Git repository, which then can produce a new generation of your site.

There is no database as content changes are logged via Git commits

Therefore we will create a personal git key which will act as an authentication for all your modifications on your site.

All the information of the site will be distributed in JSON files.

Authentication is managed with [Netlify Identity](https://github.com/netlify/netlify-identity-widget) as well as the hosting of the site.

which makes it possible to have a static site with a directly integrated Back Office, user management thanks to Netlify.
