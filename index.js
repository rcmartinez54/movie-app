'use strict';

const key = '05f3d0d627b6f6d55cb015ffb7a0a0c1';
let movieId;
let trailer;

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
        fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${key}&language=en-US`)
        .then(response => response.json())
        .then(responseObject => {
            let sourceKey = responseObject.results[0].key;
            // let videoUrl = 'https://www.youtube.com/watch?v';
            // trailer = `${videoUrl}=${sourceKey}`;
            let videoUrl = 'https://www.youtube.com/embed/';
            trailer = `${videoUrl}${sourceKey}?rel=0&html5=1`;
            fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=05f3d0d627b6f6d55cb015ffb7a0a0c1`)
            .then(response => response.json())
            .then(creditResponse => {
                console.log(creditResponse);
                displayResults(newResponse, creditResponse, trailer);
            })
        })
        .catch(error => console.log(error))
    })

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
        $('#enter-site').addClass('hidden');
        $('.popular-movies-btn').delay(1000).queue(function() {
            $('.popular-movies-btn').removeClass('hidden'); 
        });
        $('.new-search').delay(1000).queue(function() {
            $('.new-search').removeClass('hidden');
        });
    });
}

function popularBtn() {
    $('.popular-movies-btn').on('click', function() {
        getPopularMovies();
        
    });
}

function newSearch() {
    $('.new-search').on('click', function(){
        $('.response-container').empty();
        $('#enter-site').removeClass('hidden');
        $('.popular-movies-btn').addClass('hidden');
        $('.new-search').addClass('hidden');
    });
}

function displayResults(newResponse, creditResponse, trailer) {
    $('.response-container').empty();
    $('.response-container').append(`
        <div class="movie-title">
            <h2>${newResponse.results[0].title}</h2>
        </div>
        <div class="poster-and-summary-container">
            <div class="poster">
                <img src="http://image.tmdb.org/t/p/w300/${newResponse.results[0].poster_path}"/>
            </div>
            <div class="poster-and-summary">
                <p>${newResponse.results[0].overview}</p>
                <h3>Cast</h3>
                <ul class="cast-list"></ul>
            </div>
        </div>
        
        <div class="movie-trailer">
            <iframe width="510" height="280" src="${trailer}" frameborder="0" allowfullscreen sandbox="allow-scripts allow-same-origin allow-presentation"></iframe>
        </div>
        
    `)
    for (let i = 0; i < creditResponse.cast.length; i++) {
        if(i <= 4) {
            $('.response-container .cast-list').append(`
                <li class="cast">${creditResponse.cast[i].name} as ${creditResponse.cast[i].character}</li>
            `)
        }
        
    }
}

function displayPopularMovies(popResponse) {
    console.log(popResponse);
    $('.popular-container').html(`
        <h2>Here Are Some Popular Movies Based On User Voting</h2>
    `)
    for (let i = 0; i < popResponse.results.length; i++) {
        if(i <= 4) {
            $('.popular-container').append(`
            <div class="movie-title">
                <h3>${popResponse.results[i].title}</h3>
            </div>
            <div class="poster-and-summary-container">
                <div class="poster">
                    <img src="http://image.tmdb.org/t/p/w300/${popResponse.results[i].poster_path}"/>
                </div>
                <div class="poster-and-summary">
                    <p>${popResponse.results[i].overview}</p>
                </div>
            </div>
                
            `)
        }
    };
    $('.popular-container').animate({scrollTop: 0}, 'slow');
}

function handleFunctions() {
    enterSite();
    submitForm();
    popularBtn();
    newSearch();
}

$(handleFunctions);