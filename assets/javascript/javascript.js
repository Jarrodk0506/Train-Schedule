$(document).ready(function(){
console.log("ready");
// Current Time
var currentTime = moment();
console.log("The current time is: " + moment(currentTime).format("hh:mm"));
 

    //link to firebase 
     var config = {
            apiKey: "AIzaSyBwR62PHc34hAw-qbAf_VRHLFyhcTs8pAs",
            authDomain: "test-13a00.firebaseapp.com",
            databaseURL: "https://test-13a00.firebaseio.com",
            projectId: "test-13a00",
            storageBucket: "test-13a00.appspot.com",
            messagingSenderId: "1023527513344",
            appId: "1:1023527513344:web:4c0867dd27d80aac"
          };
      
    firebase.initializeApp(config);
      
      // Create a variable to reference the database.
    var database = firebase.database();
    
    
    var name = "";
    var destination = "";
    var frequency;
    var firstTrain = "";
    
    //start submit button
    $("#submit").on("click", function(event) {
    event.preventDefault();
    
      // Get the input values
    
    
    
    var newTrain={
       name:$("#name-input").val().trim(),
       destination:$("#destination-input").val().trim(),
       frequency:$("#frequency-input").val().trim(),
       firstTrain:$("#start-input").val().trim()
    };
    
    $('input').val("");
    
    database.ref().push(newTrain);
    
    }); //end Submit button
    
    
    //start new train add
    database.ref().on("child_added", function(childSnap){   //When a new train is submitted, grab and display info.
        // console.log(childSnap.val().name);
        // console.log(childSnap.val().destination);
        // console.log(childSnap.val().frequency);
        // console.log(childSnap.val().firstTrain);  // reference checks.
        
    
    // get the frequency
    var frequency = (childSnap.val().frequency);
    frequency = parseInt(frequency);
    

    // First train
    var firstTrain = (childSnap.val().firstTrain);
    

    // First Time (pushed back 1 day to make sure it comes before current time)
    var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "day");

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    

    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    

    // Minute Until Train
    var tMinutesTillTrain = frequency - tRemainder;
    

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    nextTrain= moment(nextTrain).format("hh:mm");
        
    
        
    
    
        var tr = $("<tr>");
    
        var tdName = $("<td>").text(childSnap.val().name);
        var tdDestination = $("<td>").text(childSnap.val().destination);
        var tdFrequency = $("<td>").text(childSnap.val().frequency);
        var tdNextArrival = $("<td>").text(nextTrain);
        var tdMinutesTill = $("<td>").text(tMinutesTillTrain);
        
        
    
        tr.append(tdName).append(tdDestination).append(tdFrequency).append(tdNextArrival).append(tdMinutesTill);
        
        $("#trains").append(tr);
    }); // end new train add.
    
    
    }); //end .ready;