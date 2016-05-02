var fs=require("fs");
var athletesnumber=[
 {"country":"EEUU","year":"2012","maleathletesnumber":288,"femaleathletesnumber":251},
 {"country":"EEUU","year":"2008","maleathletesnumber":307,"femaleathletesnumber":282},
 {"country":"China","year":"2012","maleathletesnumber":215,"femaleathletesnumber":170},
 {"country":"China","year":"2008","maleathletesnumber":312,"femaleathletesnumber":288},
 {"country":"Spain","year":"2012","maleathletesnumber":167,"femaleathletesnumber":131},
 {"country":"Spain","year":"2008","maleathletesnumber":162,"femaleathletesnumber":120}];

function StrArrayParticipantsnumber(str1,str2,elements){
	var cont = -1;
 for(var i=0;i<elements.length;i++)
      if(elements[i].country==str1 && elements[i].year==str2){
				cont=i;
			}
	return cont;
};

function StrArrayParticipantsnumberCountry(str1,elements){
 	var arr=[];
	for(var i=0;i<elements.length;i++)
	      if(elements[i].country==str1){
					arr.push(elements[i]);
				}
		return arr;
};

function StrArrayParticipantsnumberYear(str1,elements){
 	var arr=[];
	for(var i=0;i<elements.length;i++)
	      if(elements[i].year==str1){
					arr.push(elements[i]);
				}
		return arr;
};

function StrArrayParticipantsnumberCountrySearch(countryOrYear,elements,from1,to1){
	var arr=[];
	for(var i=0;i<elements.length;i++)
	      if(elements[i].country==countryOrYear && elements[i].year>=from1 && elements[i].year<=to1){
				arr.push(elements[i]);
			}
		return arr;
}

function ApiKey(password){
	var pass=false;
	if(password=="abc"){
		pass=true;
	}
	return pass;
}

function FilterLimit(limit,offset){	//filter for pagination
	var res=[];
	var cont=0;
	if(limit==null){
		if(offset>athletesnumber.length){
			console.log("Error, offset greater than the array size.");
		}else{

		for(var i=offset;i<athletesnumber.length;i++){
				res.push(athletesnumber[i]);
				cont++;
			}
		}
	}else if(offset==null){
		for(var i=0;i<athletesnumber.length;i++){
			if(limit>cont){
				res.push(athletesnumber[i]);
				cont++;
				}
			}
	}else{
		if(offset>athletesnumber.length){
			console.log("Error, offset greater than the array size.");
		}else{

		for(var i=offset;i<athletesnumber.length;i++){
			if(limit>cont){
				res.push(athletesnumber[i]);
				cont++;
				}
			}
		}
	}
	
	return res;
}

function CheckBody(body){
    return body.country && body.year && body.maleathletesnumber && body.femaleathletesnumber;
    
}

module.exports.getLoadIntialDataParticipantsnumbers=function (req,res){  //load json  atheletesnumber
    athletesnumber= [];
    var apikey=ApiKey(req.query.apikey);

	if(apikey){
		var content=fs.readFileSync('dataParticipantsNumber.json','utf8');
    	athletesnumber = JSON.parse(content);
    	console.log("The participants numbers data has been loaded.")
    	res.sendStatus(201);//OK
		
	}else{
		console.log("you must identificate");
		res.sendStatus(401);// Unauthorized
	}
};
    

module.exports.getParticipantsnumbers=function (req,res){
	 var limit=req.query.limit;//paginación
	 var offset=req.query.offset;//paginación
	 var apikey=ApiKey(req.query.apikey);
     if(apikey){
     	if(offset==null && limit==null ){
			console.log("New GET for directory listing");
    		res.status(200).jsonp(athletesnumber);//OK
     	}else{
     		res.send(FilterLimit(limit,offset));
     		res.sendStatus(200);//ok
     	}
     						
	}else{
		console.log("you must identificate");
		res.sendStatus(401);// Unauthorized
	}
  };

module.exports.getParticipantsnumber=function (req,res){ //
	 var apikey=ApiKey(req.query.apikey);
	 if(apikey){
		var country = req.params.country;
	 	var year = req.params.year;
	 	console.log("New GET of resource "+country+" "+year);
	 	var athletesnumber2 = StrArrayParticipantsnumber(country,year,athletesnumber);
		if(athletesnumber2 != -1){
	  		res.send(athletesnumber[athletesnumber2]);
			res.sendStatus(200);//OK
		 }else{
			res.sendStatus(404);//Not found
		 }

	 }else{
		console.log("you must identificate");
 		res.sendStatus(401);// Unauthorized
	 }
};

module.exports.getParticipantsnumbersCountryOrYear=function (req,res){
	 var countryOrYear = req.params.countryOrYear;
	 var from1=req.query.from;//search
	 var to1=req.query.to;//search
	 var apikey=ApiKey(req.query.apikey);
	 var limit=req.query.limit;//paginación
	 var offset=req.query.offset;//paginación
	 
	if(apikey){
		if(offset==null && limit==null){
			getParticipantsCountryYear(countryOrYear,athletesnumber,res,from1,to1);
		}else{
			filterLimitCountryOrYear(countryOrYear,limit,offset,res);
     	}
		
	}else{
		console.log("you must identificate");
 		res.sendStatus(401);// Unauthorized
	}
};

function filterLimitCountryOrYear(countryOrYear,limit,offset,res){
	console.log("New GET with FilterLimit of resource "+countryOrYear);
	var array=[];
	var array2=[];
	var cont=0;
	if(isNaN(countryOrYear)){//if is a COUNTRY

		array= StrArrayParticipantsnumberCountry(countryOrYear,athletesnumber);
	}else{//if is a YEAR
		array= StrArrayParticipantsnumberYear(countryOrYear,athletesnumber);
	}
	if(array.length>0){
		if(offset>array.length){
			console.log("Error, offset greater than the array size.");
		}else{

			for(var i=offset;i<array.length;i++){
				if(limit>cont){
					array2.push(array[i]);
					cont++;
					}
				}
			res.send(array2); 
			res.sendStatus(200);//OK
		}
	}else{
			res.sendStatus(404);//not found
		}
}

function getParticipantsCountryYear(countryOrYear,array,res,from1,to1){
	console.log("New GET of resource "+countryOrYear);
	var arrayathletesnumber=[];
	if(isNaN(countryOrYear)){//if is a COUNTRY
		if(from1==null || to1==null){
			arrayathletesnumber = StrArrayParticipantsnumberCountry(countryOrYear,array);
			
		}else{//search
			arrayathletesnumber = StrArrayParticipantsnumberCountrySearch(countryOrYear,array,from1,to1);
			
		}
	}else{//if is a YEAR
		arrayathletesnumber = StrArrayParticipantsnumberYear(countryOrYear,array);
		
	}

	if(arrayathletesnumber.length>0){
			res.send(arrayathletesnumber); 
			res.sendStatus(200);//OK
	}else{
			res.sendStatus(404);//not found
		}
}

module.exports.postParticipantsnumbers=function (req,res){
	var apikey=ApiKey(req.query.apikey);
	if(apikey){
		var athnumber = req.body;
		if(CheckBody(athnumber)){
			var array2=StrArrayParticipantsnumber(athnumber.country,athnumber.year,athletesnumber);
			if(array2==-1){//not exist the resource
				athletesnumber.push(athnumber);
				console.log("New POST of resource "+athnumber.country+" "+athnumber.year);
				res.sendStatus(201);//created
						
			}else{//if exist the resource CONFLICT
 				res.sendStatus(409);// Conflict 
			}

		}else{
 			res.sendStatus(400);// Bad request
		}
		
		
	}else{
		console.log("you must identificate");
 		res.sendStatus(401);//Unauthorized
	}
        
};

module.exports.postParticipantsnumber=function (req,res){
        res.sendStatus(405);//Method Not Allowed
    }

module.exports.putParticipantsnumber=function (req,res){ 
	var apikey=ApiKey(req.query.apikey);
	if(apikey){
		console.log(req.body);
		console.log(req.params.country);
		console.log(req.params.year);
		if(CheckBody(req.body) && req.body.country==req.params.country && req.body.year==req.params.year){
				var athnumber2 = StrArrayParticipantsnumber(req.params.country,req.params.year,athletesnumber);//req url
					if (athnumber2 != -1){
						athletesnumber[athnumber2].country=req.body.country;//req body
						athletesnumber[athnumber2].year=req.body.year;
						athletesnumber[athnumber2].maleathletesnumber=req.body.maleathletesnumber;
						athletesnumber[athnumber2].femaleathletesnumber=req.body.femaleathletesnumber;
						res.sendStatus(200);//ok
					}else{
					res.sendStatus(404);//Not Found
					}
		}else{
			res.sendStatus(400);//bad request
		}
			
	}else{
		console.log("you must identificate");
		res.sendStatus(401);//Unauthorized
	}
		
};

module.exports.putParticipantsnumbers=function (req,res){
        res.sendStatus(405);//Method Not Allowed
    }

module.exports.deleteParticipantsnumber=function (req,res){
	var apikey=ApiKey(req.query.apikey);
	if(apikey){
		var country = req.params.country;
		var year = req.params.year;
		console.log("New DELETE of resource "+country+" "+year);
		var athnumber2 = StrArrayParticipantsnumber(country,year,athletesnumber);
		if (athnumber2 != -1){
			athletesnumber.splice(athnumber2,1);
			res.sendStatus(200);//ok
		}else{
			res.sendStatus(404);//Not Found
			}
	}else{
		console.log("you must identificate");
 		res.sendStatus(401);//Unauthorized
	}
	
 };

module.exports.deleteParticipantsnumbers=function (req,res){
	var apikey=ApiKey(req.query.apikey);
	if(apikey){
		console.log("New DELETE of all resources");
	 	athletesnumber.splice(0,athletesnumber.length);
	 	res.sendStatus(200);//ok
	}else{
		console.log("you must identificate");
 		res.sendStatus(401);//Unauthorized
	}
	 
 };

module.exports.deleteParticipantsnumberCountryOrYear=function (req,res){
	var countryOrYear = req.params.countryOrYear;
	var apikey=ApiKey(req.query.apikey);
	if(apikey){
		DeleteParticipantsCountryYear(countryOrYear,athletesnumber,res)
	}else{
		console.log("you must identificate");
 		res.sendStatus(401);//Unauthorized
	}	 
 };

function DeleteParticipantsCountryYear(countryOrYear,array,res){
	console.log("New DELETE of resource "+countryOrYear);
	arrayathletesnumber=[];
	if(isNaN(countryOrYear)){//if is a country
		arrayathletesnumber = StrArrayParticipantsnumberCountry(countryOrYear,array);
	}else{//if is a year
		arrayathletesnumber = StrArrayParticipantsnumberYear(countryOrYear,athletesnumber);

	}

	if(arrayathletesnumber.length>0){
		for(var i=0;i<athletesnumber.length;i++){
			if(athletesnumber[i].country==countryOrYear || athletesnumber[i].year==countryOrYear){
				athletesnumber.splice(i,1);
				res.sendStatus(200);//ok
					}
			  	}
		    
	}else{
		res.sendStatus(404);//not found
	}

}
