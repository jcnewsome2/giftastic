// Initial array of Sports teams
$(document).ready(function(){
    var topics = [' Dallas Stars', 'Miami Dolphins', 'Manchester United', 'usmnt', 'Florida Marlins', 'Texas Rangers', 'Miami Heat'];

    // ========================================================

  //  create topics array buttons
    function buttonTeam(){
        $('#buttonsView').empty();
        
        for ( var i=0; i < topics.length; i++) {
            //create all buttons
            var a = $('<button>');
            a.addClass('teams');
            a.attr('data-name', topics[i]);
            a.text(topics[i]);
            $('#buttonsView').append(a);
        }
    }    
    buttonTeam();
   

//on button click
  $(document).on('click', '.teams', function() {

    var team = $(this).html(); 
    console.log(team);
    
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + team + "&api_key=834a108abc0f4972b9eb2df4ded9ab9b&limit=10";
        // console.log(queryURL);
        $.ajax({url: queryURL, method: 'GET'})
        .done(function(response) {
            // grabs the data
            var results = response.data;
            // console.log(results);
            //empties the div before adding more gifs
            $('#teamView').empty();
                //loops through the data
                for ( var j=0; j < results.length; j++) {
                    var imageDiv = $('<div>');
                    var imageView = results[j].images.fixed_height.url;
                    var still = results[j].images.fixed_height_still.url;
                        // console.log(imageView);  
                    var teamImage = $('<img>').attr("src", still).attr('data-animate', imageView).attr('data-still', still);
                    teamImage.attr('data-state', 'still');
                    $('#teamView').prepend(teamImage);
                    teamImage.on('click', playGif);
                    
                    // pulling the rating
                        var rating = results[j].rating;
                            // console.log(rating);
                        var displayRated= $('<p>').text("Rating: " + rating);
                        $('#teamView').prepend(displayRated);
            
                } //for loop
        }); // done response

        function playGif() { 
                    var state = $(this).attr('data-state');
                    console.log(state);
                 if ( state == 'still'){
                     $(this).attr('src', $(this).data('animate'));
                      $(this).attr('data-state', 'animate');
                 } else{
                     $(this).attr('src', $(this).data('still'));
                     $(this).attr('data-state', 'still');
                    }

                } //on click teams
                
    }) // document on click

       


//adding new button
$(document).on('click', '#addTeam', function(){
    if ($('#team-input').val().trim() == ''){
      alert('Input can not be left blank');
   }
   else {
    var team = $('#team-input').val().trim();
    topics.push(team);
    $('#team-input').val('');
    buttonTeam();
    return false;

    }

});



});  //document ready
