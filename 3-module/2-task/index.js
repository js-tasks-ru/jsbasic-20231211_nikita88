function filterRange(arr, a, b) {
  let filtered = [];

  for (let elem of arr) {
      if (elem >= a && elem <= b) {
          filtered.push(elem);
      }
  }

  return filtered;
}

let arr = [5, 3, 8, 1];
let filtered = filterRange(arr, 1, 4);

console.log(filtered); // [3,1] (совпадающие значения)
console.log(arr); // [5,3,8,1] (без изменений)