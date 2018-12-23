const API_KEY = "cfc9b47942cff33c2255f43dd9fb87f0";
const API_SEARCH_URL = "https://api.themoviedb.org/3/search/movie?api_key=" + API_KEY + "&language=en-US&page=1&include_adult=false&query=";
const IMAGE_URL = "https://image.tmdb.org/t/p/w185_and_h278_bestv2"

var cloneMedia = $(".media").clone();

$("#btnSearch").click(function () {
    var search = $("#search").val();
    
    $(".media-list").html("");

    var searchURL = API_SEARCH_URL + search;
    $.ajax({
        method: "get",
        url: searchURL
    }).done(function(msg){
        
        msg.results.forEach(function (result) {
            var liMedia = cloneMedia.clone();

            $(".media-object", liMedia).attr("src", IMAGE_URL + result.poster_path);
            $(".media-heading",liMedia).text(result.title);
            $(".ano", liMedia).text(result.release_date);
            $(".tipo", liMedia).text(result.overview);
            $(".media-list").append(liMedia);
        });
    });

    return false;
});
