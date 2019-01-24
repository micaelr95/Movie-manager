const API_KEY = '?api_key=cfc9b47942cff33c2255f43dd9fb87f0';
const API_BASE_URL = 'https://api.themoviedb.org/3/';
const API_POPULAR_URL = API_BASE_URL + 'movie/popular' + API_KEY;
const API_SEARCH_URL = API_BASE_URL + 'search/movie' + API_KEY + '&language=en-US&page=1&include_adult=false&query=';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2'
const DETAILS_PAGE = 'details.html?id='

let cardClone = $('.card').clone();

function index_media(msg) {
    $('.row').html('');
    msg.results.forEach(function (result) {
        let card = cardClone.clone();

        $('#nav', card).attr('href', DETAILS_PAGE + result.id)
        $('#poster', card).attr('src', IMAGE_URL + result.poster_path);
        $('#title',card).text(result.title);
        $('#release-date', card).text(result.release_date);
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
    $('.row').append(card);
}

function details_media(result) {
    $('#poster').attr('src', IMAGE_URL + result.poster_path);
    $('#title').text(result.title);
    $('#release-date').text(result.release_date);
    $("#movie-details").text(result.overview);
    $('#vote_average').text(result.vote_average + '/10');
    result.genres.forEach(element => {
        $('<p>').text(element.name).appendTo('#genres');
    });
}

function getPageName() {
    return $(location).attr("href").split("/").slice(-1).toString();
}

function getMovieID() {
    let link = getPageName();
    return link.split("=").slice(-1).toString();
}

$(function () {
    let link = getPageName();
    
    if(link == "index.html") {
        
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
        $.ajax({
            method: 'GET',
            url: API_BASE_URL + 'movie/' + getMovieID() + API_KEY
        }).done(details_media);
        if(typeof(localStorage) !== 'undefined'){
            if(localStorage.getItem('wishlist')) {
                var arr = JSON.parse(localStorage.getItem('wishlist'));
                let exists = arr.indexOf(getMovieID());
                if(exists >= 0)
                {
                    $("#btn_wishlist").removeClass('btn-dark');
                    $("#btn_wishlist").addClass('btn-success');
                }
            }
            if(localStorage.getItem('viewed')) {
                var arr = JSON.parse(localStorage.getItem('viewed'));
                let exists = arr.indexOf(getMovieID());
                if(exists >= 0)
                {
                    $("#btn_viewed").removeClass('btn-dark');
                    $("#btn_viewed").addClass('btn-success');
                }
            }
            if(localStorage.getItem('watching')) {
                var arr = JSON.parse(localStorage.getItem('watching'));
                let exists = arr.indexOf(getMovieID());
                if(exists >= 0)
                {
                    $("#btn_watching").removeClass('btn-dark');
                    $("#btn_watching").addClass('btn-success');
                }
            }
        } else {
            console.log('LocalStorage not suported');
        }
        $.ajax({
            method: 'GET',
            url: API_BASE_URL + 'movie/' + getMovieID() + '/similar' + API_KEY
        }).done(index_media);
    }
});

$('#btnSearch').click(function () {
    let search = $('#search').val();
    $('.row').html('');
    $('#page-info').text('Search results for ' + search);
    $.ajax({
        method: 'GET',
        url: API_SEARCH_URL + search
    }).done(index_media);

    return false;
});

function addWishlist() {
    if(typeof(localStorage) !== 'undefined'){
        if(localStorage.getItem('wishlist')) {
            var arr = JSON.parse(localStorage.getItem('wishlist'));
        } else {
            var arr = [];
        }
        let exists = arr.indexOf(getMovieID());
        if(exists < 0)
        {
            $("#btn_wishlist").removeClass('btn-dark');
            $("#btn_wishlist").addClass('btn-success');
            arr.push(getMovieID());
        } else {
            $("#btn_wishlist").removeClass('btn-success');
            $("#btn_wishlist").addClass('btn-dark');
            arr.pop(getMovieID());
        }
        localStorage.setItem('wishlist', JSON.stringify(arr));
    } else {
        console.log('LocalStorage not suported');
    }
}

function addViewed() {
    if(typeof(localStorage) !== 'undefined'){
        if(localStorage.getItem('viewed')) {
            var arr = JSON.parse(localStorage.getItem('viewed'));
        } else {
            var arr = [];
        }
        let exists = arr.indexOf(getMovieID());
        if(exists < 0)
        {
            $("#btn_viewed").removeClass('btn-dark');
            $("#btn_viewed").addClass('btn-success');
            arr.push(getMovieID());
        } else {
            $("#btn_viewed").removeClass('btn-success');
            $("#btn_viewed").addClass('btn-dark');
            arr.pop(getMovieID());
        }
        localStorage.setItem('viewed', JSON.stringify(arr));
    } else {
        console.log('LocalStorage not suported');
    }
}

function addWatching() {
    if(typeof(localStorage) !== 'undefined'){
        if(localStorage.getItem('watching')) {
            var arr = JSON.parse(localStorage.getItem('watching'));
        } else {
            var arr = [];
        }
        let exists = arr.indexOf(getMovieID());
        if(exists < 0)
        {
            $("#btn_watching").removeClass('btn-dark');
            $("#btn_watching").addClass('btn-success');
            arr.push(getMovieID());
        } else {
            $("#btn_watching").removeClass('btn-success');
            $("#btn_watching").addClass('btn-dark');
            arr.pop(getMovieID());
        }
        localStorage.setItem('watching', JSON.stringify(arr));
    } else {
        console.log('LocalStorage not suported');
    }
}