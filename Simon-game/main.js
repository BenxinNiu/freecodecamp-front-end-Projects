 $(document).ready(function() {
    var sequence = [];
    var count = 0;
    var number = 0;
    var m = 0;
    var success = 0;
    var switchon=false;
    function generate(i) {
      if (i <= 2)
        number = 2;
      else if (i <= 5)
        number = 3;
      else if (i <= 8)
        number = 5;
      else if (i <= 10)
        number = 7;
      else if (i <= 14)
        number = 9;
      else
        number = 11;
      for (var j = 0; j < number; j++) {
        sequence.push(Math.floor(Math.random() * 4));
      }
      $(".nam").html(sequence);
    };

    function flash(id) {
      $("#" + id).addClass("light");
      var stop = setTimeout(function() {
        $("#" + id).removeClass("light");
      }, 300); // change time step later !!!!!!!!
    };
    
    function Message(){
       $(".count").html("!!");
     var stop = setTimeout(function() {
         $(".count").html(" ");
      }, 500); // change time step later !!!!!!!!
      $(".count").html(count);
    };
    

    function play() {
      var k = 0;
      var interval = setInterval(function() {
        flash(sequence[k]);
        k++;
        if (k === sequence.length) {
          clearInterval(interval);
          $('.click').removeClass("noclick").addClass('clickable');
          finished = true;
        }
      }, 1000); // change time step later !!!!!!!!

    };

    function displayCount(i) {
      $(".count").html(i);
    };

    function start() {
      $('.click').click(function() {
        var button = $(this).attr("id");
        var key = sequence[m].toString();
        if (button === key) {
          success++;
          m++;
        } else {
          Message();
          m =0;
          success=0;
          play();
        }
        if (success == sequence.length) {
          sequence = [];
          m=0;
          success =0;
          count++;
          displayCount(count);
          generate(count);
          play();
        }
  
        console.log(success);
      })

    }
    
    

    // only change code above this line==============================
    $('.slide').click(function() {
      $('.block').toggleClass('toggle-off');
      if (switchon=false){
        $('.count').html("--");
        sequence = [];
        count = 0;
        number = 0;  
        m = 0;  
       success = 0; 
        switchon=false;
      }
      
      if (switchon===false&&$('.block').hasClass("toggle-off")===false){
        switchon=true;
         $('.start').click(function(){
           sequence = [];
        count = 0;
        number = 0;  
        m = 0;  
       success = 0; 
        generate(count);
      play();
      start();
      })
      }
     
      
    });

  }); //end