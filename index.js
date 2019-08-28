'use strict';

const key = '05f3d0d627b6f6d55cb015ffb7a0a0c1';
let movieId;

function enterSite() {
    $('#enter').on('click', function() {
        $('.main-contain').addClass('hidden');
        $('.form').removeClass('hidden');
    });
}

function callMovieAPI(inputVal) {
    
    fetch (`https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${inputVal}`)
    .then(response => response.json())
    .then(newResponse => {
        movieId = newResponse.results[0].id;
        return fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${key}&language=en-US`)
        .then(response => response.json())
        .then(responseObject => {
            let sourceKey = responseObject.results[0].key;
            let videoUrl = 'https://www.youtube.com/watch?v';
            let trailer = `${videoUrl}=${sourceKey}`;
            console.log(trailer);
        })
    })
    .then(newResponse => displayResults(newResponse)
    .catch(error => console.log(error)))
}

// function getMovieTrailer(movieId) {
//     console.log(movieId);
//     fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${key}&language=en-US`)
//     .then(response => response.json())
//     .then(responseObject => {
//         let sourceKey = responseObject.results[0].key;
//         let videoUrl = 'https://www.youtube.com/watch?v';
//         let trailer = `${videoUrl}=${sourceKey}`;
//         return trailer;
//     })
// }

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
        $('.form').addClass('hidden');
        $('.popular-movies-btn').delay(1000).queue(function() {
            $('.popular-movies-btn').removeClass('hidden'); 
        });
    });
}

function popularBtn() {
    $('.popular-movies-btn').on('click', function() {
        console.log('im here');
        getPopularMovies();
    });
}

function displayResults(newResponse) {
    $('.response-container').empty();
    $('.response-container').append(`
        <video controls src="#" width="600">
            Sorry, your browser does not support embedded videos, but don't fret, you can <a href="#">click here</a> to watch it!
        </video>
        <h2>${newResponse.results[0].title}</h2>
        <img src="http://image.tmdb.org/t/p/w300/${newResponse.results[0].poster_path}"/>
        <p>${newResponse.results[0].overview}</p>      
    `)
}

function displayPopularMovies(popResponse) {
    console.log(popResponse);
    $('.popular-container').html(`
        <h2>Here Are Some Popular Movies Based On User Voting</h2>
    `)
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
    popularBtn();
}

$(handleFunctions);