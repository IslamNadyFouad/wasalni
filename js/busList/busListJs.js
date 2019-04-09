$( document ).ready(function() {
  var parameters = location.search.substring(1).split("&");
	     	var temp = parameters[0].split("=");
		     x = unescape(temp[1]);
       var temp2=parameters[1].split("=");
       y = unescape(temp2[1]);
      
       
        var temp3=parameters[2].split("=");
       z = unescape(temp3[1]);
       document.getElementById('titleOfDate').innerHTML=z;
       document.getElementById('titleOfDay').innerHTML=getDayNameAr(new Date(z).getDay());
        var temp4=parameters[3].split("=");
        w = unescape(temp4[1]);
       
       var temp5=parameters[4].split("=");
       v = unescape(temp5[1]);
       if(v=="one")
       {$("#returnList").css("visibility","hidden");}
       
       //console.log(v);
     var da=new Date(z);var currentDay=da.getDay();
     console.log("the Day : "+getDayNameEn(currentDay));
    
    showList(x,y, getDayNameEn(currentDay));
    var s,d;
      var ref = firebase.database().ref().child("BusSchedule");
    ref.once("value", function(snapshot) {
     snapshot.forEach(function(item){
      
            if(item.val().sourceEn==x)
            {
             $("#titleOfSource").text(item.val().sourceAr);s=item.val().sourceAr;
            }
            
            if(item.val().destinationEn==y)
            {
              $("#titleOfDestination").text(item.val().destinationAr);d=item.val().destinationAr;
            }
     });
          
}, function (error) {
   console.log("Error: " + error.code);
});
 
 //function checkX(doc)
 //{
 // if(doc.data().sourceEn==x)
 //   {
 //    document.getElementById('receive').innerHTML=doc.data().sourceEn;
 //   }
 // 
 //}
 
  $("#returnList").click(function() {
        $(this).css('background-color',"rgba(64,64,64,0.4)");
        $("#goList").css('background-color',"rgba(64,64,64,1)");
         document.getElementById('titleOfDate').innerHTML=w;
          document.getElementById('titleOfDay').innerHTML=getDayNameAr(new Date(w).getDay());
         $("#titleOfSource").text(d);
         $("#titleOfDestination").text(s);
         showList(y,x, getDayNameEn(currentDay));
     });
    
        $("#goList").click(function() {
            $(this).css('background-color',"rgba(64,64,64,0.4)");
            $("#returnList").css('background-color',"rgba(64,64,64,1)");
            
             document.getElementById('titleOfDate').innerHTML=z;
              document.getElementById('titleOfDay').innerHTML=getDayNameAr(new Date(z).getDay());
             $("#titleOfSource").text(s);
             $("#titleOfDestination").text(d);
             showList(x,y, getDayNameEn(currentDay));
         });
        
        
        
 
 function showList(sourcex,destinationx,day)
 {
  var ref = firebase.database().ref().child("BusSchedule");
     var i=1;
   ref.once("value", function(snapshot) {
  // console.log(snapshot.val());
   snapshot.forEach(function(item){
    if(item.val().sourceEn==sourcex && item.val().destinationEn==destinationx)
   setBus(item,i);i++;
    });
   }, function (error) {
   console.log("Error: " + error.code);
   });
 }
    
    
   function setBus(doc,i){
     
       console.log("the "+doc.val().busId);
    $('#listOfBuses').empty();
       $('#listOfBuses').append("<div class='show-default accordion' id='itm"+i+"'></div>");
       var idd="#itm"+i;
        $(idd).append("<div class='day'><i class='far fa-moon'></i></div>");
        $(idd).append("<div class='date'><span>"+doc.val().time+"</span> <span>مساء</span></div>");
        $(idd).append("<div class='classType'>"+availableSeat(doc.val().busId)+" مقعد</div>");
        $(idd).append("<div class='divPrice'><span id='price'> "+doc.val().price+"</span> جنيه  </div>");
        $(idd).append("<div class='right'><a href='#' class='button ExitB' id='chooseSeat"+i+"'>اختيار المقاعد</a></div>");
        var chBtn="#chooseSeat"+i;
        $('#listOfBuses').append(" <div class='table1' id='pan"+i+"'></div>");
        var pan="#pan"+i;
        $(pan).append("	<div class='rightPart' id='rightPart"+i+"'></div>");
        var rightPart="#rightPart"+i;
           $(rightPart).append("<div class='tripInfo'>مدة الرحلة 7 ساعات  |  تاريخ الوصول المتوقع 07:15 صباحا</div>");
           $(rightPart).append("<div class='bottomPart' id='bottomPart"+i+"'>");
           var bottomPart="#bottomPart"+i;
               $(bottomPart).append("<div class='seatList'><div class='conatinerOfTable' id='conatinerOfTable"+i+"'> </div></div>");
               var conatinerOfTable="#conatinerOfTable"+i;
               setTableX(conatinerOfTable,i);//setTable(conatinerOfTable);
                $(bottomPart).append("<div class='seatInf' id='seatInf"+i+"'></div>");
                var seatInf="#seatInf"+i;
                setTableInFo(seatInf,i);
        $(pan).append("<div class='infoOfBooking' id='infoOfBooking"+i+"'></div>");
        var infoOfBooking="#infoOfBooking"+i;
          $(infoOfBooking).append("<div class='textOfTotalPrice'>اجمالي السعر</div>");
          $(infoOfBooking).append("<div class='textOfTotalPrice'>150 جنيه</div>");
          $(infoOfBooking).append("<div class='bookbtn'><input type='button' value='إحجز الآن'></div>");
          $(infoOfBooking).append("<div><span class='available'> قمت بتحديد <i class='seat-number'>1</i>مقعد</span></div>");
        $(chBtn).click(function(){
          $(".seatImg").attr("src", "images/free.png");
          if($(pan).css('display')=='none'){
            $(".table1").css("display","none");$(".ExitB").html("اختيار المقاعد");
           $(pan).css("display","block");$(chBtn).html("X اغلاق");
          
          }else{
           $(pan).css("display","none");$(chBtn).html("اختيار المقاعد");
          }
         });
    } 
    
    
    function setTableInFo(seatInf,i)
    {
     
     $(seatInf).append("<table id='table"+i+"'></table>");
       var table="#table"+i;
        $(table).append("<tr><td class='seatFixed'>مقعد غير متوفر<td><td>	<img src='images/booked.png' width='20px' height='20px'></td></tr>");
        $(table).append("<tr><td class='seatFixed'>مقعد متوفر<td><td>	<img src='images/free.png' width='20px' height='20px'></td></tr>");
        $(table).append("<tr><td class='seatFixed'>المقعد المحدد<td><td>	<img src='images/selected.png' width='20px' height='20px'></td></tr>");
        $(table).append("<tr><td class='seatFixed'>المقاعد المتوفرة<td><td>	49</td></tr>");
       
    }
    /*****************************************/
    function seatEvent(idSeat)
    {
        $(idSeat).click(function(){
                   if ( $(this).children("img").attr('src') == 'images/free.png' ) {
                       $(this).children("img").attr("src", "images/selected.png");
                    } else {
                     $(this).children("img").attr("src", "images/free.png");
                     }
        });
    }
    function setSeat(idRow,k,i,j,N)
    {
       $(idRow).append("<td class='colOfSeat' id='seat"+(k+"_"+i+"_"+j)+"'><img src='images/free.png' class='seatImg'><span class='seatNum'>"+N+"</span></td>");
       idSeat="#seat"+k+"_"+i+"_"+j;
       seatEvent(idSeat);
    }
    
    function setTableX(conatinerOfTable,k)
    {
     $(conatinerOfTable).append("<table id='tbl"+k+"'></table>");
     //$('#listOfBuses').append("<div class='show-default accordion' id='itm"+i+"'></div>");
       var idTable="#tbl"+k,idRow="";
       var N=1;
        for (i = 1; i < 6; i++) {
                $(idTable).append("<tr id='trw"+(k+"_"+i)+"'></tr>");
                 idRow="#trw"+k+"_"+i;
               for(j = 1; j < 14; j++){
                 
                  if(i==1 || i==2)
                {
                    if(j==6 || j==7)
                    {  $(idRow).append("<td class='colOfSeat'></td>");}
                    else
                    { setSeat(idRow,k,i,j,N);N++;}
                }
                else if(i==3)
                {
                    if(j !=13)
                    {$(idRow).append("<td class='colOfSeat'></td>");}
                    else
                    {setSeat(idRow,k,i,j,N);N++;}
                }
                else
                {setSeat(idRow,k,i,j,N);N++;}
              }
          }
    }
    
    function getDayNameAr(dayNum){
     var dayAr = ["الاحد", "الاثنين", "الثلاثاء","الاربعاء","الخميس","الجمعة","السبت"];
     return dayAr[dayNum];
    }
    function getDayNameEn(dayNum){
     var dayAr = ["Sunday", "Monday", "Tuesday","Wednesday","Thursday","Friday","star-day"];
     return dayAr[dayNum];
    }
    
    function availableSeat(busn)
    {
     var ref = firebase.database().ref().child("DailyBooking");
     var sum=0;
       ref.once("value", function(snapshot) {
          snapshot.forEach(function(item){
           if(item.val().busId==busn)
           {
           console.log(item.val().seats.length);
           sum+=item.val().seats.length;
           console.log("-->"+sum);
           }
          });
   
       }, function (error) {
       console.log("Error: " + error.code);
       });
    console.log("ali "+sum);
   return 49-sum;
    }
 
 });