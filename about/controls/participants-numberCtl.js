var fs=require("fs");
var athletesnumber=[
 {"country":"EEUU","year":"2012","maleathletesnumber":261 ,"femaleathletesnumber":268},
 {"country":"EEUU","year":"2008","maleathletesnumber":307,"femaleathletesnumber":282},
 {"country":"China","year":"2012","maleathletesnumber":164,"femaleathletesnumber":216},
 {"country":"China","year":"2008","maleathletesnumber":312,"femaleathletesnumber":288},
 {"country":"Spain","year":"2012","maleathletesnumber":166,"femaleathletesnumber":112},
 {"country":"Spain","year":"2008","maleathletesnumber":162,"femaleathletesnumber":120},
 {"country":"Germany","year":"2012","maleathletesnumber":206,"femaleathletesnumber":186},
 {"country":"Germany","year":"2008","maleathletesnumber":237,"femaleathletesnumber":183},
 {"country":"France","year":"2012","maleathletesnumber":196,"femaleathletesnumber":134},
 {"country":"France","year":"2008","maleathletesnumber":188,"femaleathletesnumber":121},
 {"country":"Italy","year":"2012","maleathletesnumber":167,"femaleathletesnumber":117},
 {"country":"Italy","year":"2008","maleathletesnumber":203,"femaleathletesnumber":130},
 {"country":"Russia","year":"2012","maleathletesnumber":225,"femaleathletesnumber":211},
 {"country":"Russia","year":"2008","maleathletesnumber":231,"femaleathletesnumber":223},
 {"country":"Brazil","year":"2012","maleathletesnumber":134,"femaleathletesnumber":126},
 {"country":"Brazil","year":"2008","maleathletesnumber":139,"femaleathletesnumber":129},
 {"country":"Canada","year":"2012","maleathletesnumber":121,"femaleathletesnumber":156},
 {"country":"Canada","year":"2008","maleathletesnumber":186,"femaleathletesnumber":146},
 {"country":"Japan","year":"2012","maleathletesnumber":139,"femaleathletesnumber":151},
 {"country":"Japan","year":"2008","maleathletesnumber":167,"femaleathletesnumber":165},
 {"country":"Great Britain","year":"2012","maleathletesnumber":296,"femaleathletesnumber":245},
 {"country":"Great Britain","year":"2008","maleathletesnumber":163,"femaleathletesnumber":141},
 {"country":"Greece","year":"2004","maleathletesnumber":292,"femaleathletesnumber":149},
 {"country":"Denmark","year":"2004","maleathletesnumber":50,"femaleathletesnumber":42},
 {"country":"Mexico","year":"2004","maleathletesnumber":55,"femaleathletesnumber":54}];

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

		var content=fs.readFileSync('dataParticipantsNumber.json','utf8');
    	athletesnumber = JSON.parse(content);
    	console.log(content);
    	console.log("The participants numbers data has been loaded.")
    	res.sendStatus(201);//OK
};
    

module.exports.getParticipantsnumbers=function (req,res){
	 var limit=req.query.limit;//paginación
	 var offset=req.query.offset;//paginación
	 var from1=req.query.from;//search
	 var to1=req.query.to;//search

     	if(from1==null && to1==null){

				if(offset==null && limit==null ){
							console.log("New GET for directory listing");
				    		res.status(200).jsonp(athletesnumber);//OK
				     	}else{
				     		res.send(FilterLimit(limit,offset));
				     		res.sendStatus(200);//ok
				     	}
     	}else{//Search
     		res.send(generalSearch(from1,to1,offset,limit,res));
     		res.sendStatus(200);
     	}
   					
  };

module.exports.getParticipantsnumber=function (req,res){ //
	 
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
};

module.exports.getParticipantsnumbersCountryOrYear=function (req,res){
	 var countryOrYear = req.params.countryOrYear;
	 var from1=req.query.from;//search
	 var to1=req.query.to;//search
	 var limit=req.query.limit;//paginación
	 var offset=req.query.offset;//paginación
	 
		if(offset==null && limit==null){
			participantsCountryYear(countryOrYear,athletesnumber,res,from1,to1);
		}else{
			filterLimitCountryOrYear(countryOrYear,limit,offset,res);
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

function participantsCountryYear(countryOrYear,array,res,from1,to1){
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

function generalSearch(from1,to1,offset,limit,res){
	var array=[];
	var array2=[];
	var cont=0;
	if(to1==null){
		for(i=0;i<athletesnumber.length;i++){
			if(athletesnumber[i].year>=from1){
				array.push(athletesnumber[i]);
			}
		}
	}else if(from1==null){
		for(i=0;i<athletesnumber.length;i++){
			if(athletesnumber[i].year<=to1){
				array.push(athletesnumber[i]);
			}
		}
	}else{
		for(i=0;i<athletesnumber.length;i++){
			if(athletesnumber[i].year>=from1 && athletesnumber[i].year<=to1){
				array.push(athletesnumber[i]);
			}
	}

	for(var i=offset;i<array.length;i++){
			if(limit>cont){
				array2.push(array[i]);
				cont++;
				}
			}
		}
	if(array2.length>0){
			res.send(array2); 
			res.sendStatus(200);//OK
	}else{
			res.sendStatus(404);//not found
		}

}

module.exports.postParticipantsnumbers=function (req,res){
	
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
        
};

module.exports.postParticipantsnumber=function (req,res){
        res.sendStatus(405);//Method Not Allowed
    }

module.exports.putParticipantsnumber=function (req,res){ 
	
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
		
};

module.exports.putParticipantsnumbers=function (req,res){
        res.sendStatus(405);//Method Not Allowed
    }

module.exports.deleteParticipantsnumber=function (req,res){
	
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
	
 };

module.exports.deleteParticipantsnumbers=function (req,res){
		console.log("New DELETE of all resources");
	 	athletesnumber.splice(0,athletesnumber.length);
	 	res.sendStatus(200);//ok 
 };

module.exports.deleteParticipantsnumberCountryOrYear=function (req,res){
	var countryOrYear = req.params.countryOrYear;
	
		DeleteParticipantsCountryYear(countryOrYear,athletesnumber,res);	 
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
