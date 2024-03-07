const searchInput = $('#searchbar')
const formSection = $('form')


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