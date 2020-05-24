console.log('Client site js file loaded!');

fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data);
    });
});

// fetch('http://localhost:3000/weather?address=india').then((response) => {
//     response.json().then((data) => {
//         if (data.error) {
//             console.log(data.error);
//         } else {
//             console.log(data);
//         }
//     });
// });

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const messageError = document.querySelector('#message-error');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    messageOne.textContent = '';
    messageTwo.textContent = '';
    messageError.textContent = '';

    const weatherApiUrl = '/weather?address=' + location;

    fetch(weatherApiUrl).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageError.textContent = data.error;
            } else {
                messageOne.textContent = data.weather_descriptions;
                messageTwo.textContent =
                    'Current temperature is ' + data.temperature + ' but it feels like ' + data.feelslike;
            }
        });
    });
});