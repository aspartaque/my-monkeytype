let input = document.querySelector('input');
let output = document.querySelector('.m-words');

let word = 'monkeytype';
let letter = word.split('');


document.addEventListener('DOMContentLoaded', () => {
  letter.forEach((el, idx) => {
    let div = document.createElement('div');
    div.innerHTML = `<span id="letter-${idx}">${el}</span>`;
    output.appendChild(div);
  })
});

input.oninput = function() {
  let value = input.value.split('');
  letter.forEach((el, idx) => {
    let currentLetter = document.querySelector(`#letter-${idx}`);
    if (el == value[idx]) {
      currentLetter.style.color = '#fff';
    } else {
      currentLetter.style.color = '';
    }
  })
};

// fix bugs (correct iz za keys)
// parse random words
// submit and calculate wpm
// show incorrect letters
// save results in localStorage
