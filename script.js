const API_KEY = '?api_key=cfc9b47942cff33c2255f43dd9fb87f0';
const API_BASE_URL = 'https://api.themoviedb.org/3/';
const API_POPULAR_URL = API_BASE_URL + 'movie/popular' + API_KEY;
const API_SEARCH_URL = API_BASE_URL + 'search/movie' + API_KEY + '&language=en-US&page=1&include_adult=false&query=';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2'
const DETAILS_PAGE = 'details.html?id='

let cardClone = $('.card').clone();

function index_media(msg) {
    msg.results.forEach(function (result) {
        let card = cardClone.clone();

        $('#nav', card).attr('href', DETAILS_PAGE + result.id)
        $('#poster', card).attr('src', IMAGE_URL + result.poster_path);
        $('#title',card).text(result.title);
        $('#release-date', card).text(result.release_date);
        $('.row').append(card);
    });
}

function details_media(result) {
    $('#poster').attr('src', IMAGE_URL + result.poster_path);
    $('#title').text(result.title);
    $('#release-date').text(result.release_date);
    $("#movie-details").text(result.overview);
}

$(function () {
    let link = $(location).attr("href").split("/").slice(-1).toString();
    
    if(link == "index.html") {
        $('.row').html('');
        $.ajax({
            method: 'GET',
            url: API_POPULAR_URL
        }).done(index_media);
    } else {
        let id = link.split("=").slice(-1).toString();
        $.ajax({
            method: 'GET',
            url: API_BASE_URL + 'movie/' + id + API_KEY
        }).done(details_media);
        console.log(id);
    }
});

$('#btnSearch').click(function () {
    let search = $('#search').val();
    
    $('.row').html('');

    $.ajax({
        method: 'GET',
        url: API_SEARCH_URL + search
    }).done(index_media);

    return false;
});
