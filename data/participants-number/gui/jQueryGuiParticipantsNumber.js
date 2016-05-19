    var InitialData;
     
     var arrayTable;
     var contSearch=0;
     var limitOnChange1=0;
     var limitOnChange2=0;
       $(document).ready(function(){
        var key=$('#apikey').val();
          var request = $.ajax({
            url:"/api/v1/participants-number?apikey="+key,
            type:"GET",
            contentType: "application/json; charset=utf-8",
            dataType: "json"
          });

          request.done(function (data){
            InitialData=data;
            $('#participantsnumber').datagrid('loadData', {"total":data.length,"rows":data});
            arrayTable =$('#participantsnumber').datagrid('getRows');
          });

          request.always(function (jqXHR,status){
            if(jqXHR.status==401){
                $('#participantsnumber').datagrid('loadData', {"total":0,"rows":[]});
                arrayTable =$('#participantsnumber').datagrid('getRows');
            }else if(jqXHR.status==402){
                $('#participantsnumber').datagrid('loadData', {"total":0,"rows":[]});
                arrayTable =$('#participantsnumber').datagrid('getRows');
            }else if(jqXHR.status==429){
                $('#participantsnumber').datagrid('loadData', {"total":0,"rows":[]});
                arrayTable =$('#participantsnumber').datagrid('getRows');
            }
          });
});
            var url, method;
            function newData(){
                $('#country1').combogrid('enable');
                $('#year1').combogrid('enable');
                $('#dlg').dialog('open').dialog('center').dialog('setTitle','New data');
                $('#fm').form('clear');
                var key=$('#apikey').val();
                url = "/api/v1/participants-number?apikey="+key;
                method= "POST";
                }

            function saveData(){
                $('#fm').form('submit',{

                onSubmit: function(){
                    var country = $("#country1").val();
                    var year = $("#year1").val();
                    var maleathletesnumber = $("#maleathletesnumber1").val();
                    var femaleathletesnumber = $("#femaleathletesnumber1").val();
                        var request = $.ajax({
                        url:url,
                        type:method,
                        contentType: "application/json; charset=utf-8",
                        data: "{" + ' "country": ' + '"' + country + '"'  + "," +
                        '"year": ' + '"' + year + '"'  + "," + ' "maleathletesnumber": ' + '"' + maleathletesnumber + '"'  + "," + ' "femaleathletesnumber": ' + '"' + femaleathletesnumber + '"' + "}",
                        dataType: "json",
                        success: function(data)
                                {
                                    $('#dlg').dialog('close');        // close the dialog
                                    refreshTable();    // reload the user data
                                },
                                error: function (jqXHR)
                                {
                                    if(jqXHR.status==409){
                                        alert("There was a conflict: existing resource found, insert another country or year");
                                    }else if(jqXHR.status==400){
                                        if(method=="POST"){
                                            alert("Some of the fields are empty, review them");
                                        }else if(method=="PUT"){
                                            alert("ERROR: The Country and the year must be the same");
                                        }
                                        
                                    }else if(jqXHR.status==401){
                                        alert("Wrong API Key");
                                    }else if(jqXHR.status==402){
                                        alert("Payment required");
                                    }else if(jqXHR.status==429){
                                        alert("To many request");
                                    }
                                    refreshTable();
                                }
                                        
                        });
                                
                        }
                            
                            
                        });
                    }

            function refreshTable(){
                $('#participantsnumber').datagrid('reload');
            }

            function loadInitialData(){
                var key=$('#apikey').val();
                url = '/api/v1/participants-number/loadInitialData?apikey='+key;
                method= "GET";
                    var request =$.ajax({
                        type: method,
                        url: url,
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function(data)
                                {
                                    $('#participantsnumber').datagrid('loadData', {"total":InitialData.length,"rows":InitialData}); 
                                },
                        error: function (jqXHR)
                                { if(jqXHR.status==401){
                                        alert("Wrong API Key")
                                    }else if(jqXHR.status==402){
                                        alert("Payment required");
                                    }else if(jqXHR.status==429){
                                        alert("To many request");
                                    }
                                    refreshTable();
                                }
                        
                    });
                    
            }

            function editData(){
                var row = $('#participantsnumber').datagrid('getSelected');
                if (row){
                    $('#country1').combogrid('disable');
                    $('#year1').combogrid('disable');
                    $('#dlg').dialog('open').dialog('center').dialog('setTitle','Edit Data');
                    $('#fm').form('load',row);
                    var country = $("#country1").val();
                    var year = $("#year1").val();
                    var key=$('#apikey').val();
                    url = "/api/v1/participants-number/"+country+"/"+year+"?apikey="+key;
                    method= "PUT";
                }
        }

        function destroyData(){
            var key=$('#apikey').val();
            var row = $('#participantsnumber').datagrid('getSelected');
            var value= $('#participantsnumber').datagrid('getSelected','columns');
            var country= value.country;
            var year= value.year;
            method="DELETE";
            url= "/api/v1/participants-number/"+country+"/"+year+"?apikey="+key;
            if (row){
                $.messager.confirm('Confirm','Are you sure you want to destroy this data?',function(r){
                    if (r){
                        var request =$.ajax({
                        type: method,
                        url: url,
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function(data)
                                {
                                    
                                },
                        error: function (jqXHR)
                                { if(jqXHR.status==401){
                                        alert("Wrong API Key");
                                    }else if(jqXHR.status==402){
                                        alert("Payment required");
                                    }else if(jqXHR.status==429){
                                        alert("To many request");
                                    }
                                }
                        
                        
                    });
                       refreshTable(); 
                    }
                });
            }
            
        }

        function SearchCountry(){
            var limit=$('#limit1').val();
            var key=$('#apikey').val();
            var country=$('#search1').val();
            method="GET";
            url="/api/v1/participants-number/"+country+"?apikey="+key+"&offset=0&limit="+limit;
            var request =$.ajax({
                        type: method,
                        url: url,
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function(data)
                                {  
                                 $('#participantsnumber').datagrid('loadData', {"total":data.length,"rows":data});  
                                },
                        error: function (jqXHR)
                                { if(jqXHR.status==401){
                                        alert("Wrong API Key");
                                    }else if(jqXHR.status==404){
                                        alert("NOT FOUND: Please write another country");
                                    }else if(jqXHR.status==402){
                                        alert("Payment required");
                                    }else if(jqXHR.status==429){
                                        alert("To many request");
                                    }
                                }
                        
                        
                    });
        }

        function SearchByYear(){
            var limit=$('#limit2').val();
            var key=$('#apikey').val();
            var from1=$('#search2').val();
            var to1=$('#search3').val();
            method="GET";
            url="/api/v1/participants-number/?apikey="+key+"&from="+from1+"&to="+to1+"&offset=0&limit="+limit;
            var request =$.ajax({
                        type: method,
                        url: url,
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function(data)
                                {  
                                 $('#participantsnumber').datagrid('loadData', {"total":data.length,"rows":data});  
                                },
                        error: function (jqXHR)
                                { if(jqXHR.status==401){
                                        alert("Wrong API Key");
                                    }else if(jqXHR.status==404){
                                        alert("NOT FOUND: Please write another year");
                                    }else if(jqXHR.status==402){
                                        alert("Payment required");
                                    }else if(jqXHR.status==429){
                                        alert("To many request");
                                    }
                                }
                        
                        
                    });
        }

        function datasearch(){
            $('#dlgsearch').dialog('open').dialog('center').dialog('setTitle','Search data');
        }

        function datasearchcountry(){
            $('#dlgsearchcountry').dialog('open').dialog('center').dialog('setTitle','Search country');
             $('#dlgsearch').dialog('close');
        }

        function datasearchyear(){
            $('#dlgsearchyear').dialog('open').dialog('center').dialog('setTitle','Search by year');
             $('#dlgsearch').dialog('close');
        }

        function next(){
            
            var limitPage=parseInt( $("#limit").val() );
            limitOnChange2=limitOnChange1;
            limitOnChange1=limitPage;
            if(limitOnChange1!=limitOnChange2){
                contSearch=0;
            }
            var key=$('#apikey').val();
            //console.log("Limit per page: "+limitPage);
            //console.log("Cont search: "+contSearch);
            //console.log(arrayPage);
            //console.log("array: "+arrayTable);
            var request = $.ajax({
                url:"/api/v1/participants-number?apikey="+key+"&offset="+contSearch+"&limit="+limitPage,
                type:"GET",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(data)
                                {  
                                 $('#participantsnumber').datagrid('loadData', {"total":data.length,"rows":data});
                                 $('#buttonNext').linkbutton('enable');
                                 $('#buttonPrevious').linkbutton('enable');
                                 
                                 if(limitPage>data.length){
                                    $('#buttonNext').linkbutton('disable');
                                 }else{
                                    contSearch+=limitPage;
                                 } 
                                },
                        error: function (jqXHR)
                                { if(jqXHR.status==401){
                                        alert("Wrong API Key");
                                    }else if(jqXHR.status==402){
                                        alert("Payment required");
                                    }else if(jqXHR.status==429){
                                        alert("To many request");
                                    }
                                }
                });
        }

        function previous(){
            var limitPage=parseInt( $("#limit").val() );
            var key=$('#apikey').val();
            contSearch-=limitPage;

            limitOnChange2=limitOnChange1;
            limitOnChange1=limitPage;
            if(limitOnChange1!=limitOnChange2){
                contSearch=0;
            }
            
            var request = $.ajax({
                url:"/api/v1/participants-number?apikey="+key+"&offset="+contSearch+"&limit="+limitPage,
                type:"GET",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(data)
                                {  
                                 $('#participantsnumber').datagrid('loadData', {"total":data.length,"rows":data});
                                 $('#buttonNext').linkbutton('enable');
                                 if(contSearch<=0){
                                    $('#buttonPrevious').linkbutton('disable');
                                    contSearch+=limitPage;
                                }

                                },
                        error: function (jqXHR)
                                { if(jqXHR.status==401){
                                        alert("Wrong API Key");
                                    }else if(jqXHR.status==402){
                                        alert("Payment required");
                                    }else if(jqXHR.status==429){
                                        alert("To many request");
                                    }
                                }
                });
        }

        function nextCountry(){
            var limitPage=parseInt( $("#limit1").val() );
            limitOnChange2=limitOnChange1;
            limitOnChange1=limitPage;
            if(limitOnChange1!=limitOnChange2){
                contSearch=0;
            }
            var key=$('#apikey').val();
            var country=$('#search1').val();
            //console.log("Limit per page: "+limitPage);
            //console.log("Cont search: "+contSearch);
            //console.log(arrayPage);
            //console.log("array: "+arrayTable);
            var request = $.ajax({
                url:"/api/v1/participants-number/"+country+"?apikey="+key+"&offset="+contSearch+"&limit="+limitPage,
                type:"GET",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(data)
                                {  
                                 $('#participantsnumber').datagrid('loadData', {"total":data.length,"rows":data});
                                 $('#buttonNextCountry').linkbutton('enable');
                                 $('#buttonPreviousCountry').linkbutton('enable');
                                 
                                 if(limitPage>data.length){
                                    $('#buttonNextCountry').linkbutton('disable');
                                 }else{
                                    contSearch+=limitPage;
                                 } 
                                },
                        error: function (jqXHR)
                                { if(jqXHR.status==401){
                                        alert("Wrong API Key");
                                    }else if(jqXHR.status==404){
                                        alert("NOT FOUND: Please write another country");
                                    }else if(jqXHR.status==402){
                                        alert("Payment required");
                                    }else if(jqXHR.status==429){
                                        alert("To many request");
                                    }
                                }
                });
        }

        function previousCountry(){
            var limitPage=parseInt( $("#limit1").val() );
            var key=$('#apikey').val();
            var country=$('#search1').val();
            contSearch-=limitPage;
            limitOnChange2=limitOnChange1;
            limitOnChange1=limitPage;
            if(limitOnChange1!=limitOnChange2){
                contSearch=0;
            }
            
            var request = $.ajax({
                url:"/api/v1/participants-number/"+country+"?apikey="+key+"&offset="+contSearch+"&limit="+limitPage,
                type:"GET",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(data)
                                {  
                                 $('#participantsnumber').datagrid('loadData', {"total":data.length,"rows":data});
                                 $('#buttonNextCountry').linkbutton('enable');
                                 if(contSearch<=0){
                                    $('#buttonPreviousCountry').linkbutton('disable');
                                    contSearch+=limitPage;
                                }

                                },
                        error: function (jqXHR)
                                { if(jqXHR.status==401){
                                        alert("Wrong API Key");
                                    }else if(jqXHR.status==404){
                                        alert("NOT FOUND: Please write another year");
                                    }else if(jqXHR.status==402){
                                        alert("Payment required");
                                    }else if(jqXHR.status==429){
                                        alert("To many request");
                                    }
                                }
                });
        }

        function nextYear(){
            var limitPage=parseInt( $("#limit2").val() );
            limitOnChange2=limitOnChange1;
            limitOnChange1=limitPage;
            if(limitOnChange1!=limitOnChange2){
                contSearch=0;
            }
            var key=$('#apikey').val();
            var from1=$('#search2').val();
            var to1=$('#search3').val();
            var request = $.ajax({
                url:"/api/v1/participants-number/?apikey="+key+"&from="+from1+"&to="+to1+"&offset="+contSearch+"&limit="+limitPage,
                type:"GET",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(data)
                                {  
                                 $('#participantsnumber').datagrid('loadData', {"total":data.length,"rows":data});
                                 $('#buttonNextYear').linkbutton('enable');
                                 $('#buttonPreviousYear').linkbutton('enable');
                                 
                                 if(limitPage>data.length){
                                    $('#buttonNextYear').linkbutton('disable');
                                 }else{
                                    contSearch+=limitPage;
                                 } 
                                },
                        error: function (jqXHR)
                                { if(jqXHR.status==401){
                                        alert("Wrong API Key");
                                    }else if(jqXHR.status==404){
                                        alert("NOT FOUND: Please write another year");
                                    }else if(jqXHR.status==402){
                                        alert("Payment required");
                                    }else if(jqXHR.status==429){
                                        alert("To many request");
                                    }
                                }
                });
        }

        function previousYear(){
            var limitPage=parseInt( $("#limit2").val() );
            var key=$('#apikey').val();
            contSearch-=limitPage;
            var from1=$('#search2').val();
            var to1=$('#search3').val();
            limitOnChange2=limitOnChange1;
            limitOnChange1=limitPage;
            if(limitOnChange1!=limitOnChange2){
                contSearch=0;
            }
            
            var request = $.ajax({
                url:"/api/v1/participants-number/?apikey="+key+"&from="+from1+"&to="+to1+"&offset="+contSearch+"&limit="+limitPage,
                type:"GET",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(data)
                                {  
                                 $('#participantsnumber').datagrid('loadData', {"total":data.length,"rows":data});
                                 $('#buttonNextYear').linkbutton('enable');
                                 if(contSearch<=0){
                                    $('#buttonPreviousYear').linkbutton('disable');
                                    contSearch+=limitPage;
                                }

                                },
                        error: function (jqXHR)
                                { if(jqXHR.status==401){
                                        alert("Wrong API Key");
                                    }else if(jqXHR.status==404){
                                        alert("NOT FOUND: Please write another year");
                                    }else if(jqXHR.status==402){
                                        alert("Payment required");
                                    }else if(jqXHR.status==429){
                                        alert("To many request");
                                    }
                                }
                });
        }