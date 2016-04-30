$(document).ready(() => {
    console.log("Jquery ready!");
    var urlll;
    var urll="/api/v1/locations/?apikey=";

  function urrl(){    //FROM DELTE AND VIEW
  if($("#payload").val()==0 && $("#payload2").val()==0){
    urlll="/api/v1/locations/?apikey="+$("#url").val()+"&limit="+$("#limit").val()+"&offset="+$("#offset").val()+"&from="+$("#from").val()+"&to="+$("#to").val();
  }else if($("#payload2").val()==0 && $("#payload").val()!=0){
    urlll="/api/v1/locations"+"/"+$("#payload").val()+"/?apikey="+$("#url").val()+"&limit="+$("#limit").val()+"&offset="+$("#offset").val()+"&from="+$("#from").val()+"&to="+$("#to").val();
  }else if($("#payload2").val()!=0 && $("#payload").val()==0){
    urlll="/api/v1/locations"+"/"+$("#payload2").val()+"/?apikey="+$("#url").val()+"&limit="+$("#limit").val()+"&offset="+$("#offset").val()+"&from="+$("#from").val()+"&to="+$("#to").val();
  }else{
    urlll="/api/v1/locations"+"/"+$("#payload").val()+"/"+$("#payload2").val()+"/?apikey="+$("#url").val()+"&limit="+$("#limit").val()+"&offset="+$("#offset").val()+"&from="+$("#from").val()+"&to="+$("#to").val();
  }

  return urrl3();
}

function urrl2(){ //FROM PUT => UPDATE
  if($("#payload").val()==0 || $("#payload2").val()==0){
    urlll="/api/v1/locations/?apikey="+$("#url").val();
  }
  else{
    urlll="/api/v1/locations/"+$("#payload").val()+"/"+$("#payload2").val()+"/?apikey="+$("#url").val();
  }
  return urlll;
}

function urrl3(){
  if($("#payload3").val()==0 && $("#payload4").val()!=0){
    urlll=urlll+"&doping="+$("#payload4").val();
  }else if($("#payload3").val()!=0 && $("#payload4").val()==0){
    urlll=urlll+"&top="+$("#payload3").val();
  }else if($("#payload3").val()!=0 && $("#payload4").val()!=0){
    urlll=urlll+"&top="+$("#payload3").val()+"&doping="+$("#payload4").val();
  }else{
    urlll=urlll;
  }
  return urlll;
}

    $("#remove").click(() => {
        console.log("Data removed");
        urlll=urrl();
        var request = $.ajax({
            url:urlll,
            type: "DELETE",
            data:"{" + ' "country": ' + '"' + $("#payload").val() + '"'  + "," +
              '"year": ' + '"' + $("#payload2").val() + '"' + "," + ' "top": ' + '"' +
              $("#payload3").val()+'"'+ "," + ' "doping": ' + '"' + $("#payload4").val() + '"' + "}",
            contentType: "application/json"
        });

        var request2=$.ajax({
          url: "/api/v1/locations/?apikey=abc",
          type: "GET",
          contentType: "application/json"
        });

        request.done(function(data,status,jqXHR) {
            console.log("Handling request (OK)");
            $("#status").html(jqXHR.status);
            $("#log").html(status);
        });

        request2.done(function(data,status,jqXHR) {
            console.log("Handling request (OK)");
            $("#locations").find("tr:gt(0)").remove();    //delete all rows
             for (i=0;i<data.length;i++){
               var row = $('<tr/>');
               $("#locations").append(row);
               $('<td></td>').text(data[i].country).appendTo(row);
               $('<td></td>').text(data[i].year).appendTo(row);
               $('<td></td>').text(data[i].top).appendTo(row);
               $('<td></td>').text(data[i].doping).appendTo(row);
             }
            $("#status").html(jqXHR.status);
            $("#log").html(status);
        });

        request.always(function (jqXHR,status){
            if(status=="error"){
                console.log("Status: "+jqXHR.status);
                $("#status").html(jqXHR.status);

                if($("#url").val()==0){
                  console.log("ENTRA EN APIKEY");
                  $("#fail").html(window.alert("Apikey is empty, please introduce an apikey."));
                }else if($("#url").val()!="abc" && $("url").val()!=0){
                  $("#fail").html(window.alert("Apikey is wrong."));
                }

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

        var request2=$.ajax({
          url: "/api/v1/locations/?apikey=abc",
          type: "GET",
          contentType: "application/json"
        });

        request.done(function(data,status,jqXHR) {
            console.log("Handling request (OK)");
            $("#status").html(jqXHR.status);
            $("#log").html(status);
        });
        request2.done(function(data,status,jqXHR) {
            console.log("Handling request (OK)");
            $("#locations").find("tr:gt(0)").remove();    //delete all rows
             for (i=0;i<data.length;i++){
               var row = $('<tr/>');
               $("#locations").append(row);
               $('<td></td>').text(data[i].country).appendTo(row);
               $('<td></td>').text(data[i].year).appendTo(row);
               $('<td></td>').text(data[i].top).appendTo(row);
               $('<td></td>').text(data[i].doping).appendTo(row);
             }
            $("#status").html(jqXHR.status);
            $("#log").html(status);
        });
        request.always(function (jqXHR,status){
            if(status=="error"){
                console.log("Status: "+jqXHR.status);
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

       var request2=$.ajax({
         url: "/api/v1/locations/?apikey=abc",
         type: "GET",
         contentType: "application/json"
       });


       request.done(function(data,status,jqXHR) {
           console.log("Handling request (OK)");
           console.log("Data received:");
           $("#status").html(jqXHR.status);
           $("#log").html(status);
       });

       request2.done(function(data,status,jqXHR) {
           console.log("Handling request (OK)");
           $("#locations").find("tr:gt(0)").remove();    //delete all rows
            for (i=0;i<data.length;i++){
              var row = $('<tr/>');
              $("#locations").append(row);
              $('<td></td>').text(data[i].country).appendTo(row);
              $('<td></td>').text(data[i].year).appendTo(row);
              $('<td></td>').text(data[i].top).appendTo(row);
              $('<td></td>').text(data[i].doping).appendTo(row);
            }
           $("#status").html(jqXHR.status);
           $("#log").html(status);
       });

       request.always(function (jqXHR,status){
           if(status=="error"){
               console.log("Status: "+jqXHR.status);
               if($("#url").val()==0){
                 console.log("ENTRA EN APIKEY");
                 $("#fail").html(window.alert("Apikey is empty, please introduce an apikey."));
               }else if($("#url").val()!="abc" && $("url").val()!=0){
                 $("#fail").html(window.alert("Apikey is wrong."));
               }
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
          contentType: "application/json; charset=utf-8"

      });

      request.done(function(data,status,jqXHR) {
          console.log("Handling request (OK)");
          console.log("Data received:");

          $("#locations").find("tr:gt(0)").remove();    //delete all rows
           for (i=0;i<data.length;i++){
             var row = $('<tr/>');
             $("#locations").append(row);
             $('<td></td>').text(data[i].country).appendTo(row);
             $('<td></td>').text(data[i].year).appendTo(row);
             $('<td></td>').text(data[i].top).appendTo(row);
             $('<td></td>').text(data[i].doping).appendTo(row);
           }

          $("#status").html(jqXHR.status);
          $("#log").html(status);

      });

      request.always(function (jqXHR,status){
          if(status=="error"){
              console.log("Status: "+jqXHR.status);
              if($("#url").val()==0){
                console.log("ENTRA EN APIKEY");
                $("#fail").html(window.alert("Apikey is empty, please introduce an apikey."));
              }else if($("#url").val()!="abc" && $("url").val()!=0){
                $("#fail").html(window.alert("Apikey is wrong."));
              }
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

      var request2=$.ajax({
        url: "/api/v1/locations/?apikey=abc",
        type: "GET",
        contentType: "application/json"
      });

      request.done(function(data,status,jqXHR) {
          console.log("Handling request (OK)");
          console.log("Data received:");
          $("#status").html(jqXHR.status);
          $("#log").html(status);
      });

      request2.done(function(data,status,jqXHR) {
          console.log("Handling request (OK)");
          $("#locations").find("tr:gt(0)").remove();    //delete all rows
           for (i=0;i<data.length;i++){
             var row = $('<tr/>');
             $("#locations").append(row);
             $('<td></td>').text(data[i].country).appendTo(row);
             $('<td></td>').text(data[i].year).appendTo(row);
             $('<td></td>').text(data[i].top).appendTo(row);
             $('<td></td>').text(data[i].doping).appendTo(row);
           }
          $("#status").html(jqXHR.status);
          $("#log").html(status);
      });

      request.always(function (jqXHR,status){
          if(status=="error"){
              console.log("Status: "+jqXHR.status);
              if($("#url").val()==0){
                console.log("ENTRA EN APIKEY");
                $("#fail").html(window.alert("Apikey is empty, please introduce an apikey."));
              }else if($("#url").val()!="abc" && $("url").val()!=0){
                $("#fail").html(window.alert("Apikey is wrong."));
              }
              if(status=409 && $("#url").val()=="abc"){
                $("#fail").html(window.alert("You can't add an item that alredy exists."));
              }
              $("#status").html(jqXHR.status);
              $("#log").html(status);
          }

      });
  });

});
