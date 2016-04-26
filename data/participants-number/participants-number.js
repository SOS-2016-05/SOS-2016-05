$(document).ready(function(){
    $.ajax({
        type: "GET",
        url: '/api/v1/participants-number?apikey=abc',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data) {
            insertTable(data);
    	}
    });
    	
	function insertRow(data) {
	    var row = $("<tr/>")
	    $("#participantsnumber").append(row); 
	    row.append($("<td>"+data.country+"</td>"));
	    row.append($("<td>"+data.year+"</td>"));
	    row.append($("<td>"+data.maleathletesnumber+"</td>"));
	    row.append($("<td>"+data.femaleathletesnumber+"</td>"));
	}
    
    function insertTable(data) {
	    for (var i = 0; i < data.length; i++)
	        insertRow(data[i]);
	}

	

});