const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const searchbox = document.querySelector('.search-box input');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const cityHide = document.querySelector('.city-hide');

search.addEventListener('click', containt);
searchbox.addEventListener('keypress', (e)=>{
    if(e.key ==="Enter"){
        containt();
        console.log(`chala`)
    }
});

function containt(){

    const APIKey = 'aec8efd6bd0c3b035a7d798e88d855ea';
    const city = document.querySelector('.search-box input').value;

    if (city == '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
    .then((Response)=>{
        return Response.json()
    })
    .then((json)=>{

        if(json.cod == '404'){
            cityHide.textContent = city;
            container.style.height = '400px';
            weatherBox.classList.remove('active');
            weatherDetails.classList.remove('active');
            error404.classList.add('active');
            return

        }

        
            
        const image = document.querySelector('.weather-box img')
        const temperature = document.querySelector('.weather-box .temperature')
        const description = document.querySelector('.weather-box description')
        const wind = document.querySelector('.weather-box .wind span')
        const humidity = document.querySelector('.weather-box .humidity span')

        if(cityHide.textContent == city){
            return;
        }
        else{
            cityHide.textContent = city;

            container.style.height = '555px';
            container.classList.add('active');
            weatherBox.classList.add('active');
            weatherDetails.classList.add('active');
            error404.classList.remove('active');

            setTimeout(()=>{
                container.classList.remove('active');
            },2500)

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.png';
                    break;
                    
                case 'Rain':
                    image.src = 'images/rain.png';
                    break;
    
                case 'Snow':
                    image.src = 'images/snow.png';
                    break;
    
                case 'Clouds':
                    image.src = 'images/cloud.png';
                    break;
    
                case 'Mist':
                    image.src = 'images/mist.png';
                    break;
    
                case 'Haze':
                    image.src = 'images/haze.png';
                    break;
            
                default:
                    image.src = 'images/cloud.png';
            }
    
            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`
            description.innerHTML = `${Json.weather[0].description}`
            humidity.innerHTML = `${json.main.humidity}%`
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`

            const infoWeather = document.querySelector('.info-weather');
            const infoHumidity = document.querySelector('.info-humidity');
            const infoWind = document.querySelector('.info-wind');

            const elCloneInfoWeather = infoWeather.cloneNode(true);
            const elCloneInfoHumidity = infoHumidity.cloneNode(true);
            const elCloneInfoWind = infoWind.cloneNode(true);

            elCloneInfoWeather.id = 'clone-info-weather';
            elCloneInfoWeather.classList.add('active-clone');
            
            elCloneInfoHumidity.id = 'clone-info-humidity';
            elCloneInfoHumidity.classList.add('active-clone');
            
            elCloneInfoWind.id = 'clone-info-wind';
            elCloneInfoWind.classList.add('active-clone');


            setTimeout(()=>{
                infoWeather.insertAdjacentElement("afterend",elCloneInfoWeather)
                infoHumidity.insertAdjacentElement("afterend",elCloneInfoHumidity)
                infoWind.insertAdjacentElement("afterend",elCloneInfoWind)
            },2200)

            const CloneInfoWeather = document.querySelectorAll('.info-weather.active-clone');
            const totalCloneInfoWeather = CloneInfoWeather.length;
            const cloneInfoWeaterFirst = CloneInfoWeather[0];
            
            const CloneInfoHumidity = document.querySelectorAll('.info-humidity.active-clone');
            const cloneInfoHumidityFirst = CloneInfoHumidity[0];

            const CloneInfoWind = document.querySelectorAll('.info-weather.active-clone');
            const cloneInfoWindFirst = CloneInfoWind[0];


            if(totalCloneInfoWeather>0){
                cloneInfoWeaterFirst.classList.remove('action-clone');
                cloneInfoHumidityFirst.classList.remove('action-clone');
                cloneInfoWindFirst.classList.remove('action-clone');
            }

            setTimeout(() => {
                cloneInfoWeaterFirst.remove();
                cloneInfoHumidityFirst.remove();
                cloneInfoWindFirst.remove();
            }, 2200);

        }

    })
}
