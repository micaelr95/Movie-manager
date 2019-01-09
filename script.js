const API_KEY = 'cfc9b47942cff33c2255f43dd9fb87f0';
const API_BASE_URL = 'https://api.themoviedb.org/3/';
const API_POPULAR_URL = API_BASE_URL + 'movie/popular?api_key=' + API_KEY;
const API_SEARCH_URL = API_BASE_URL + 'search/movie?api_key=' + API_KEY + '&language=en-US&page=1&include_adult=false&query=';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2'
const DETAILS_PAGE = 'details.html?id='

let cardClone = $('.card').clone();

function media(msg) {
    msg.results.forEach(function (result) {
        let card = cardClone.clone();

        $('#nav', card).attr('href', DETAILS_PAGE + result.id)
        $('#poster', card).attr('src', IMAGE_URL + result.poster_path);
        $('#title',card).text(result.title);
        $('#release-date', card).text(result.release_date);
        $('.row').append(card);
    });
}

$(function () {
    $('.row').html('');

    let link = $(location).attr("href").split("?").slice(-1).toString();
    let movie_id = parseInt(link.substr(3, link.length));

    console.log(movie_id);
    if(movie_id.isInteger())
    {

    } else {
        $.ajax({
            method: 'GET',
            url: API_POPULAR_URL
        }).done(media);
    }
});

$('#btnSearch').click(function () {
    let search = $('#search').val();
    
    $('.row').html('');

    $.ajax({
        method: 'GET',
        url: API_SEARCH_URL + search
    }).done(media);

    return false;
});
