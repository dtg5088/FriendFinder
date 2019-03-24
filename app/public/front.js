window.alert('test')

// In this code below we create the Front-end JavaScript which "POSTS" our form data to our express server.
  // In essence, when the user hits submit, jQuery grabs all of the fields then sends a post request to our api
  // Our api recognizes the route (/api/tables)... and then runs the associated code (found in api-routes.js).
  // In this case the associated code "saves" the data to the table-data.js file or waitinglist-data.js file

  var friendsData = require("../data/friends");

  // Get the modal
  var modal = document.getElementById('myModal');
  var btn = document.getElementById("submit");
  var span = document.getElementsByClassName("close")[0];

  

  $("#submit").on("click", function(event) {
    var scoreDifferences = [];

    event.preventDefault();
      
    // Here we grab the form elements
    var newSubmission = {
      name: $("#name").val().trim(),
      photo: $("#photo").val().trim(),
      score: [
        $("#q1").val().trim(),
        $("#q2").val().trim(),
        $("#q3").val().trim(),
        $("#q4").val().trim(),
        $("#q5").val().trim(),
        $("#q6").val().trim(),
        $("#q7").val().trim(),
        $("#q8").val().trim(),
        $("#q9").val().trim(),
        $("#q10").val().trim()
      ],
    };

    console.log(newSubmission);
    modal.style.display = "block";

    // This line is the magic. It"s very similar to the standard ajax function we used.
    // Essentially we give it a URL, we give it the object we want to send, then we have a "callback".
    // The callback is the response of the server. In our case, we set up code in api-routes that "returns" true or false
    // depending on if a tables is available or not.

    $.post("/api/friends", newSubmission, function(data) {

        // If a table is available... tell user they are booked.
        if (data) {
          
          //call compare function or loop for 
          for(var i=0; i < friendsData.length; i++){

            compare(newSubmission.score, friendsData.scores)

          }
          modal.style.display = "block";
        }

        // Clear the form when submitting
        $("#name").val(""),
        $("#photo").val(""),
        $("#q1").val(""),
        $("#q2").val(""),
        $("#q3").val(""),
        $("#q4").val(""),
        $("#q5").val(""),
        $("#q6").val(""),
        $("#q7").val(""),
        $("#q8").val(""),
        $("#q9").val(""),
        $("#q10").val("")

      });

      function compare(userArray, arr2){
        var totalDifference = 0;

        userArray.forEach((e1) =>arr2.forEach((e2)=>
        {
          totalDifference =+ Math.abs(e1-e2)
          console.log("This is the difference of e1("+e1+") and e2("+e2+") :-"+totalDifference)

        }));
        scoreDifferences.push(totalDifference);
        console.log("score Difference is: "+scoreDifferences)
      }

  });