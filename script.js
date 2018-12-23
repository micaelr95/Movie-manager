const API_KEY = "cfc9b47942cff33c2255f43dd9fb87f0";
const API_URL = "https://api.themoviedb.org/3/movie/550?api_key=" + API_KEY + "&";

var cloneMedia = $(".media").clone();

$("#btnSearch").click(function () {
    var search = $("#search").val();
    
    $(".media-list").html("");

    var searchURL = API_URL + "s=" + search;
    console.log(searchURL);

    $.ajax({
        "method": "GET",
        url: searchURL
    }).done(function(msg){
        msg.Search.forEach(function (result) {
            var liMedia = cloneMedia.clone();

            $(".media-object", liMedia).attr("src", result.backdrop_path);
            $(".media-heading",liMedia).text(result.Title);
            $(".ano", liMedia).text(result.Year);
            $(".tipo", liMedia).text(result.Type);
            $(".media-list").append(liMedia);
        });
    });
});
