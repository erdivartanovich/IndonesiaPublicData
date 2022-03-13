export function arrayChunks(arr, chunk = 10) {
  const chunks = []
  var i, j, temporary;
  for (i = 0, j = arr.length; i < j; i += chunk) {
    temporary = arr.slice(i, i + chunk);
    chunks.push(temporary)
  }
  return chunks
}

export function promiseEach(arr, fn) {
  // validation
  if (!Array.isArray(arr)) return Promise.reject(new Error("Non array passed!"));
  if (arr.length === 0) return Promise.resolve();

  return arr.reduce(function(prev, cur) {
    return prev.then(() => fn(cur))
  }, Promise.resolve());
}
