// API KEY
// 05f3d0d627b6f6d55cb015ffb7a0a0c1
// https://api.themoviedb.org/3/movie/550?api_key=05f3d0d627b6f6d55cb015ffb7a0a0c1

'use strict';

// function enterSite() {
//     $('.js-enter-btn').on('click', function(event) {
//         event.preventDefault();
//         $('.main-contain').html(
//             `<form id="js-form">
//                 <label for="search-movie">Enter Movie Title</label>
//                 <input type="text" name="search-movie" id="js-search-movie" placeholder="Enter Movie Title">
//                 <button type="submit" class="submit-btn">Submit</button>
//             </form>`
//         );
//     });
// }

function submitForm() {
    $('#js-form').submit(function(event) {
        event.preventDefault();
        let inputVal = $('#js-search-movie').val();
        console.log(inputVal);
    });
}

function handleFunctions() {
    // enterSite();
    submitForm();
}

$(handleFunctions);