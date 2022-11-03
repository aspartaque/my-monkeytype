const quoteApiUrl = 'https://api.quotable.io/random?minLength=80&maxLength=100';

let input = document.querySelector('input');
let output = document.querySelector('.m-words');
let result = document.querySelector('#m-result');
let accuracy = document.querySelector('#m-accuracy');
let outputMistakes = document.querySelector('#m-mistakes');
let outputTimer = document.querySelector('#m-timer');
let btnStart = document.querySelector('#btnStart');

let quote = '';
let time = 60;
let timer = '';
let mistakes = 0;

//render random words
const renderNewQuote = async () =>  {
  const response = await fetch(quoteApiUrl);
  let data = await response.json();
  quote = data.content;
  
  let arr = quote.split('').map((value) => {
    return '<span class="quote-chars">' + value + '</span>';
  });

  output.innerHTML += arr.join('');
};

//change input
input.oninput = () => {
  let quoteChars = document.querySelectorAll('.quote-chars');
  quoteChars = Array.from(quoteChars);
  let userInputChars = input.value.split('');

  quoteChars.forEach((el, idx) => {
    if(el.innerText == userInputChars[idx]) 
    {
      el.classList.add('correct');
    } 
    else if(userInputChars[idx] == null) 
    {
      if(el.classList.contains('correct')) {
        el.classList.remove('correct');
      }
      else {
        el.classList.remove('fail');
      }
    } 
    else 
    {
      if(!el.classList.contains('fail')) {
        mistakes += 1;
        el.classList.add('fail');
      }
      outputMistakes.innerText = mistakes;
    }
  });

  let check = quoteChars.every((element) => {
    return element.classList.contains('correct');
  });

  if(check) {
    showResult();
  }
};

const startTest = () => {
 mistakes = 0;
  timer = '';
  timeReduce();
}

function updateTimer() {
  if(time == 0) {
    showResult();
  } else {
    outputTimer.innerText = --time;
  }
}

const timeReduce = () => {
  time = 60;
  timer = setInterval(updateTimer, 1000);
}

const showResult = () => {
  clearInterval(timer);
  let timeTaken = 1;
  if(time != 0) {
    timeTaken = (60 - time) / 100;
  }
  result.innerText = 'wpm - ' + (input.value.length / 5 / timeTaken).toFixed(2);
  accuracy.innerText = Math.round((input.value.length - mistakes) / input.value.length) * 100 + '% - accuracy';
}

window.onload = () => {
  renderNewQuote();
}







// fix bugs (correct iz za keys) - done
// parse random words - done
// submit and calculate wpm - done
// show incorrect letters - done
// save results in localStorage
