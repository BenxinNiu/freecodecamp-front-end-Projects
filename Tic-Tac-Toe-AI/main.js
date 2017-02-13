// To replay Please use in debug mode as the codepen block location.reload(); 

$(document).ready(function() {
    var urlBatman = "http://www.freelogovectors.net/wp-content/uploads/2013/02/Batman_256.png";
    var urlJoker = "http://files.gamebanana.com/img/ico/sprays/5283a534a23e1.png";
    var player,url,q,nextMove,playerWin,pcWin,key,randonm,playerUrl;
  var currentPath=[]; //computer path
  var pathRemain=[];// where eles can i go?
  var playerPath=[];
  var playerWinning=[];
  var winningPath=[];// possible winning path
  var win=false;
  var found=false;
  var playerMove;
  var grid=["1","2","3","4","5","6","7","8","9"];
  var path=["1","2","3","4","5","6","7","8","9"];
    var combo = [
      ["1", "2", "3"],
      ["4", "5", "6"],
      ["7", "8", "9"],
      ["1", "4", "7"],
      ["2", "5", "8"],
      ["3", "6", "9"],
      ["1", "5", "9"],
      ["7", "5", "3"]
    ];
   
  function reset(){
    $('.block').html(' ');
    $('.block').removeClass("computer");
    $('.block').removeClass("player");
    currentPath=[]; //computer path
   playerPath=[];
   playerWinning=[]; //player winning change which is zero haha
   winningPath=[];// possible winning path of pc
   win=false;
   found=false;
  path=["1","2","3","4","5","6","7","8","9"];
  };
  
    function displayMove(id) {
      id = "#" + id;
      $(id).append("<img class='icon-mover' src='" + url + "'>")
      $(id).addClass("computer"); // can not click twice!!!
    };

    function chooseRole() { // choose role 
      var role;
      $('.role').click(function() {
         role = $(this).attr("id");
        $('.pannel').fadeOut(1600, function() {
          $('.board').fadeIn(800, function() {
            $('.board').removeClass("hidden");
          });
        });
         });
      return role;
    };
  
  function checkPlayerPath(move){
    found=false;
    var close=0;
     playerWinning=combo.filter(function(j){
      if (j.indexOf(move)!==-1)
        return true;
    });
    for (var i=0;i<currentPath.length;i++){
    playerWinning=playerWinning.filter(function(j){
      if (j.indexOf(currentPath[i])==-1)
        return true;
    });
    }
    console.log(playerWinning);
    console.log(playerPath);
    for(var m=0;m<playerWinning.length&&found===false;m++){
        close=0;
    for(var k=0;k<playerPath.length;k++){
       if (playerWinning[m].indexOf(playerPath[k])!==-1){
         close++;
       }
     }
      if (close>=2&&close<3){
        for (var z=0;z<3&&found===false;z++){
           key=playerWinning[m][z];
          if ($("#"+key).hasClass("player")===false){
             key=playerWinning[m][z];
          found=true;
          }
        }
      }
      else if (close==3){
        key="playerWin";
      }
      else 
        key="no";
  }
    return key;
  };
  
  function checkForPath(){ //also check if player is winning
    for (var i=0;i<playerPath.length;i++){
    winningPath=winningPath.filter(function(j){
      if (j.indexOf(playerPath[i])==-1)
        return true;
    });
    }
  nextMove=checkPlayerPath(playerMove);
    console.log(nextMove);
  };
  
function checkForMove(id){
  winningPath=combo.filter(function(j){
      if (j.indexOf(id)!==-1)
        return true;
    });
   for (var i=0;i<playerPath.length;i++){
    winningPath=winningPath.filter(function(j){
      if (j.indexOf(playerPath[i])==-1)
        return true;
    });
    }  
 // console.log(winningPath);
};
  
  function makeMove(){
    if (nextMove!=="PlayerWin"&&nextMove!=="no"){
      displayMove(nextMove);
      currentPath.push(nextMove);
      path.splice(path.indexOf(nextMove),1);
      q=nextMove;
    }
    else if ($("#9").hasClass("player")===false&&$("#9").hasClass("computer")===false){
      displayMove("9");
      currentPath.push("9");
      path.splice(path.indexOf("9"),1);
      q="9";
    } 
    else {
       randonm= Math.floor(Math.random()*path.length);
      console.log(path[randonm]);
      displayMove(path[randonm]);
      currentPath.push(path[randonm]);
      path.splice(path.indexOf(path[randonm]),1);
      q=path[randonm];
    }
    
  };
  
  function checkWinner(){
  for (var a=0;a<combo.length&&win===false;a++){
     var gameOver=combo[a];
    pcWin=0;
    playerWin=0;
    for (var b=0;b<3;b++){
      if($("#"+gameOver[b]).hasClass("computer"))
        pcWin++;
      else if ($("#"+gameOver[b]).hasClass("player"))
        playerWin++;
    }
    if(pcWin>=3){
      win=true;
      reset();
      $('.whoWins').html("Loser HaHaHa~~~")
      $('.board').fadeOut(1600, function() {
          $('.result').fadeIn(800, function() {
            $('.result').removeClass("hidden");
          });
        });
    }
   else if(playerWin>=3){
      win=true;
     reset();
     setTimeout(function(){
       $('.whoWins').html("Awesome!!!")
      $('.board').fadeOut(1600, function() {
          $('.result').fadeIn(800, function() {
            $('.result').removeClass("hidden");
          });
        });
     },2000);
      
    }
    else if(currentPath.length+playerPath.length==9){
      reset();
       $('.whoWins').html("It was a draw. not bad!!")
      $('.board').fadeOut(1600, function() {
          $('.result').fadeIn(800, function() {
            $('.result').removeClass("hidden");
          });
        });
    }   
    
    
  }  
  };
  
  
  //only change code above ++++++
  
var a= chooseRole();
  console.log(a);
  if(a=="joker"){
    url=urlBatman;
    checkForMove("1");
  path.splice(path.indexOf("1"),1);
  currentPath.push("1");
   $("#1").append("<img class='icon-mover' src='" + urlBatman + "'>");
  $("#1").addClass("computer");
     $('.block').click(function() {
      $(this).addClass("player");
      $(this).append("<img class='icon-mover' src='" + urlJoker + "'>");
       playerMove=$(this).attr("id");
      path.splice(path.indexOf(playerMove),1);
      playerPath.push(playerMove);
      checkForPath();
      makeMove();
     checkForMove(q);
     checkWinner();
    }) 
  }
  else{
    url=urlJoker;
    checkForMove("1");
  path.splice(path.indexOf("1"),1);
  currentPath.push("1");
   $("#1").append("<img class='icon-mover' src='" + urlJoker + "'>");
  $("#1").addClass("computer");
    $('.block').click(function() {
      $(this).addClass("player");
      $(this).append("<img class='icon-mover' src='" + urlBatman + "'>");
       playerMove=$(this).attr("id");
      path.splice(path.indexOf(playerMove),1);
      playerPath.push(playerMove);
      checkForPath();
      makeMove();
     checkForMove(q);
     checkWinner();
    })  
  }
  
    $(".restart").click(function(){
     location.reload();
    });
  }) //end