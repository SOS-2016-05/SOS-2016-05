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

        request.done(function(data) {
            console.log("Handling request (OK)");
            console.log("Data received:");
            var jsonString = JSON.stringify(data);
            console.log(jsonString);
            $("#log").html(jsonString);
        });

        request.always(function (jqXHR,status){
            if(status=="error")
                console.log("Status: "+jqXHR.status);
        });

    });
});
