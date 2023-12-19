function checkSpam(str) {
  let strToLower = str.toLowerCase();
  if (strToLower.includes('1xbet') || strToLower.includes('xxx')) {
    return true;
  }
  return false;
}
