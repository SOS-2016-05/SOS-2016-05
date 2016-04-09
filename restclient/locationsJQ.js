$(document).ready(() => {
    console.log("Jquery ready!");

    $("#button").click(() => {
        console.log("Handling click");
        var method = $("input[type=radio]:checked").attr("id");

        var request = $.ajax({
            url:$("#url").val(),
            type: method,
            contentType: "application/json"
        });
//POST NO FUNCIONA LANZA ERROR 400 CONSTANTEMENTE
        request.done(function(datalocation) {
            console.log("Handling request (OK)");
            console.log("Data received:");
            var jsonString = JSON.stringify(datalocation);
            console.log(jsonString);
            $("#log").html(jsonString);
        });

        request.always(function (jqXHR,status){
            if(status=="error")
                console.log("Status: "+jqXHR.status);
        });

    });
});
