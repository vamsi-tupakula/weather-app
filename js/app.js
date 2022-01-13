// html elements 
const input = document.querySelector('.input');
const city_temp = document.querySelector('.temp');
const city_name = document.querySelector('.city-name');
const feels_like = document.querySelector('.feels-like');
const humidity = document.querySelector('.humidity');

input.addEventListener('keyup', (e) => {
    if(e.key == 'Enter' && input.value != '') {
        alert(`you entered ${input.value}`);
    }
});