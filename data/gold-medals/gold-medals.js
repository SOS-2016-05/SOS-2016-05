var service = '../../api/v1/';

$(document).ready(function(){

    jQuery.support.cors = true;

    $.ajax({
        type: "GET",
        url: service + 'gold-medals?apikey=sosrw',
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        cache: false,
        success: function(data) {
        drawTable(data);
        var trHTML = '';
    	}
    });
    function drawTable(data) {
	    for (var i = 0; i < data.length; i++) {
	        drawRow(data[i]);
	    }
	}	

	function drawRow(rowData) {
	    var row = $("<tr bgcolor='#FFFFFF'/>")
	    $("#location").append(row); 
	    row.append($("<td>" + rowData.country + "</td>"));
	    row.append($("<td>" + rowData.year + "</td>"));
	    row.append($("<td>" + rowData.goldmedalsnumber + "</td>"));
	    row.append($("<td>" + rowData.silvermedalsnumber + "</td>"));
	}

})