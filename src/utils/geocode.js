const request = require('request');

const geocode = (address, callback, errorcallback) => {
    const URL =
        'http://api.weatherstack.com/current?access_key=6e2ef593dc09ba17e120ad1ddd191cbe&units=f&query=' + address;

    request({ url: URL, json: true }, (error, response) => {
        if (error) {
            errorcallback(error);
        } else {
            const weatherData = {
                address: address,
                temperature: response.body.current.temperature,
                feelslike: response.body.current.feelslike,
                weather_descriptions: response.body.current.weather_descriptions[0]
            };
            callback(weatherData);
        }
    });
};

module.exports = geocode;