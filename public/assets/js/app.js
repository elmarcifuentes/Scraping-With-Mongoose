// Grab the articles as a json
$.getJSON("/articles", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
        // Display article in bootstrap card
        var cardDiv = $("<div>").addClass("card");
        var image = $("<img>").attr("src", "http://via.placeholder.com/350x150").addClass("card-img-top");
        var bodyDiv = $("<div>").addClass("card-body");
        var articleTitle = $("<h5>").html(data[i].title).addClass("card-title");
        var articleLink = $("<a>").html("Read Article").attr("href", "http://www.latimes.com" + data[i].link).addClass("btn btn-primary");
        var noteLink = $("<button>").html("Add Note").attr("data-id", data[i]._id).addClass("btn btn-primary");
        bodyDiv.append(articleTitle, articleLink, noteLink);
        cardDiv.append(image, bodyDiv);
        $("#articles").append(cardDiv);
    }
});


// add Note on button Click
$(document).on("click", "button", function() {
    // Empty the notes from the note section
    $("#notes").empty();
    // Save the id
    var thisId = $(this).attr("data-id");

    // Ajax Call
    $.ajax({
            method: "GET",
            url: "/articles/" + thisId
        })
        // Add the note information to the page
        .then(function(data) {
            console.log(data);
            $("#notes").append("<h5>" + data.title + "</h5>");
            $("#notes").append("<input id='titleinput' name='title' >");
            $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
            $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

            if (data.note) {
                $("#titleinput").val(data.note.title);
                $("#bodyinput").val(data.note.body);
            }
        });
});

// Save note button
$(document).on("click", "#savenote", function() {
    var thisId = $(this).attr("data-id");

    $.ajax({
            method: "POST",
            url: "/articles/" + thisId,
            data: {
                title: $("#titleinput").val(),
                body: $("#bodyinput").val()
            }
        })
        .then(function(data) {
            console.log(data);
            $("#notes").empty();
        });

    // clear the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
});