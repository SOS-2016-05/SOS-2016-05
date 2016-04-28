$(document).ready(() => {
    console.log("Jquery ready!");
    var urlll;
    //MEJORAR FUNCIÓN PARA USAR TOP Y DOPING

function urrl(){    //FROM DELTE AND VIEW
  console.log("URL ANTES DE TRATAR: "+urlll);
  if($("#payload").val()==0 && $("#payload2").val()==0){
    console.log("ANTES DE URLLL FUNCION");
    urlll="/api/v1/locations/?apikey="+$("#url").val()+"&limit="+$("#limit").val()+"&offset="+$("#offset").val()+"&from="+$("#from").val()+"&to="+$("#to").val();
    console.log("PASA POR PRIMER IF");
  }else if($("#payload2").val()==0 && $("#payload").val()!=0){
    urlll="/api/v1/locations"+"/"+$("#payload").val()+"/?apikey="+$("#url").val()+"&limit="+$("#limit").val()+"&offset="+$("#offset").val()+"&from="+$("#from").val()+"&to="+$("#to").val();
    console.log("PASA POR SEGUNDO IF");
  }else if($("#payload2").val()!=0 && $("#payload").val()==0){
    urlll="/api/v1/locations"+"/"+$("#payload2").val()+"/?apikey="+$("#url").val()+"&limit="+$("#limit").val()+"&offset="+$("#offset").val()+"&from="+$("#from").val()+"&to="+$("#to").val();
    console.log("PASA POR TERCER IF");
  }else{
    urlll="/api/v1/locations"+"/"+$("#payload").val()+"/"+$("#payload2").val()+"/?apikey="+$("#url").val()+"&limit="+$("#limit").val()+"&offset="+$("#offset").val()+"&from="+$("#from").val()+"&to="+$("#to").val();
    console.log("PASA POR ELSE");
  }
  return urlll;
}

function urrl2(){ //FROM PUT => UPDATE
  if($("#payload").val()==0 || $("#payload2").val()==0){
    urlll="/api/v1/locations/?apikey="+$("#url").val();
    console.log("PASA POR IF");
  }
  else{
    console.log("PASA POR ELSE");
    urlll="/api/v1/locations/"+$("#payload").val()+"/"+$("#payload2").val()+"/?apikey="+$("#url").val();
  }
  return urlll;
}

    $("#remove").click(() => {
        console.log("Data removed");
        urlll=urrl();
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
      urlll=urrl2();
      var request=$.ajax({
         url: urlll,
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
    urlll=urrl();
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
