$(document).ready(function(){
  var entry="";  
  var answer;
  var currVal="";
  var val=[];
  var equalPressed=false;
  var startUp=true;
  var numberPressed=true;
  $(".button").click(function(){
     entry=$(this).attr("value");
   if (entry=="/"||entry=="*"||entry=="-"||entry=="+"){ // operator is pressed 
     var lastOperator=val[val.length-1];
      if(startUp===false){
     if(!isNaN(lastOperator)){
     equalPressed=false;
     numberPressed=false;
     val.push(currVal);
     val.push(entry);
     currVal="";
     $(".result").html(val.join(""));
     $(".log").html("");
     }
        else if(lastOperator!==entry){
           val.pop();
           numberPressed=false;
           equalPressed=false;
           val.push(currVal);
           val.push(entry);
           currVal="";
           $(".result").html(val.join(""));
           $(".log").html("");
        }
        else{
          if(numberPressed==true){
            numberPressed=false;
            equalPressed=false;
           val.push(currVal);
           val.push(entry);
           currVal="";
           $(".result").html(val.join(""));
           $(".log").html("");
          }
        }
     
     
     }
     
   }
    else if(entry=="C"){
      startUp=true;
       equalPressed=false;
      val=[];
      currVal=[];
      $(".result").html("");
      $('.log').html("");
    }
     else if (entry=="ec"){
        currVal="";
       $('.log').html("");
      }
    else if(entry=="%"){
      if(currVal.length>=1){
        currVal=currVal/100;
         $(".result").html(currVal);
      }
      if(equalPressed===true){
        currVal=currVal/100;
         $(".result").html(currVal);
      } 
    }

    else if(!isNaN(entry)){
      if (equalPressed===false){
         numberPressed=true;
        startUp=false;
      currVal+=entry;
      $(".log").html(currVal);
      }
    }
     else if (entry=="."){
      var currValArr=currVal.split("");
      if(currValArr.indexOf(".")==-1){
        currVal+=entry;
         $(".log").html(currVal);
      }
    }
    else{
     val.push(currVal);
     answer=eval(val.join(" "));
     currVal=answer;
      val=[];
      equalPressed=true;
     $('.result').html(answer);
      $('.log').html("");
    }
  }) 
});