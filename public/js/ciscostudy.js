
var answer = '';

//$(document).ready(function() {
//    startquiz();
//});

counter = null;
timerValue = null;
startTimer = 2;
quizInSession = null;




$(document).ready(function() {
    $("#slideTimer").slider({
      range: "max",
      min: 1,
      max: 8,
      value: startTimer,
      slide: function( event, ui ) {
          clearTimeout(counter);
         $( "#timerValue" ).text( ui.value * 15 );
         startTimer = ui.value;
         timerValue =  ui.value * 15;
         if ($('#includeTimer').is(':checked')) {
             if (gameInSession) {
                 counter = setInterval(myTimer,1000);
             }
    
         } else {
             clearTimeout(counter);
         }


         
      
         // console.log(ui.value);
      }
    });
    
    $("#includeTimer").click(function() {
        if ($('#includeTimer').is(':checked')) {
            if (gameInSession) {
                counter = setInterval(myTimer,1000);
            }
        
        } else {
            clearTimeout(counter);
        }
    });
    
    
    
    
    var initialTimer = $( "#slideTimer" ).slider( "value" ) * 15;
    $( "#timerValue" ).text( initialTimer );
    timerValue = initialTimer;
    startquiz();
});

function myTimer() {
    timerValue = timerValue - 1;
    console.log("tick: " + timerValue);
    $("#timerValue").text(timerValue);
    if (timerValue <= 0) {
        clearInterval(counter);
        giveUp();
        $('#comment').text("Time's Up!");
        return;
    }
}

function startquiz() {

    $.ajax({
        type: 'GET',
        url: '/quiz',
        success: function(data) {
            $('#question').fadeOut(function() {
                console.log(data);
                var index = Math.floor((Math.random()*2));
                $('#question').text(data.ip + ' / ' + data.mask[index]);
                answer = data.answer;
            });
            $('#question').fadeIn(250);
        },
    });
    $('#question').fadeIn(250);
    $("#answer").prop('disabled', false);
    $("#answer").val('');
    $("#buttonGiveUp").removeAttr('disabled');
    $("#buttonNext").attr("disabled", "disabled");
    $("#comment").text('');
    $( "#timerValue" ).text( startTimer * 15 );
    gameInSession = 1;
    if ($('#includeTimer').is(':checked')) {
        counter = setInterval(myTimer,1000);
    
    } else {
        clearTimeout(counter);
    }

    
    
};


$('#answer').keyup(function() {
    var input = $('#answer').val();
    var distance = levenshtein(input, answer);
    
    var correct = [ "Awesome!", "Amazing!", "Rock on!", "Smokin!", "Good Job!", "Nice Bro!", "Sweet!", "You rock!", "Kick ass!" ];

    var myArray = [ "Almost there!", "getting close!", "think you have what it takes?" ];
    console.log(distance);

    if (distance < 4 && distance > 0) {
        var response = myArray[distance -1];
        $('#comment').text(response);
        console.log(response);
    }
    if(distance < 1) {
        clearTimeout(counter);
        timerValue = startTimer * 15;
        var index = Math.floor(Math.random()* correct.length); 
        var praise = correct[index];
        $("#answer").blur();
        $("#answer").prop('disabled', true);
        $('#comment').text(praise);
        console.log(praise);
        $("#buttonGiveUp").attr("disabled", "disabled");
        $("#buttonNext").removeAttr('disabled');
        gameInSession = null;
        //answer is correct
    }
});
function giveUp() {
    clearTimeout(counter);
    timerValue = startTimer * 15;
    $("#buttonNext").removeAttr('disabled');
    $("#buttonGiveUp").attr("disabled", "disabled");
    $("#answer").prop('disabled', true); 
    $("#answer").val(answer);   
    gameInSession = null;
    
    
}
$('#buttonGiveUp').click(function() {
    giveUp();
    

});
$('#buttonNext').click(function() {
    startquiz();
    
});