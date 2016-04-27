$(document).ready(() => {
    console.log("Jquery ready!");
    var urll="/api/v1/locations/?apikey=";
    var urlll;
    var urlput="/api/v1/locations";
  //  var remo="/api/v1/locations"+"/"+$("#payload").val()+"/"+$("#payload2").val()+"/?apikey="+$("#url").val();
//necesario reparar VIEW + REMOVE ALL
console.log("URL ANTES DE IF: "+urlll);

function urrl(){
  console.log("URL ANTES DE TRATAR: "+urlll);
  if($("#payload").val()==0 && $("#payload2").val()==0){
    console.log("ANTES DE URLLL FUNCION");
    urlll="/api/v1/locations/?apikey=";
    console.log("PASA POR PRIMER IF");
  }else if($("#payload2").val()==0 && $("#payload").val()!=0){
    urlll="/api/v1/locations"+"/"+$("#payload").val()+"/?apikey=";
    console.log("PASA POR SEGUNDO IF");
  }else if($("#payload2").val()!=0 && $("#payload").val()==0){
    urlll="/api/v1/locations"+"/"+$("#payload2").val()+"/?apikey=";
    console.log("PASA POR TERCER IF");
  }else{
    urlll="/api/v1/locations"+"/"+$("#payload").val()+"/"+$("#payload2").val()+"/?apikey=";
    console.log("PASA POR ELSE");
  }
  return urlll;
}

    $("#removeAll").click(() => {
        console.log("Data removed");
        urlll=urrl()+$("#url").val();
        console.log("URL seleccionada: "+urlll);

        var request = $.ajax({
            url:urlll,
            type: "DELETE",
            data:"{" + ' "country": ' + '"' + $("#payload").val() + '"'  + "," +
              '"year": ' + '"' + $("#payload2").val() + '"' + "," + ' "top": ' + '"' +
              $("#payload3").val()+'"'+ "," + ' "doping": ' + '"' + $("#payload4").val() + '"' + "}",
            contentType: "application/json"
        });

        request.done(function(data,status,jqXHR) {
            console.log("Handling request (OK)");
            console.log("Data received:");
            var jsonString = JSON.stringify(data);
            console.log(jsonString);
            $("#data").html(jsonString);
            $("#status").html(jqXHR.status);
            $("#log").html(status);

        });

        request.always(function (jqXHR,status){
            if(status=="error"){
                console.log("Status: "+jqXHR.status);
                $("#data").html(" ");
                $("#status").html(jqXHR.status);
                $("#log").html(status);
            }

        });
    });

    $("#loaddata").click(() => {
       console.log("Data loaded");
       var request=$.ajax({
          url: "/api/v1/locations/loadInitialData?apikey=abc",
          type: "GET",
          contentType: "application/json"
        });

        request.done(function(data,status,jqXHR) {
            console.log("Handling request (OK)");
            console.log("Data received:");
            var jsonString = JSON.stringify(data);
            console.log(jsonString);
            $("#data").html(jsonString);
            $("#status").html(jqXHR.status);
            $("#log").html(status);

        });

        request.always(function (jqXHR,status){
            if(status=="error"){
                console.log("Status: "+jqXHR.status);
                $("#data").html(" ");
                $("#status").html(jqXHR.status);
                $("#log").html(status);
            }

        });
   });

   $("#update").click(() => {
      console.log("Data updated");
      var request=$.ajax({
         url: urlput+$("#payload").val()+"/"+$("#payload2").val()+"/?apikey="+$("#url").val(),
         type: "PUT",
         data:"{" + ' "country": ' + '"' + $("#payload").val() + '"'  + "," +
           '"year": ' + '"' + $("#payload2").val() + '"' + "," + ' "top": ' + '"' +
           $("#payload3").val()+'"'+ "," + ' "doping": ' + '"' + $("#payload4").val() + '"' + "}",
         contentType: "application/json"
       });

       request.done(function(data,status,jqXHR) {
           console.log("Handling request (OK)");
           console.log("Data received:");
           var jsonString = JSON.stringify(data);
           console.log(jsonString);
           $("#data").html(jsonString);
           $("#status").html(jqXHR.status);
           $("#log").html(status);

       });

       request.always(function (jqXHR,status){
           if(status=="error"){
               console.log("Status: "+jqXHR.status);
               $("#data").html(" ");
               $("#status").html(jqXHR.status);
               $("#log").html(status);
           }

       });
  });

  $("#view").click(() => {
    urlll=urrl()+$("#url").val();
      var request = $.ajax({
          url:urlll,
          type: "GET",
          data:"{" + ' "country": ' + '"' + $("#payload").val() + '"'  + "," +
            '"year": ' + '"' + $("#payload2").val() + '"' + "," + ' "top": ' + '"' +
            $("#payload3").val()+'"'+ "," + ' "doping": ' + '"' + $("#payload4").val() + '"' + "}",
          contentType: "application/json"
      });

      request.done(function(data,status,jqXHR) {
          console.log("Handling request (OK)");
          console.log("Data received:");
          var jsonString = JSON.stringify(data);
          console.log(jsonString);
          $("#data").html(jsonString);
          $("#status").html(jqXHR.status);
          $("#log").html(status);

      });

      request.always(function (jqXHR,status){
          if(status=="error"){
              console.log("Status: "+jqXHR.status);
              $("#data").html(" ");
              $("#status").html(jqXHR.status);
              $("#log").html(status);
          }

      });
  });

  $("#add").click(() => {
      console.log("Data added");
      var request = $.ajax({
          url:urll+$("#url").val(),
          type: "POST",
          data:"{" + ' "country": ' + '"' + $("#payload").val() + '"'  + "," +
            '"year": ' + '"' + $("#payload2").val() + '"' + "," + ' "top": ' + '"' +
            $("#payload3").val()+'"'+ "," + ' "doping": ' + '"' + $("#payload4").val() + '"' + "}",
          contentType: "application/json"
      });

      request.done(function(data,status,jqXHR) {
          console.log("Handling request (OK)");
          console.log("Data received:");
          var jsonString = JSON.stringify(data);
          console.log(jsonString);
          $("#data").html(jsonString);
          $("#status").html(jqXHR.status);
          $("#log").html(status);

      });

      request.always(function (jqXHR,status){
          if(status=="error"){
              console.log("Status: "+jqXHR.status);
              $("#data").html(" ");
              $("#status").html(jqXHR.status);
              $("#log").html(status);
          }

      });
  });

});
