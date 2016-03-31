var fs=require("fs");
var key=false;
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

module.exports.getLoadIntialDataParticipantsnumber=function (req,res){  //load json  atheletesnumber
    athletesnumber= [];
    var apikey=req.query.apikey;
	if(apikey!="abc"){
		console.log("failed");
		res.sendStatus(401);
	}else{
		console.log("success");
		key=true;
	}

	if(key){
		var content=fs.readFileSync('dataParticipantsNumber.json','utf8');
    	athletesnumber = JSON.parse(content);
    	console.log("The participants numbers data has been loaded.")
    	res.sendStatus(200);
		
	}else{
		console.log("you must identificate");
		res,sendStatus(401);
	}
};
    

module.exports.getParticipantsnumber=function (req,res){
	 var country=req.query.country;//search
     if(key){
     	if(country!=null){
     		var arrayathletesnumber = StrArrayParticipantsnumberCountry(country,atheletesnumber);
     		res.send(arrayathletesnumber);
			res.sendStatus(200);

     	}else{
     		console.log("New GET for directory listing");
    		res.status(200).jsonp(athletesnumber);
     	}
		
	}else{
		console.log("you must identificate");
		res.sendStatus(401);
	}
  };

module.exports.getParticipantsnumber=function (req,res){ //
	 
	 if(key){
		var country = req.params.country;
	 	var year = req.params.year;
	 	console.log("New GET of resource "+country+" "+year);
	 	var athletesnumber2 = StrArrayParticipantsnumber(country,year,atheletesnumber);
		if(athletesnumber2 != -1){
	  		res.send(athletesnumber[athletesnumber2]);
			res.sendStatus(200);
		 }else{
			res.sendStatus(404);
		 }

	 }else{
		console.log("you must identificate");
 		res.sendStatus(401);
	 }
};

module.exports.getParticipantsnumberCountryOrYear=function (req,res){
	 var countryOrYear = req.params.countryOrYear;
	 var limit=req.query.limit;//paginación
	 var offset=req.query.offset;

	if(key){
		if(isNaN(countryOrYear)){//if not a number
		 		 console.log("New GET of resource "+countryOrYear);
		 		 console.log("Limit "+limit);
		 		 console.log("Offset "+offset);
				 var arrayathletesnumber = StrArrayParticipantsnumberCountry(countryOrYear,athletesnumber);

			   if(arrayathletesnumber.length>0){
				  	res.send(arrayathletesnumber);
					res.sendStatus(200);
				 }
				 else{
					res.sendStatus(404);
				 }
			 }else{//if a year
			 	 console.log("New GET of resource "+countryOrYear);
			 	 console.log("Limit "+limit);
				 console.log("Offset "+offset);
				 var arrayathletesnumber = StrArrayParticipantsnumber(countryOrYear,athletesnumber);

			   if(arrayathletesnumber.length>0){
				  	res.send(arrayathletesnumber);
					res.sendStatus(200);
				 }
				 else{
					res.sendStatus(404);
				 }
			 }
	}else{
		console.log("you must identificate");
 		res.sendStatus(401);
	}
};


module.exports.postParticipantsnumber=function (req,res){
	if(key){
		var athnumber = req.body;
		var country2= athnumber.country;
		var year2= athnumber.year;
		var array2=StrArrayParticipantsnumber(country2,year2,athletesnumber);
		console.log(array2);
		if(array2==-1){
			athletesnumber.push(athnumber);
			console.log("New POST of resource "+athnumber.country+" "+athnumber.year);
			res.sendStatus(201);
			
			
		}else{
			console.log("Conflict");
 			res.sendStatus(409);
		}
		
	}else{
		console.log("you must identificate");
 		res.sendStatus(401);
	}
        
};

module.exports.postParticipantsnumber=function (req,res){
        res.sendStatus(405);
    }

module.exports.putParticipantsnumber=function (req,res){ 
	if(key){
			var temp = req.body;
					var country = req.params.country;
					var year = req.params.year;
					var athnumber2 = StrArrayParticipantsnumber(country,year,athletesnumber);
					if (athnumber2 != -1){
							athletesnumber[athnumber2].country=temp.country;
							athletesnumber[athnumber2].year=temp.year;
							athletesnumber[athnumber2].maleathletesnumber=temp.maleathletesnumber;
							athletesnumber[athnumber2].femaleathletesnumber=temp.femaleathletesnumber;
							res.sendStatus(203);
				}
				else{
						res.sendStatus(404);
				}
	}else{
		console.log("you must identificate");
		res.sendStatus(401);
	}
		
};

module.exports.putParticipantsnumber=function (req,res){
        res.sendStatus(400);
    }

module.exports.deleteParticipantsnumber=function (req,res){
	if(key){
		var country = req.params.country;
			var year = req.params.year;
			console.log("New DELETE of resource "+country+" "+year);
			var athnumber2 = StrArrayParticipantsnumber(country,year,atheletesnumber);
			if (athnumber2 != -1){
				 athletesnumber.splice(athnumber2,1);
				 res.sendStatus(200);
			}else{
				res.sendStatus(404);
			 }
	}else{
		console.log("you must identificate");
 		res.sendStatus(401);
	}
	
 };

module.exports.deleteParticipantsnumber=function (req,res){
	if(key){
		console.log("New DELETE of all resources");
	 	athletesnumber.splice(0,athletesnumber.length);
	 	res.sendStatus(200);
	}else{
		console.log("you must identificate");
 		res.sendStatus(401);
	}
	 
 };

module.exports.deleteParticipantsnumberCountryOrYear=function (req,res){
	var countryOrYear = req.params.countryOrYear;
	if(key){
			if(isNaN(countryOrYear)){//if not a number
	 		 console.log("New DELETE of resource "+countryOrYear);
			 var arrayathletesnumber = StrArrayParticipantsnumberCountry(countryOrYear,athletesnumber);

		  	 if(arrayathletesnumber.length>0){
			  	for(var i=0;i<athletesnumber.length;i++){
			  		if(athletesnumber[i].country==countryOrYear){
						athletesnumber.splice(i,1);
						res.sendStatus(200);
					}
			  	}
		      		

			 }else{
				res.sendStatus(404);
			 }
		 }else{//if a year
		 	console.log("New DELETE of resource "+countryOrYear);
			 var arrayathletesnumber = StrArrayParticipantsnumberYear(countryOrYear,athletesnumber);

		   if(arrayathletesnumber.length>0){
			  	for(var i=0;i<athletesnumber.length;i++){
			  		if(athletesnumber[i].year==countryOrYear){
						athletesnumber.splice(i,1);
						res.sendStatus(200);
					}
			  	}

			 }else{
				res.sendStatus(404);
			 }
		 }
	
	}else{
		console.log("you must identificate");
 		res.sendStatus(401);
	}	 
 };
