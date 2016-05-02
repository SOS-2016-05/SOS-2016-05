var save_method; //for save method string
var searchby ="";
var limit=2;
 
$(document).ready(function() {
    
    $("#load").on("click", (()=>{
        searchby = "";
        load_table();
        
    }));
    
    $("#apikey").on("keypress", ((e)=>{
        if(e.which == 13) {
            searchby = "";
            load_table();
        }  
    }));
    
    $("#table").on('click','td:nth-child(5) .btn-primary',function(event) {
        save_method = 'update';
        var $td= $(this).closest('tr').children('td');
        var country= $td.eq(0).text();
        var year= $td.eq(1).text();
        var goldmedalsnumber= $td.eq(2).text();
        var silvermedalsnumber= $td.eq(3).text();
        $('#form')[0].reset(); // reset form on modals
        $('.form-group').removeClass('has-error'); // clear error class
        $('.help-block').empty(); // clear error string
        $("#country").prop( "disabled", true );
        $("#year").prop( "disabled", true );

        //Ajax Load data from ajax
        $.ajax({
            url : "/api/v1/gold-medals/"+country+"/"+year+"?apikey=sosrw",
            type: "GET",
            dataType: "JSON",
            success: function(data)
            {
                $("#country").val(data[0].country);
                $("#year").val(data[0].year);
                $("#goldmedalsnumber").val(data[0].goldmedalsnumber);
                $("#silvermedalsnumber").val(data[0].silvermedalsnumber);
                $('#modal_form').modal('show'); // show bootstrap modal when complete loaded
                $('.modal-title').text('Edit Person'); // Set title to Bootstrap modal title
            },
            error: function (jqXHR, textStatus, errorThrown)
            {
                alert('Error get data from ajax');
            }
        });
    }   
);  
    
    $("#table").on('click','td:nth-child(5) .btn-danger',function(event) {
        var apikey=$("#apikey").val();
        var $td= $(this).closest('tr').children('td');
        var country= $td.eq(0).text();
        var year= $td.eq(1).text();
        //Ajax Load data from ajax
        $.ajax({
            url : "/api/v1/gold-medals/"+country+"/"+year+"?apikey="+apikey,
            type: "DELETE",
            dataType: "JSON",
            error: function (jqXHR, textStatus, errorThrown)
        {
            if(jqXHR.status==403)
                alert("The user has not write access. Try with another apikey");
            $('#btnSave').text('save'); //change button text
            $('#btnSave').attr('disabled',false); //set button enable
        }
            
        });
        load_table();
    }   
);  
    
});
 
function gold_medals()
{
    searchby = "gold";   
    load_table();
}
    
    function silver_medals()
{
    searchby = "silver"; 
    load_table();
}
    
function add_person()
{
    save_method = 'add';
    $('#form')[0].reset(); // reset form on modals
    $('.form-group').removeClass('has-error'); // clear error class
    $('.help-block').empty(); // clear error string
    $('#modal_form').modal('show'); // show bootstrap modal
    $('.modal-title').text('Add Person'); // Set Title to Bootstrap modal title
    $("#country").prop( "disabled", false );
    $("#year").prop( "disabled", false );
}
 
function load_table()
    {
        $("#table td").remove();
        var apikey=$("#apikey").val();
        var table = [];
        var urlend = "";
        if(searchby=="gold" & $("#search").val())
                urlend = "&goldmedalsnumber="+$("#search").val();
        else if(searchby=="silver" & $("#search").val())
                urlend = "&silvermedalsnumber="+$("#search").val();
        if($("#table td").length/5==0){
            
                
            $.ajax({
                            type: "GET",
                            url: '/api/v1/gold-medals?apikey=' + apikey+"&offset=0&limit="+limit+urlend,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (response) {
                                var trHTML = '';
                                $.each(response, function (i, item) {
                                    trHTML += '<tr><td>' + item.country + '</td><td>' + item.year + '</td><td>' + item.goldmedalsnumber + '</td><td>'  + item.silvermedalsnumber + '</td><td><a class="btn btn-sm btn-primary" title="Edit""><i class="glyphicon glyphicon-pencil"></i> Edit</a> <a class="btn btn-sm btn-danger" title="Hapus"><i class="glyphicon glyphicon-trash"></i> Delete</a></td></tr>';
                                });
                                $('#table').append(trHTML);
                            },
                            error: function (jqXHR, textStatus, errorThrown)
                        {
                            if(jqXHR.status==401)
                                alert("You have not entered an apikey");
                            else if(jqXHR.status==403)
                                alert("The user is not authorized. Try with another apikey");
                            $('#btnSave').text('save'); //change button text
                            $('#btnSave').attr('disabled',false); //set button enable

                        }
            });
        }
        
        $("#table td").remove();
        $.ajax({
            type: "GET",
            url: '/api/v1/gold-medals?apikey=' + apikey+urlend,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                var trHTML = '';
                $.each(response, function (i, item) {
                    table.push([item.country,item.year,item.goldmedalsnumber,item.silvermedalsnumber]);
                });
                var rows=$(table).length;
                var offset=0;
                var total=Math.ceil(rows/limit);
                $('#page-selection').bootpag({
                   total: total,
                   page: 1,
                   maxVisible: 5
                }).on('page', function(event, num){
                    $("#table td").remove();
                    urlend = "";
                    if(searchby=="gold" & $("#search").val())
                            urlend = "&goldmedalsnumber="+$("#search").val();
                    else if(searchby=="silver" & $("#search").val())
                            urlend = "&silvermedalsnumber="+$("#search").val();
                    $.ajax({
                            type: "GET",
                            url: '/api/v1/gold-medals?apikey=' + apikey+"&offset="+limit*(num-1)+"&limit="+limit+urlend,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (response) {
                                $("#table td").remove();
                                var trHTML = '';
                                $.each(response, function (i, item) {                            
                                    trHTML += '<tr><td>' + item.country + '</td><td>' + item.year + '</td><td>' + item.goldmedalsnumber + '</td><td>'  + item.silvermedalsnumber + '</td><td><a class="btn btn-sm btn-primary" title="Edit""><i class="glyphicon glyphicon-pencil"></i> Edit</a> <a class="btn btn-sm btn-danger" title="Hapus"><i class="glyphicon glyphicon-trash"></i> Delete</a></td></tr>';
                                });
                                $('#table').append(trHTML);
                            }
        });
                    
        });
            }
        });
    }
 
function save()
{
    var apikey=$("#apikey").val();
    $('#btnSave').text('saving...'); //change button text
    $('#btnSave').attr('disabled',true); //set button disable
    var country = $("#country").val();
    var year = $("#year").val();
    var goldmedalsnumber = $("#goldmedalsnumber").val();
    var silvermedalsnumber = $("#silvermedalsnumber").val();
    if(save_method == 'add') {
         $.ajax({
        url : "/api/v1/gold-medals?apikey="+apikey,
        type: "POST",
        data: "{" + ' "country": ' + '"' + country + '"'  + "," +
            '"year": ' + '"' + year + '"'  + "," + ' "goldmedalsnumber": ' + '"' + goldmedalsnumber + '"'  + "," + ' "silvermedalsnumber": ' + '"' + silvermedalsnumber + '"' + "}",
          contentType: "application/json",
        success: function(data)
        {

            $('#modal_form').modal('hide');    
            $('#btnSave').text('save'); //change button text
            $('#btnSave').attr('disabled',false); //set button enable
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            if(jqXHR.status==409)
                alert("There was a conflict: existing resource found, insert another country or year");
            else if(jqXHR.status==400)
                alert("Some of the fields are empty, review them");
            $('#btnSave').text('save'); //change button text
            $('#btnSave').attr('disabled',false); //set button enable
 
        }
    });
    } else {
        $.ajax({
        url : "/api/v1/gold-medals/"+country+"/"+year+"?apikey="+apikey,
        type: "PUT",
        data: "{" + ' "country": ' + '"' + country + '"'  + "," +
            '"year": ' + '"' + year + '"'  + "," + ' "goldmedalsnumber": ' + '"' + goldmedalsnumber + '"'  + "," + ' "silvermedalsnumber": ' + '"' + silvermedalsnumber + '"' + "}",
          contentType: "application/json",
        success: function(data)
        {

            $('#modal_form').modal('hide');    
            $('#btnSave').text('save'); //change button text
            $('#btnSave').attr('disabled',false); //set button enable
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            if(jqXHR.status==404)
                alert("The register was not found, review the country and the year");
            else if(jqXHR.status==400)
                alert("Some of the fields are empty, review them");
            else if(jqXHR.status==403)
                alert("The user has not write access. Try with another apikey");
            $('#btnSave').text('save'); //change button text
            $('#btnSave').attr('disabled',false); //set button enable
        }
            
    });    
    }
    load_table();
}

function loadInitialData(){
    $("#table td").remove();
        var apikey=$("#apikey").val();
        $.ajax({
            type: "GET",
            url: '/api/v1/gold-medals/loadInitialData?apikey=' + apikey,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                var trHTML = '';
                $.each(response, function (i, item) {
                    trHTML += '<tr><td>' + item.country + '</td><td>' + item.year + '</td><td>' + item.goldmedalsnumber + '</td><td>'  + item.silvermedalsnumber + '</td><td><a class="btn btn-sm btn-primary" title="Edit""><i class="glyphicon glyphicon-pencil"></i> Edit</a> <a class="btn btn-sm btn-danger" title="Hapus"><i class="glyphicon glyphicon-trash"></i> Delete</a></td></tr>';
                });
                $('#table').append(trHTML);
            }
        });
    load_table();
}