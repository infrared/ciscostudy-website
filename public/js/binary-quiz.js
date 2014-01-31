

$(function() {
    
    var total = 0;
    var question = startQuiz();
    $('#question').html(question);
    var binary = question.toString(2);
    var split =  binary.split('');
    
    $('div[data-role="binary"]').click(function() {
        
       // console.log($(this).html());
        
        if ($(this).html() === "0") {
            var value = $(this).data('value');
            total = parseInt(total) + parseInt(value);
            $(this).html('1');
            $(this).removeClass('off').addClass('on');
        } else {
            var value = $(this).data('value');
            total = parseInt(total) - parseInt(value);
            $(this).html('0');
            $(this).removeClass('on').addClass('off');
        }
        
        console.log(total);
        
    });
    
    
});


var startQuiz = function() {
    
    
    $('div[data-role="binary"]').removeClass('on').addClass('off');
    $('div[data-role="binary"]').html('0');
    return Math.floor((Math.random()*255)+1);
}