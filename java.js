var pixarCharacters = ["Buzz Lightyear", "Woody", "Slinky Dog", "Mr. Potato Head", "Mike Wazowski", "Dory", "Mr. Incredible", "Frozone", "Lightning McQueen", "WALL-E", "Carl Fredrickson"]

var displayMeme = function() {

    var character = $(this).attr("data-name")    
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + character + "&limit=10&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response)
        for (var i = 0; i < response.data.length; i++) {
            $("#memes-view").prepend(`<img class="displayed gif" src="${response.data[i].images.fixed_height_still.url}" data-change="${response.data[i].images.fixed_height.url}">`)
        }
    })
}

// var animateMeme = function() {
//     //Add new Ajax call here, because I can't access the response.data outside of that call
//     var clickedMeme = $(this).attr("src", response.data.images.fixed_height.url)
//     console.log(clickedMeme)
// }

var renderButtons = function() {

    $("#buttons-view").empty();

    for (var i = 0; i < pixarCharacters.length; i++) {
        var newButton = $("<button>")
        newButton.addClass("meme-type")
        newButton.attr("data-name", pixarCharacters[i])
        newButton.text(pixarCharacters[i])
        $("#buttons-view").append(newButton)        
    }
}

$("#add-meme").on("click", function(event) {

    event.preventDefault();

    var newCharacter = $("#meme-input").val().trim();

    pixarCharacters.push(newCharacter);

    renderButtons();
})

renderButtons();

$(document).on("click", ".meme-type", displayMeme);

$(document).on("click", ".gif", function() {
    var placeholder = $(this).attr("src");
    $(this).attr("src", $(this).attr("data-change"));
    $(this).attr("data-change", placeholder);
});
