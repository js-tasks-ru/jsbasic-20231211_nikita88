function getMinMax(str) {
  const numbers = str.split(" ")
    .filter(token => !isNaN(Number(token)))
    .map(token => Number(token));
  const min = Math.min(...numbers);
  const max = Math.max(...numbers);
  return {
    min,
    max
  };
}