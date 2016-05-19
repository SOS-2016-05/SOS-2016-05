$(document).ready(() => {
    console.log("Jquery ready!");
    var urlll;
    var cont2=0;
    var cont3=0;
    var cont;
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
          url: "/api/v1/locations/?apikey=multiPlan_C4_sos-2016-05-ajv_ag",
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
            }else if(jqXHR.status==402){
              alert("you must buy a plan.");
            }else if(jqXHR.status==429){
              alert("you must Buy a new plan.");
            }
            if(jqXHR.status==404){
              $("#status").html("Resource not found.");
            }
        });
    });

    $("#loaddata").click(() => {
       var request=$.ajax({
          url: "/api/v1/locations/loadInitialData?apikey=multiPlan_C4_sos-2016-05-ajv_ag",
          type: "GET",
          contentType: "application/json"
        });
        console.log("Data loaded");
        var request2=$.ajax({
          url: "/api/v1/locations?apikey=multiPlan_C4_sos-2016-05-ajv_ag",
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
         url: "/api/v1/locations/?apikey=multiPlan_C4_sos-2016-05-ajv_ag",
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
            }else if(jqXHR.status==402){
              alert("you must buy a plan.");
            }else if(jqXHR.status==429){
              alert("you must Buy a new plan.");
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
              }else if(jqXHR.status==402){
                alert("you must buy a plan.");
              }else if(jqXHR.status==429){
                aler("you must Buy a new plan.");
              }
              if(jqXHR.status==404){
                 $("#status").html("Resource not found.");
              }
          }

      });
  });

  $("#add").click(() => {

      var request = $.ajax({
          url:urll+$("#url").val(),
          type: "POST",
          data:"{" + ' "country": ' + '"' + $("#payload").val() + '"'  + "," +
            '"year": ' + '"' + $("#payload2").val() + '"' + "," + ' "top": ' + '"' +
            $("#payload3").val()+'"'+ "," + ' "doping": ' + '"' + $("#payload4").val() + '"' + "}",
          contentType: "application/json"
      });

      var request2=$.ajax({
        url: "/api/v1/locations/?apikey=multiPlan_C4_sos-2016-05-ajv_ag",
        type: "GET",
        contentType: "application/json"
      });

      request.done(function(data,status,jqXHR) {
        console.log("Data added");
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
              }else if(jqXHR.status==402){
                alert("you must buy a plan.");
              }else if(jqXHR.status==429){
                alert("you must Buy a new plan.");
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
var comp;

  $("#next").click(() => {
      console.log("variable cont antes de .done: "+cont);
        var sum=parseInt( $("#limit").val() );
        if(cont3==0){
          cont=parseInt($("#offset").val());
          urlll=urrl4();
          comp=false;
          cont3++;
        }else if(comp==true){
          cont=cont+sum+sum;
          urlll=urrl4();
          comp=false;
        }
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
             cont2++;
           }
          if(cont<cont2){
            cont=cont+sum;
            console.log("contador sumado: "+cont);
          }
          urlll=urrl4();
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
              }else if(status=="Unauthorized"){
                $("#fail").html(window.alert("Apikey is wrong."));
              }else if(jqXHR.status==429){
                alert("you must Buy a new plan.");
              }else if(jqXHR.status==402){
                alert("you must buy a plan.");
              }
              if(jqXHR.status==404){
                 $("#status").html("limit of table, you will start again.");
                 alert("limit of table.");
                 cont=parseInt($("#offset").val());
                 urlll=urrl4();
                  $("#next").disabled=false;
              }
              else if(jqXHR.status==500){
                $("#status").html("limit of table, you will start again.");
                alert("limit of table.");
                cont=parseInt($("#offset").val());
                urlll=urrl4();
              }
          }

      });
  });


  $("#before").click(() => {
    console.log("variable cont antes de .done del before: "+cont);
    var sum=parseInt( $("#limit").val() );
    if(cont3==0){
      cont=parseInt($("#offset").val());
      urlll=urrl4();
      comp=true;
      cont3++;
    }else if(comp==false){
      cont=cont-sum-sum;
      urlll=urrl4();
      comp=true;
    }else if(cont<0){
      cont=parseInt( $("#offset").val() );
      urlll=urrl4();
    }

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
             cont2++;
           }

           if(cont<cont2){
             cont=cont-sum;
             console.log("contador restado: "+cont);
           }
           urlll=urrl4();
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
              }else if(jqXHR.status==402){
                alert("you must buy a plan.");
              }else if(jqXHR.status==429){
                aler("you must Buy a new plan.");
              }
              if(jqXHR.status==404){
                $("#status").html("limit of table, you will start again.");
                alert("limit of table.");
                cont=parseInt( $("#offset").val() );
                urlll=urrl4();
              }else if(jqXHR.status==500){
                $("#status").html("limit of table, you will start again.");
                alert("limit of table.");
                cont=parseInt( $("#offset").val() );
                urlll=urrl4();
              }
          }

      });
  });

});
