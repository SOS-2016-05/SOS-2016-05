$(document).ready(() => {
    console.log("Jquery ready!");

    $("#button").click(() => {
        console.log("Handling click");
        var method = $("input[type=radio]:checked").attr("id");

        var request = $.ajax({
            url:$("#url").val(),
            type: method,
            data:$("#payload").val(),
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
          url: "/api/v1/locations/loadInitialData?apikey=multiPlan_C4_sos-2016-05-ajv_ag",
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

});
