export function arrayChunks(arr, chunk = 10) {
  const chunks = []
  var i, j, temporary;
  for (i = 0, j = arr.length; i < j; i += chunk) {
    temporary = arr.slice(i, i + chunk);
    chunks.push(temporary)
  }
  return chunks
}
