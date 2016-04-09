$(document).ready(function(){
    $.ajax({
        type: "GET",
        url: '/api/v1/locations?apikey=abc',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
        var insertT(data);
      }
    });

    //https://stackoverflow.com/questions/8749236/create-table-with-jquery-append   -X.append-
    //https://www.sitepoint.com/community/t/how-to-properly-populate-html-table-with-jquery-ajax-using-json-formatted-data/202187

    function insertTable(data) {
      for (var i = 0; i < data.length; i++)
          insertR(data[i]);
    }

    function insertR(data) {
      var row = $("<tr/>")
      $("#medals").append(row);
      row.append($("<td>"+data.country+"</td>"));
      row.append($("<td>"+data.year+"</td>"));
      row.append($("<td>"+data.top+"</td>"));
      row.append($("<td>"+data.doping+"</td>"));
    }

})
