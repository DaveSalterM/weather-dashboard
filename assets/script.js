const searchInput = $('#searchbar')
const formSection = $('form')
const citySeacrh = $('#city-search')
const weatherInfo = $('#weather-info')
const pastSearches = $('.past-searches')



function saveLocal(searchList) {
    localStorage.setItem('search-results', JSON.stringify(searchList))
}


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



function saveLocal(searchList) {
    localStorage.setItem('search-results', JSON.stringify(searchList))
}



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




function saveSearches () {
    let searchResults = JSON.parse(localStorage.getItem('search-results'))
    pastSearches.empty()

    if (searchResults !== null) {
    if (searchResults.length <= 10) {
    for (let i = 0; i < searchResults.length; i++) {
    const newSearch = searchResults[i];
        
    const lastResults = $('<div>')

    lastResults.addClass('h5 h-auto bg-secondary d-flex')
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

    lastResults.addClass('h5 h-auto bg-secondary d-flex')
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

        $('#weather-info').children('div').empty()
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