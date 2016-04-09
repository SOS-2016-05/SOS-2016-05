$(document).ready(function(){
    jQuery.support.cors = true;
    $.ajax({
        type: "GET",
        url: service + '/api/v1/locations?apikey=abc',
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        cache: false,
        success: function (data) {
        var trHTML = '';

        $.table(data.Countries, function (i, object) {
            trHTML += '<tr><td>' + data.country[i] + '</td><td>' + data.year[i] + '</td></tr>';
        });

        $('#location').append(trHTML);
        },

        error: function (msg) {
            alert(msg.responseText);
        }
    });
});
