$(document).ready(() => {
    console.log("Jquery ready!");
    var urlll;
    var nx=false;
    var bf=false;
    var cont=parseInt($("#offset").val());
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

function urrl4(){    //FROM DELTE AND VIEW
if($("#payload").val()==0 && $("#payload2").val()==0){
  urlll="/api/v1/locations/?apikey="+$("#url").val()+"&limit="+$("#limit").val()+"&offset="+cont+"&from="+$("#from").val()+"&to="+$("#to").val();
}else if($("#payload2").val()==0 && $("#payload").val()!=0){
  urlll="/api/v1/locations"+"/"+$("#payload").val()+"/?apikey="+$("#url").val()+"&limit="+$("#limit").val()+"&offset="+cont+"&from="+$("#from").val()+"&to="+$("#to").val();
}else if($("#payload2").val()!=0 && $("#payload").val()==0){
  urlll="/api/v1/locations"+"/"+$("#payload2").val()+"/?apikey="+$("#url").val()+"&limit="+$("#limit").val()+"&offset="+cont+"&from="+$("#from").val()+"&to="+$("#to").val();
}else{
  urlll="/api/v1/locations"+"/"+$("#payload").val()+"/"+$("#payload2").val()+"/?apikey="+$("#url").val()+"&limit="+$("#limit").val()+"&offset="+cont+"&from="+$("#from").val()+"&to="+$("#to").val();
}
return urrl3();
}

function pagination(data){
    console.log("Limite del limit: "+parseInt( $("#limit").val() ));
    cont=cont+parseInt($("#limit").val());
    console.log("Limite pasado cont: "+cont);
  return cont;
}


function pagination2(data){
    console.log("Limite del limit: "+parseInt( $("#limit").val() ));
    console.log("Limite normal: "+cont);
    cont-=parseInt( $("#limit").val() );
    console.log("Limite pasado: "+cont);
  return cont;
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
            if(jqXHR.status==201){
              $("#status").html("Resource have been deleted.");
            }
            $("#locations").find("tr:gt(0)").remove();    //delete all rows
             for (i=0;i<data.length;i++){
               var row = $('<tr/>');
               $("#locations").append(row);
               $('<td></td>').text(data[i].country).appendTo(row);
               $('<td></td>').text(data[i].year).appendTo(row);
               $('<td></td>').text(data[i].top).appendTo(row);
               $('<td></td>').text(data[i].doping).appendTo(row);
             }
        });

        request2.done(function(data,status,jqXHR) {
            $("#locations").find("tr:gt(0)").remove();    //delete all rows
             for (i=0;i<data.length;i++){
               var row = $('<tr/>');
               $("#locations").append(row);
               $('<td></td>').text(data[i].country).appendTo(row);
               $('<td></td>').text(data[i].year).appendTo(row);
               $('<td></td>').text(data[i].top).appendTo(row);
               $('<td></td>').text(data[i].doping).appendTo(row);
             }
             if(jqXHR.status==201){
               $("#status").html("Resource have been deleted.");
             }
        });

        request.always(function (jqXHR,status){
            if($("#url").val()==0){
              $("#fail").html(window.alert("Apikey is empty, please introduce an apikey."));
            }else if($("#url").val()!="abc" && $("url").val()!=0){
              $("#fail").html(window.alert("Apikey is wrong."));
            }
            if(jqXHR.status==404){
              $("#status").html("Resource not found.");
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
             if(jqXHR.status==201){
               console.log("Data have been loaded.");
               $("#status").html("Data have been loaded.");
             }
        });
        request2.done(function(data,status,jqXHR) {
            $("#locations").find("tr:gt(0)").remove();    //delete all rows
             for (i=0;i<data.length;i++){
               var row = $('<tr/>');
               $("#locations").append(row);
               $('<td></td>').text(data[i].country).appendTo(row);
               $('<td></td>').text(data[i].year).appendTo(row);
               $('<td></td>').text(data[i].top).appendTo(row);
               $('<td></td>').text(data[i].doping).appendTo(row);
             }
             if(jqXHR.status==201){
               console.log("Data have been loaded.");
               $("#status").html("Data have been loaded.");
             }
        });
        request.always(function (jqXHR,status){
            if(status=="error"){
                console.log("Status: "+jqXHR.status);
                if(jqXHR.status==404){
                  console.log("Error to load data.");
                  $("#status").html("Error to load data.");
                }
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
           if(jqXHR.status==201){
              $("#status").html("Resource have been updated.");
           }
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
            if(jqXHR.status==201){
               $("#status").html("Resource have been updated.");
            }
       });

       request.always(function (jqXHR,status){
          console.log("Status: "+jqXHR.status);
          if($("#url").val()==0){
              $("#fail").html(window.alert("Apikey is empty, please introduce an apikey."));
          }else if($("#url").val()!="abc" && $("url").val()!=0){
              $("#fail").html(window.alert("Apikey is wrong."));
          }

           if(jqXHR.status==404){
              $("#status").html("Resource not found.");
           }else if(jqXHR.status==405){
              $("#status").html("Method not avaliable, try to write country fild and year.");
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
          $("#locations").find("tr:gt(0)").remove();    //delete all rows
           for (i=0;i<data.length;i++){
             var row = $('<tr/>');
             $("#locations").append(row);
             $('<td></td>').text(data[i].country).appendTo(row);
             $('<td></td>').text(data[i].year).appendTo(row);
             $('<td></td>').text(data[i].top).appendTo(row);
             $('<td></td>').text(data[i].doping).appendTo(row);
           }

           if(jqXHR.status==200){
              $("#status").html("Resource searched with succes.");
           }
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
              if(jqXHR.status==404){
                 $("#status").html("Resource not found.");
              }
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
          if(jqXHR.status==201){
            $("#status").html("Resource added with succes.");
          }
      });

      request2.done(function(data,status,jqXHR) {
          $("#locations").find("tr:gt(0)").remove();    //delete all rows
           for (i=0;i<data.length;i++){
             var row = $('<tr/>');
             $("#locations").append(row);
             $('<td></td>').text(data[i].country).appendTo(row);
             $('<td></td>').text(data[i].year).appendTo(row);
             $('<td></td>').text(data[i].top).appendTo(row);
             $('<td></td>').text(data[i].doping).appendTo(row);
           }
           if(jqXHR.status==201){
             $("#status").html("Resource added with succes.");
           }
      });

      request.always(function (jqXHR,status){
              console.log("Status: "+jqXHR.status);
              if($("#url").val()==0){
                console.log("ENTRA EN APIKEY");
                $("#fail").html(window.alert("Apikey is empty, please introduce an apikey."));
              }else if($("#url").val()!="abc" && $("url").val()!=0){
                $("#fail").html(window.alert("Apikey is wrong."));
              }
              if(jqXHR.status==409 && $("#url").val()=="abc"){
                $("#fail").html(window.alert("You can't add an item that alredy exists."));
              }
              if(jqXHR.status==409){
                $("#status").html("Conflict exists because of another resource of the same name and year.");
              }else if(jqXHR.status==400){
                $("#status").html("Error, try to write country, year, top and doping fild.");
              }
      });
  });

//pagination


  $("#next").click(() => {
    urlll=urrl4();
      var request = $.ajax({
          url:urlll,
          type: "GET",
          data:"{" + ' "country": ' + '"' + $("#payload").val() + '"'  + "," +
            '"year": ' + '"' + $("#payload2").val() + '"' + "," + ' "top": ' + '"' +
            $("#payload3").val()+'"'+ "," + ' "doping": ' + '"' + $("#payload4").val() + '"' + "}",
          contentType: "application/json; charset=utf-8"

      });

      request.done(function(data,status,jqXHR) {
          $("#locations").find("tr:gt(0)").remove();    //delete all rows
           for (i=0;i<data.length;i++){
             var row = $('<tr/>');
             $("#locations").append(row);
             $('<td></td>').text(data[i].country).appendTo(row);
             $('<td></td>').text(data[i].year).appendTo(row);
             $('<td></td>').text(data[i].top).appendTo(row);
             $('<td></td>').text(data[i].doping).appendTo(row);
           }

           console.log("offset "+$("#offset").val());

           console.log("CONTADOR NEXT "+cont);
          // var offsett=pagination(data);
          if(cont<data.length){
            console.log("data: "+data.length);
            console.log("contador "+cont);
            cont=cont+parseInt($("#limit").val());
          }else if(cont>data.length){
            cont=0;
          }

          // offsett=offsett+pagination(data);
           //console.log("OFFSETT "+offsett);
          // toString(offsett);
           if(jqXHR.status==200){
              $("#status").html("Resource searched with succes.");
           }
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
              if(jqXHR.status==404){
                 $("#status").html("limit of table, please use before.");
                 alert("limit of table");
              }
          }

      });
  });


  $("#before").click(() => {
    urlll=urrl4();
      var request = $.ajax({
          url:urlll,
          type: "GET",
          data:"{" + ' "country": ' + '"' + $("#payload").val() + '"'  + "," +
            '"year": ' + '"' + $("#payload2").val() + '"' + "," + ' "top": ' + '"' +
            $("#payload3").val()+'"'+ "," + ' "doping": ' + '"' + $("#payload4").val() + '"' + "}",
          contentType: "application/json; charset=utf-8"

      });

      request.done(function(data,status,jqXHR) {
          $("#locations").find("tr:gt(0)").remove();    //delete all rows
           for (i=0;i<data.length;i++){
             var row = $('<tr/>');
             $("#locations").append(row);
             $('<td></td>').text(data[i].country).appendTo(row);
             $('<td></td>').text(data[i].year).appendTo(row);
             $('<td></td>').text(data[i].top).appendTo(row);
             $('<td></td>').text(data[i].doping).appendTo(row);
           }
           console.log("CONTADOR ATRAS: "+cont);
           console.log("offset "+$("#offset").val());
           activenx(nx);
           tratamiento(nx,bf);
           cont=cont-parseInt($("#limit").val());

           //var offsett;
           //offsett=offsett+pagination2(data);
           //console.log("OFFSETT "+offsett);
          // toString(offsett);
           if(jqXHR.status==200){
              $("#status").html("Resource searched with succes.");
           }
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
              if(jqXHR.status==404){
                 $("#status").html("Resource not found.");
              }
          }

      });
  });

});
