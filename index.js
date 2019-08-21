'use strict';

const key = '05f3d0d627b6f6d55cb005ffb7a0a0c1';

function enterSite() {
    $('#enter').on('click', function() {
        $('.main-contain').addClass('hidden');
        $('.form').removeClass('hidden');
    });
}

function callMovieAPI(inputVal) {
    fetch (`https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${inputVal}`)
    .then(response => response.json())
    .then(newResponse => displayResults(newResponse))
    .catch(error => console.log(error))
}

function getPopularMovies() {
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=05f3d0d627b6f6d55cb015ffb7a0a0c1&language=en-US&page=1')
    .then(response => response.json())
    .then(popResponse => displayPopularMovies(popResponse))
    .catch(error => console.log(error))
}

function submitForm() {
    $('#js-form').submit(function(event) {
        event.preventDefault();
        let inputVal = $('#js-search-movie').val();
        callMovieAPI(inputVal);
        getPopularMovies();
    });
}

function displayResults(newResponse) {
    $('.response-container').empty();
    $('.response-container').append(`
        <h2>${newResponse.results[0].title}</h2>
        <p>${newResponse.results[0].overview}</p>
        <img src="http://image.tmdb.org/t/p/w300/${newResponse.results[0].poster_path}"/>
    `)
}

function displayPopularMovies(popResponse) {
    console.log(popResponse);
    for (let i = 0; i < popResponse.results.length; i++) {
        $('.popular-container').append(`
            <h2>${popResponse.results[i].title}</h2>
            <p>${popResponse.results[i].overview}</p>
            <img src="http://image.tmdb.org/t/p/w300/${popResponse.results[i].poster_path}"/>
        `)
    };
}

function handleFunctions() {
    enterSite();
    submitForm();
}

$(handleFunctions);