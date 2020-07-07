'use strict';
const searchUrl = 'https://api.github.com/users/'

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems;
}

function displayResults(responseJson) {
    console.log(responseJson);
    $('#results-list').empty();
    $('#results-list').append(
        `<li><h3><a href="${responseJson.url}">${responseJson.title}</a></h3></li>`
    );
    $('#results').removeClass('hidden')
};

function getRepo(query) {
    const params = {
        q: query,
    };
    const queryString = formatQueryParams(params)
    const url = searchUrl + queryString + '/repos';
    console.log(url);
    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => { $('#js-error-message').text(`something went wrong:${err.message}`); });
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const searchTerm = $('#js-results').val();
        getRepo(searchTerm);
    });
}
$(watchForm);