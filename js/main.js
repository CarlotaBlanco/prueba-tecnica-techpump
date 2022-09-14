'use strict';
const stepOneButton = document.querySelector('.js_step_one_button');
const stepTwoButton = document.querySelector('.js_step_two_button');
const stepOneSection = document.querySelector('.js_step_one_section');
const stepTwoSection = document.querySelector('.js_step_two_section');
const congratulationsSection = document.querySelector(
  '.js_congratulations_section'
);
const yearRadioButtons = document.querySelectorAll('.js_radio_year');
const characterRadioButtons = document.querySelectorAll('.js_radio_option');

const codeResult = document.querySelector('.js_code_number');
const copyButton = document.querySelector('.js_copy_button');

let numberCode = 7;
let characterCode = 'VAJA';

//Visualizar los pasos del formulario
function stepOne(event) {
  event.preventDefault();
  stepTwoSection.classList.remove('hidden');
  stepOneSection.classList.add('hidden');
}

function stepTwo(event) {
  event.preventDefault();
  stepTwoSection.classList.add('hidden');
  congratulationsSection.classList.remove('hidden');
}
//Obtener y renderizar el código
function yearValue(event) {
  const yearValue = event.currentTarget.value;
  numberCode = yearValue;
  renderCode(numberCode, characterCode);
}

function characterValue(event) {
  const characterValue = event.currentTarget.value;
  characterCode = characterValue;
  renderCode(numberCode, characterCode);
}

function renderCode(number, characters) {
  codeResult.innerHTML = number + characters;
}
renderCode(numberCode, characterCode);

//Copiar al portapapeles
function copyToClickBoard(event) {
  event.preventDefault();
  var content = codeResult.innerHTML;

  navigator.clipboard
    .writeText(content)
    .then(() => {
      console.log('Text copied to clipboard...');
    })
    .catch((err) => {
      console.log('Something went wrong', err);
    });
}

//Cuenta atrás

let minutos = 20;
let segundos = 0;

segundos = segundos * 1000;
minutos = minutos * 60000;

let end = Date.now() + minutos + segundos;

let _second = 1000;
let _minute = _second * 60;
let _hour = _minute * 60;
let _day = _hour * 24;
let timer;

function showRemaining() {
  let now = new Date();
  let distance = end - now;
  if (distance < 0) {
    clearInterval(timer);
    document.querySelector(
      '.js_countdown'
    ).innerHTML = `<p class="form__timer--text">Código caducado. <a class="form__timer--link" href="javascript:location.reload()">Reiniciar</a></p>`;
    document.querySelector('.js_form_timer').classList.remove('on_time');
    document.querySelector('.js_form_timer').classList.add('expired');
    return;
  }

  let minutes = Math.floor((distance % _hour) / _minute);
  let seconds = Math.floor((distance % _minute) / _second);

  document.querySelector(
    '.js_countdown'
  ).innerHTML = `<p class="form__timer--countdown">${minutes}:${seconds}</p>`;
}

timer = setInterval(showRemaining, 1000);

//Listeners

for (const eachYearRadioButton of yearRadioButtons) {
  eachYearRadioButton.addEventListener('click', yearValue);
}

for (const eachCharacterRadioButton of characterRadioButtons) {
  eachCharacterRadioButton.addEventListener('click', characterValue);
}

stepOneButton.addEventListener('click', stepOne);
stepTwoButton.addEventListener('click', stepTwo);
copyButton.addEventListener('click', copyToClickBoard);
