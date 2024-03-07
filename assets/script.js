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

