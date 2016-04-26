$(document).ready(() => {
    console.log("Jquery ready!");
    var urll="/api/v1/locations/?apikey=";
    var urlput="/api/v1/locations";


//necesario reparar VIEW + REMOVE ALL

    $("#remove").click(() => {
        console.log("Data removed");
        var request = $.ajax({
            url:urlput+"/"+$("#payload").val()+"/"+$("#payload2").val()+"/?apikey="+$("#url").val(),
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
      var request = $.ajax({
        //  url:urlput+$("#payload").val()+"/"+$("#payload2").val()+"&"+"limit="+$("#limit").val()+"&"+"offset="+$("#offset").val()+"/?apikey="+$("#url").val(),
          url:urll+$("#url").val(),
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
