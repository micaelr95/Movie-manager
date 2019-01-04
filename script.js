const API_KEY = 'cfc9b47942cff33c2255f43dd9fb87f0';
const API_BASE_URL = 'https://api.themoviedb.org/3/';
const API_POPULAR_URL = API_BASE_URL + 'movie/popular?api_key=' + API_KEY;
const API_SEARCH_URL = API_BASE_URL + 'search/movie?api_key=' + API_KEY + '&language=en-US&page=1&include_adult=false&query=';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2'

let cloneMedia = $('.media').clone();

function media(msg) {
    msg.results.forEach(function (result) {
        let liMedia = cloneMedia.clone();

        $('.media-object', liMedia).attr('src', IMAGE_URL + result.poster_path);
        $('.media-heading',liMedia).text(result.title);
        $('.ano', liMedia).text(result.release_date);
        $('.tipo', liMedia).text(result.overview);
        $('.media-list').append(liMedia);
    });
}

$(function () {
    $('.media-list').html('');

    console.log(API_POPULAR_URL);
    $.ajax({
        method: 'GET',
        url: API_POPULAR_URL
    }).done(media);
});

$('#btnSearch').click(function () {
    let search = $('#search').val();
    
    $('.media-list').html('');

    $.ajax({
        method: 'GET',
        url: API_SEARCH_URL + search
    }).done(media);

    return false;
});
