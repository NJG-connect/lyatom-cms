
  function substringBetween(
    stringValue: string,
    characterBeginWith: string,
    endCharacterWith: string
  ) {
    var newValue =
      stringValue.indexOf(characterBeginWith) + characterBeginWith.length;
    return (
      stringValue.substring(
        newValue,
        stringValue.indexOf(endCharacterWith, newValue)
      ) || undefined
    );
  }

  /**
   *  this function do EVERYTHING !!!!
   *  by a path, it regains its specific value if addValue is added it inserts this value and returns the entire object with its modified value
   *  */ 
  function resolvePathToRealObjectWithArray(path: string, obj: any, addValue?: any) {
    const newObj = JSON.parse(JSON.stringify({...obj}))
   const value = path.split(".").reduce((prev, curr, currenIndex, initalArray) => {
  
      if (curr === "[]") {
        if (!Array.isArray(prev)) {
          return undefined;
        }
        return prev.map((el) => {
          return el;
        });
      } else if (
        curr.startsWith("[") &&
        curr.endsWith("]") &&
        curr.length >= 3
      ) {
        const indexValue: number | undefined = Number(
          substringBetween(curr, "[", "]")
        );
        return prev && indexValue !== undefined ? prev[indexValue] : undefined;
      } else {
        if (Array.isArray(prev)) {
          const newArray = prev.map((el) => el[curr]);
          if (newArray.every((el) => el !== undefined)) {
            return newArray;
          }
          return undefined;
        } else {
          if(currenIndex === initalArray.length -1 && addValue  !== undefined){
            return prev[curr] = addValue
          }
          return prev ? prev[curr] : undefined;
        }
      }
    }, newObj);
      return addValue !== undefined ? newObj : value;
  }

// create a asyncForeach
   async function asyncForEach<T>(array: Array<T>, callback: (item: T, index: number) => void) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index);
    }
}

  export {substringBetween,resolvePathToRealObjectWithArray, asyncForEach}