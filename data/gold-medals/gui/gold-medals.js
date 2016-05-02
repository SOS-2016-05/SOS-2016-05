$(document).ready(function(){
    $.ajax({
        type: "GET",
        url: '/api/v1/gold-medals?apikey=sosrw',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data) {
            insertTable(data);
    	}
    });
    	
	function insertRow(data) {
	    var row = $("<tr/>")
	    $("#medals").append(row); 
	    row.append($("<td>"+data.country+"</td>"));
	    row.append($("<td>"+data.year+"</td>"));
	    row.append($("<td>"+data.goldmedalsnumber+"</td>"));
	    row.append($("<td>"+data.silvermedalsnumber+"</td>"));
	}
    
    function insertTable(data) {
	    for (var i = 0; i < data.length; i++)
	        insertRow(data[i]);
	}

})