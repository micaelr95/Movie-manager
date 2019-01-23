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
        console.log(card);
        $('.row').append(card);
    });
}

function lists_media(result) {
    let card = cardClone.clone();

    $('#nav', card).attr('href', DETAILS_PAGE + result.id);
    console.log(DETAILS_PAGE + result.id);
    $('#poster', card).attr('src', IMAGE_URL + result.poster_path);
    console.log(IMAGE_URL + result.poster_path);
    $('#title',card).text(result.title);
    $('#release-date', card).text(result.release_date);
    console.log(card);
    $('.row').append(card);
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
    } else if(link == "wishlist.html") {
        $('.row').html('');
        let wishlist = JSON.parse(localStorage.getItem('wishlist'));
        wishlist.forEach(function (id) {
            $.ajax({
                method: 'GET',
                url: API_BASE_URL + 'movie/' + id + API_KEY
            }).done(lists_media);
        });
    } else if(link == "viewed.html") {
        $('.row').html('');
        let viewed = JSON.parse(localStorage.getItem('viewed'));
        viewed.forEach(function (id) {
            $.ajax({
                method: 'GET',
                url: API_BASE_URL + 'movie/' + id + API_KEY
            }).done(lists_media);
        });
    } else if(link == "watching.html") {
        $('.row').html('');
        let watching = JSON.parse(localStorage.getItem('watching'));
        watching.forEach(function (id) {
            $.ajax({
                method: 'GET',
                url: API_BASE_URL + 'movie/' + id + API_KEY
            }).done(lists_media);
        });
    } else {
        let id = link.split("=").slice(-1).toString();
        $.ajax({
            method: 'GET',
            url: API_BASE_URL + 'movie/' + id + API_KEY
        }).done(details_media);
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

function addWishlist() {
    let link = $(location).attr("href").split("/").slice(-1).toString();
    let id = link.split("=").slice(-1).toString();
    if(typeof(localStorage) !== 'undefined'){
        if(localStorage.getItem('wishlist')) {
            var arr = JSON.parse(localStorage.getItem('wishlist'));
        } else {
            var arr = [];
        }
        arr.push(id);
        localStorage.setItem('wishlist', JSON.stringify(arr));
    } else {
        console.log('LocalStorage not suported');
    }
}
function addViewed() {
    let link = $(location).attr("href").split("/").slice(-1).toString();
    let id = link.split("=").slice(-1).toString();
    if(typeof(localStorage) !== 'undefined'){
        if(localStorage.getItem('viewed')) {
            var arr = JSON.parse(localStorage.getItem('viewed'));
        } else {
            var arr = [];
        }
        arr.push(id);
        localStorage.setItem('viewed', JSON.stringify(arr));
    } else {
        console.log('LocalStorage not suported');
    }
}
function addWatching() {
    let link = $(location).attr("href").split("/").slice(-1).toString();
    let id = link.split("=").slice(-1).toString();
    if(typeof(localStorage) !== 'undefined'){
        if(localStorage.getItem('watching')) {
            var arr = JSON.parse(localStorage.getItem('watching'));
        } else {
            var arr = [];
        }
        arr.push(id);
        localStorage.setItem('watching', JSON.stringify(arr));
    } else {
        console.log('LocalStorage not suported');
    }
}