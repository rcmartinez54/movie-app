'use strict';

// API KEY = 05f3d0d627b6f6d55cb005ffb7a0a0c1

function callMovieAPI(inputVal) {
    fetch (`https://api.themoviedb.org/3/search/movie?api_key=05f3d0d627b6f6d55cb015ffb7a0a0c1&query=${inputVal}`)
    .then(response => response.json())
    .then(newResponse => displayResults(newResponse))
    .catch(error => console.log(error))
}

function submitForm() {
    $('#js-form').submit(function(event) {
        event.preventDefault();
        let inputVal = $('#js-search-movie').val();
        console.log(inputVal);
        callMovieAPI(inputVal);
    });
}

function displayResults(newResponse) {
    console.log(newResponse);
    $('.response-container').empty();
    $('.response-container').append(`
        <h2>${newResponse.results[0].title}</h2>
        <p>${newResponse.results[0].overview}</p>
        <img src="http://image.tmdb.org/t/p/w300/${newResponse.results[0].poster_path}"/>
    `)
    
}

function handleFunctions() {
    // enterSite();
    submitForm();
}

$(handleFunctions);