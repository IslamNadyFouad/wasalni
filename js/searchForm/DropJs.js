
 $( document ).ready(function() {
   var ref = firebase.database().ref().child("BusSchedule");
   //--------------------------
      
      $(".TextClick1").click(function(){
        if($("#TextFrom").css('display')=='none')
        {$("#TextFrom").css("display","block");}
        else
        {$("#TextFrom").css("display","none");}
        
        });
       var sourceVariable1="",sourceVariable2="";
ref.once("value", function(snapshot) {
  // console.log(snapshot.val());
   snapshot.forEach(function(item){
    textInputItem1(item);
        sourceVariable1=item.val().sourceAr;
        sourceVariable2=item.val().sourceEn;
        console.log(item.val().sourceAr);
    });
    document.getElementById("ViewTextFrom").textContent=sourceVariable1;
     $("#thistextSource").val(sourceVariable2);
}, function (error) {
   console.log("Error: " + error.code);
});
      
      
      
    /*  
      var sourceVariable1="",sourceVariable2="";
      db.collection('BusSchedule').orderBy('source').get().then(snapshot => {
    snapshot.docs.forEach(doc => {
        textInputItem1(doc);
        sourceVariable1=doc.data().source;
        sourceVariable2=doc.data().sourceEn;
     });
    document.getElementById("ViewTextFrom").textContent=sourceVariable1;
     $("#thistextSource").val(sourceVariable2);
 });*/
      
 function textInputItem1(doc){
  var x=document.getElementById("listOfSource");
   let li = document.createElement('li');
    
     li.textContent = doc.val().sourceAr;
       x.appendChild(li);
       
       var tList=document.getElementById("TextFrom");
       var viewText=document.getElementById("ViewTextFrom");
       li.addEventListener('click',function(){
        tList.style.display="none";
        viewText.textContent=li.textContent;
        $("#thistextSource").val(doc.val().sourceEn);
    });
}
  
  /*****************************************************************/
    $(".TextClick2").click(function(){
        if($("#TextTo").css('display')=='none')
        {$("#TextTo").css("display","block");}
        else
        {$("#TextTo").css("display","none");}
        
        });
    
    var desVariable1="",desVariable2="";
    
ref.once("value", function(snapshot) {
   //console.log(snapshot.val());
   snapshot.forEach(function(item){
    textInputItem2(item);
        desVariable1=item.val().destinationAr;
        desVariable2=item.val().destinationEn;
    });
    document.getElementById("ViewTextTo").textContent=desVariable1;
     $("#thistextDestination").val(desVariable2);
}, function (error) {
   console.log("Error: " + error.code);
});
   /* 
db.collection('BusSchedule').orderBy('destination').get().then(snapshot => {
    snapshot.docs.forEach(doc => {
        textInputItem2(doc);
        desVariable1=doc.data().destination;
        desVariable2=doc.data().destinationEn;
     });
     document.getElementById("ViewTextTo").textContent=desVariable1;
     $("#thistextDestination").val(desVariable2);
 });*/
function textInputItem2(doc){
  var x=document.getElementById("listOfDestination");
   let li = document.createElement('li');
    
     li.textContent = doc.val().destinationAr;
      
       x.appendChild(li);
       
       var tList=document.getElementById("TextTo");
       var viewText=document.getElementById("ViewTextTo");
       
       li.addEventListener('click',function(){
        tList.style.display="none";
        viewText.textContent=li.textContent;
        $("#thistextDestination").val( doc.val().destinationEn);
    });
}
    
     


/********************************************************/
/*
      var ref = firebase.database().ref().child("DailyBooking");

ref.once("value", function(snapshot) {
   console.log(snapshot.val());
   snapshot.forEach(function(item){
    console.log(item.val().date);
    });
}, function (error) {
   console.log("Error: " + error.code);
});*/
});
 