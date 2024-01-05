// /**
//  * Эту функцию трогать не нужно
//  */
// function print(text) {
//   console.log(text);
// }

// /**
//  * Эту функцию нужно поменять так,
//  * чтобы функция sayHello работала корректно
//  */
// function isValid(name) {
//   if (name) {
//     return ((name.indexOf(' ') < 0) && (name.length >= 4));
//   } return false;
// }

// function sayHello() {
//   let userName = prompt('Введите ваше имя');

//   if (isValid(userName)) {
//     print(`Welcome back, ${userName}!`);
//   } else {
//     print('Некорректное имя');
//   }
// }






/**
 * Эту функцию трогать не нужно
 */
function print(text) {
  console.log(text);
}

/**
 * Эту функцию нужно поменять так,
 * чтобы функция sayHello работала корректно
 * @param {string | null} name
 * @returns {boolean}
 */
function isValid(name) {
  if (name) {
    return ((name.indexOf(" ") < 0) && (name.length >= 4))
  } return false
}

/**
 * Эту функцию трогать не нужно
 */
function sayHello() {
  let userName = prompt('Введите ваше имя');

  if (isValid(userName)) {
    print(`Welcome back, ${userName}!`);
  } else {
    print('Некорректное имя');
  }
}

sayHello();