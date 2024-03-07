const searchInput = $('#searchbar')
const formMain = $('form')
const form = document.querySelector('form')
const citySeacrh = $('#city-search')
const weatherInfo = $('#weather-info')
const pastSearches = $('.past-searches')
const dateFormat = dayjs().format('MM/DD/YYYY')
const weatherCards = $('#weather-cards')

// Save to local storage
function saveLocal(searchList) {
    localStorage.setItem('search-results', JSON.stringify(searchList))
}

// Load saved data from local storage
function loadLocal() {
    let searchResults = localStorage.getItem('search-results')
    console.log(searchResults)

    if (searchResults===null) {
        searchResults = []
        return searchResults
    } else {
        searchResults = JSON.parse(localStorage.getItem('search-results'))
        return searchResults
    }
}


// Saves past searches and displays them on left side
function saveSearches () {
    let searchResults = JSON.parse(localStorage.getItem('search-results'))
    pastSearches.empty()

    if (searchResults !== null) {
    if (searchResults.length <= 10) {
    for (let i = 0; i < searchResults.length; i++) {
    const newSearch = searchResults[i];

    const lastResults = $('<div>')

    lastResults.addClass('h5 h-auto bg-light d-flex')
    lastResults.attr('style', 'width: 80%; min-height: 40px;')
    lastResults.attr('id', `previous-results-${[i]}`)
    lastResults.attr('data-city-name', `${searchResults[i]}`)
        
    const returnResults = $('<h5>')
        returnResults.attr('style', 'margin:auto')
        returnResults.attr('id', `previous-results-${[i]}`)
        returnResults.text(newSearch)
        
    lastResults.append(returnResults)
    pastSearches.append(lastResults)
                
    }
        
    } else {
    for (let i = 0; i < 5; i++) {

    const newSearch = searchResults[i];

    const lastResults = $('<div>')
        lastResults.addClass('h5 h-auto d-flex')
        lastResults.attr('style', 'width: 80%; min-height: 40px;')
        lastResults.attr('id', `previous-results-${[i]}`)
        lastResults.attr('data-city-name', `${searchResults[i]}`)

    const returnResults = $('<h5>')
        returnResults.attr('style', 'margin:auto', 'id', `previous-results-${[i]}`)
        returnResults.attr('id', `previous-results-${[i]}`)
        returnResults.text(newSearch)

    lastResults.append(returnResults)
    pastSearches.append(lastResults)
                
    }
}
}}

// Grabs weather data from openweathermap API
function weatherResults(event) {
    event.preventDefault();

    const city = searchInput.val()
    const openWeatherMap = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=b3c89b198d75e42b324fef56894937ee`

    fetch(openWeatherMap).then(function(response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        const cityName = data.name
        const temp = data.main.temp
        const humidity = data.main.humidity
        const wind = data.wind.speed
        let weather = data.weather[0].main
        console.log(weather)
        const latitude = data.coord.lat
        const longitude = data.coord.lon

        if (weather ==='Clouds') {weather = '☁️'} 
        else if (weather ==='Clear') {weather = '🌞'} 
        else if (weather ==='Drizzle') {weather = '🌧️'} 
        else if (weather ==='Fog'){weather = '🌁'} 
        else if (weather ==='Haze') {weather = '🌁 '} 
        else if (weather==='Mist') {weather = '🌁 '} 
        else if (weather ==='Rain') {weather = '☔'} 
        else if (weather ==='Snow') { weather = '❄️'} 
        else if (weather ==='Thunderstorm') {weather = '⛈️'} 
        else if (weather ==='Tornado') {weather = '🌪️ '
        }

        $('#weather-info').children().empty()
        $('#weather-cards').empty()

        const cityInfo = $('<div>')
            cityInfo.addClass('card-container')
            cityInfo.attr('id', 'card-data')
        
        weatherInfo.children('h3').text(`${cityName} (${dayjs().format('M/D/YY')}) ${weather}`)

        const cityTemp = $('<h5>')
            cityTemp.addClass('city-temp')
            cityTemp.attr('style', 'margin-top:auto')
            cityTemp.text(`Temperature: ${temp} F`)

        const cityWind = $('<h5>')
            cityWind.addClass('city-wind')
            cityWind.text(`Wind: ${wind} MPH`)

        const cityHumidity = $('<h5>')
            cityHumidity.addClass('city-humidity')
            cityHumidity.text(`Humidity: ${humidity}%`)

        weatherInfo.append(cityInfo)
        cityInfo.append(cityTemp, cityHumidity, cityWind)

        weatherForecast(latitude, longitude)    

        let searchResults = loadLocal() 

        const lastSearch = searchResults.includes(cityName)
        if (lastSearch === false) {
            searchResults.unshift(cityName)
        }
        
        saveLocal(searchResults)
    
        saveSearches()  
    })
    searchInput.val('')
}

// Click function for previous searches
function clickCards(id) {
    
    let city;
    const citySearch = pastSearches.children()

    for (let i = 0; i < citySearch.length; i++) {
        const citySearchLog = citySearch[i].attributes[2].nodeValue
        console.log(citySearchLog);
        const citySearchResults = citySearch[i].attributes[3].nodeValue
        console.log(citySearchResults);
        if (citySearchLog === id) {city = citySearchResults}   
    }
    
    const openWeatherMap = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=b3c89b198d75e42b324fef56894937ee`

    searchInput.text('')

    fetch(openWeatherMap).then(function(response) {
        return response.json();
    })

    .then(function (data) {
        console.log(data);
        const cityName = data.name
        const temp = data.main.temp
        const wind = data.wind.speed
        let weather = data.weather[0].main
        const humidity = data.main.humidity
        console.log(weather)
        const latitude = data.coord.lat
        const longitude = data.coord.lon

        if (weather ==='Clouds') {weather = '☁️'} 
        else if (weather ==='Clear') {weather = '🌞'} 
        else if (weather ==='Drizzle') {weather = '🌧️'} 
        else if (weather ==='Fog'){weather = '🌁'} 
        else if (weather ==='Haze') {weather = '🌁 '} 
        else if (weather==='Mist') {weather = '🌁 '} 
        else if (weather ==='Rain') {weather = '☔'} 
        else if (weather ==='Snow') { weather = '❄️'} 
        else if (weather ==='Thunderstorm') {weather = '⛈️'} 
        else if (weather ==='Tornado') {weather = '🌪️ '
        }

        $('#weather-cards').empty()
        $('#weather-info').children().empty()

//HTML id information
        const cityInfo = $('<div>')
            cityInfo.addClass('card-container')
            cityInfo.attr('id', 'card-data')
        
        weatherInfo.children('h3').text(`${cityName} ${weather}`)

        const cityTemp = $('<h5>')
            cityTemp.addClass('city-temp')
            cityTemp.attr('style', 'margin-top:auto')
            cityTemp.text(`Temp: ${temp} F`)

        const cityHumidity = $('<h5>')
            cityHumidity.addClass('city-humidity')
            cityHumidity.text(`Humidity: ${humidity}%`)
        
        const cityWind = $('<h5>')
            cityWind.addClass('city-wind')
            cityWind.text(`Wind: ${wind} MPH`)

        weatherInfo.append(cityInfo)
        cityInfo.append(cityTemp)
        cityInfo.append(cityWind)
        cityInfo.append(cityHumidity)

        weatherForecast(latitude, longitude)    
        
        let searchResults = loadLocal() 
        saveLocal(searchResults)
    
        saveSearches()
        
    })

}

// Information to populate Weather Forecast Cards
function weatherForecast(latitude, longitude) {

    const openWeatherApi = `https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=${latitude}&lon=${longitude}&appid=b3c89b198d75e42b324fef56894937ee`

    fetch(openWeatherApi).then(function(response) {
        return response.json();
    })

    .then(function (data) {
        console.log(data);
        const openWInfo = data.list
        for (let i = 0; i < openWInfo.length; i+=8) {
            let forecastWeather = openWInfo[i].weather[0].main
            const forecastTemp = openWInfo[i].main.temp
            const forecastHumidity = openWInfo[i].main.humidity
            const forecastWind = openWInfo[i].wind.speed
            const forecastDate = dayjs(openWInfo[i].dt_txt)
            const fullDate = forecastDate.format('M/D/YY')

            if (forecastWeather ==='Clouds') {forecastWeather = '☁️'} 
        else if (forecastWeather ==='Clear') {forecastWeather = '🌞'} 
        else if (forecastWeather ==='Drizzle') {forecastWeather = '🌧️'} 
        else if (forecastWeather ==='Fog'){forecastWeather = '🌁'} 
        else if (forecastWeather ==='Haze') {forecastWeather = '🌁 '} 
        else if (forecastWeather==='Mist') {forecastWeather = '🌁 '} 
        else if (forecastWeather ==='Rain') {forecastWeather = '☔'} 
        else if (forecastWeather ==='Snow') { forecastWeather = '❄️'} 
        else if (forecastWeather ==='Thunderstorm') {forecastWeather = '⛈️'} 
        else if (forecastWeather ==='Tornado') {forecastWeather = '🌪️ '
        }

// Populates weather cards
        const weatherCard = $('<div>')
            weatherCard.addClass('card col-lg-2 m-3')
            weatherCard.attr('style')
            weatherCards.append(weatherCard)
        
        const weatherCardDate = $('<div>')
            weatherCardDate.addClass('card-header h3')
            weatherCardDate.text(fullDate)
            weatherCard.append(weatherCardDate)

        const weatherCardBody = $('<div>')
            weatherCardBody.addClass('card-body h3 d-flex flex-column justify-content-evenly')
            weatherCard.append(weatherCardBody)

        const weatherCardInfo = $('<div>')
            weatherCardInfo.addClass('card-text h5')
            weatherCardInfo.text(forecastWeather)
            weatherCardBody.append(weatherCardInfo)

        const weatherCardTemp = $('<div>')
            weatherCardTemp.addClass('card-text h5')
            weatherCardTemp.text(`Temp: ${forecastTemp} F`)
            weatherCardBody.append(weatherCardTemp)

        const weatherCardWind = $('<div>')
            weatherCardWind.addClass('card-text h5')
            weatherCardWind.text(`Wind: ${forecastWind} MPH`)
            weatherCardBody.append(weatherCardWind)

        const weatherCardHumidity = $('<div>')
            weatherCardHumidity.addClass('card-text h5')
            weatherCardHumidity.text(`Humidity: ${forecastHumidity}%`)
            weatherCardBody.append(weatherCardHumidity)
    }
})
}

// Used to select previously searched cities
function selectOldCard(event) {
    const mousePointer = event.target.id
    console.log(mousePointer);
    clickCards(mousePointer)
}

pastSearches.on('click', selectOldCard)

form.addEventListener('submit', weatherResults)

saveSearches()








