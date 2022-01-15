// html elements 
const input = document.querySelector('.input');
const detect_btn = document.querySelector('.detect-btn');
const details_area = document.querySelector('.details-area');
const temp = document.querySelector('.temp');
const city_name = document.querySelector('.city-name');
const feels_like = document.querySelector('.feels-like');
const humidity = document.querySelector('.humidity');

let api;
let apiId; // write your api id here.

input.addEventListener('keyup', (e) => {
    if (e.key == 'Enter' && input.value != '') {
        api = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&units=metric&appid=${apiId}`;
        fetchData();
    }
});

function fetchData() {
    fetch(api)
        .then(res => res.json())
        .then(result => details(result))
}

function details(info) {
    if (info.cod == "404") {
        alert(`${input.value} isn't a valid name`);
        return;
    }
    if (details_area.classList.contains("inactive")) {
        details_area.classList.replace("inactive", "active");
    }

    info.main.temp = parseInt(info.main.temp);
    info.main.feels_like = parseInt(info.main.feels_like);

    temp.innerHTML = `${info.main.temp}°C`;
    feels_like.innerHTML = `${info.main.feels_like}°C<br>feels like`;
    humidity.innerHTML = `${info.main.humidity}<br>humidity`;
    city_name.innerHTML = `${info.name}, ${info.sys.country}`;
}

detect_btn.addEventListener('click', () => {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess,onError);
    }
    else{
        alert("sorry! your browser does not support geolocation.");
    }
});

function onSuccess(pos) {
    const {latitude,longitude} = pos.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiId}`;
    fetchData();
}

function onError(error) {
    alert(error.message);
}