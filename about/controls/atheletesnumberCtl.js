var fs=require("fs");
var key=false;
var atheletesnumber=[
 {"country":"EEUU","year":"2012","maleathletesnumber":288,"femaleathletesnumber":251},
 {"country":"EEUU","year":"2008","maleathletesnumber":307,"femaleathletesnumber":282},
 {"country":"China","year":"2012","maleathletesnumber":215,"femaleathletesnumber":170},
 {"country":"China","year":"2008","maleathletesnumber":312,"femaleathletesnumber":288},
 {"country":"Spain","year":"2012","maleathletesnumber":167,"femaleathletesnumber":131},
 {"country":"Spain","year":"2008","maleathletesnumber":162,"femaleathletesnumber":120}];

function StrArrayAtheletesnumber(str1,str2,elements){
	var cont = -1;
 for(var i=0;i<elements.length;i++)
      if(elements[i].country==str1 && elements[i].year==str2){
				cont=i;
			}
	return cont;
};

function StrArrayAtheletesnumber2(str1,elements){
 	var arr=[];
	for(var i=0;i<elements.length;i++)
	      if(elements[i].country==str1){
					arr.push(elements[i]);
				}
		return arr;
};

function StrArrayAtheletesnumber3(str1,elements){
 	var arr=[];
	for(var i=0;i<elements.length;i++)
	      if(elements[i].year==str1){
					arr.push(elements[i]);
				}
		return arr;
};

module.exports.getLoadIntialDataAtheletesnumbers=(req,res)=>{  //load json  atheletesnumber
    atheletesnumber= [];
    var apikey=req.query.apikey;
	if(apikey!="abc"){
		console.log("failed");
		res.sendStatus(401);
	}else{
		console.log("success");
		key=true;
	}

	if(key){
		var content=fs.readFileSync('dataatheletesnumber.json','utf8');
    	atheletesnumber = JSON.parse(content);
    	console.log("The Atheletesnumbers data has been loaded.")
    	res.sendStatus(200);
		
	}else{
		console.log("you must identificate");
		res,sendStatus(401);
	}
};
    

module.exports.getAtheletesnumbers=(req,res)=>{ 
     if(key){
		console.log("New GET for directory listing");
    	res.status(200).jsonp(atheletesnumber);
	}else{
		console.log("you must identificate");
		res.sendStatus(401);
	}
  };

module.exports.getAtheletesnumber=(req,res)=>{ //
	 
	 if(key){
		var country = req.params.country;
	 	var year = req.params.year;
	 	console.log("New GET of resource "+country+" "+year);
	 	var atheletesnumber2 = StrArrayAtheletesnumber(country,year,atheletesnumber);
		if(atheletesnumber2 != -1){
	  		res.send(atheletesnumber[atheletesnumber2]);
			res.sendStatus(200);
		 }else{
			res.sendStatus(404);
		 }

	 }else{
		console.log("you must identificate");
 		res.sendStatus(401);
	 }
};

module.exports.getAtheletesnumberCountryOrYear=(req,res)=>{
	 var countryOrYear = req.params.countryOrYear;
	 var limit=req.query.limit;
	 var offset=req.query.offset;

	if(key){
		if(isNaN(countryOrYear)){//if not a number
		 		 console.log("New GET of resource "+countryOrYear);
		 		 console.log("Limit "+limit);
		 		 console.log("Offset "+offset);
				 var arrayatheletesnumber = StrArrayAtheletesnumber2(countryOrYear,atheletesnumber);

			   if(arrayatheletesnumber.length>0){
				  	res.send(arrayatheletesnumber);
					res.sendStatus(200);
				 }
				 else{
					res.sendStatus(404);
				 }
			 }else{//if a year
			 	 console.log("New GET of resource "+countryOrYear);
			 	 console.log("Limit "+limit);
				 console.log("Offset "+offset);
				 var arrayatheletesnumber = StrArrayAtheletesnumber3(countryOrYear,atheletesnumber);

			   if(arrayatheletesnumber.length>0){
				  	res.send(arrayatheletesnumber);
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


module.exports.postAtheletesnumbers=(req,res)=>{
	if(key){
		var athnumber = req.body;
		atheletesnumber.push(athnumber);
		console.log("New POST of resource "+athnumber.country+" "+athnumber.year);
		res.sendStatus(201);
	}else{
		console.log("you must identificate");
 		res.sendStatus(401);
	}
        
};

module.exports.postAtheletesnumber=(req,res)=>{
        res.sendStatus(400);
    }

module.exports.putAtheletesnumber=(req, res)=>{ 
	if(key){
			var temp = req.body;
					var country = req.params.country;
					var year = req.params.year;
					var athnumber2 = StrArrayAtheletesnumber(country,year,atheletesnumber);
					if (athnumber2 != -1){
							atheletesnumber[athnumber2].country=temp.country;
							atheletesnumber[athnumber2].year=temp.year;
							atheletesnumber[athnumber2].maleathletesnumber=temp.maleathletesnumber;
							atheletesnumber[athnumber2].femaleathletesnumber=temp.femaleathletesnumber;
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

module.exports.putAtheletesnumbers=(req,res)=>{
        res.sendStatus(400);
    }

module.exports.deleteAtheletesnumber=(req,res)=>{
	if(key){
		var country = req.params.country;
			var year = req.params.year;
			console.log("New DELETE of resource "+country+" "+year);
			var athnumber2 = StrArrayAtheletesnumber(country,year,atheletesnumber);
			if (athnumber2 != -1){
				 atheletesnumber.splice(athnumber2,1);
				 res.sendStatus(200);
			}else{
				res.sendStatus(404);
			 }
	}else{
		console.log("you must identificate");
 		res.sendStatus(401);
	}
	
 };

module.exports.deleteAtheletesnumbers=(req,res)=>{
	if(key){
		console.log("New DELETE of all resources");
	 	atheletesnumber.splice(0,atheletesnumber.length);
	 	res.sendStatus(200);
	}else{
		console.log("you must identificate");
 		res.sendStatus(401);
	}
	 
 };

module.exports.deleteAtheletesnumberCountryOrYear=(req,res)=>{
	var countryOrYear = req.params.countryOrYear;
	if(key){
			if(isNaN(countryOrYear)){//if not a number
	 		 console.log("New DELETE of resource "+countryOrYear);
			 var arrayatheletesnumber = StrArrayAtheletesnumber2(countryOrYear,atheletesnumber);

		  	 if(arrayatheletesnumber.length>0){
			  	for(var i=0;i<atheletesnumber.length;i++){
			  		if(atheletesnumber[i].country==countryOrYear){
						atheletesnumber.splice(i,1);
					}
			  	}
		      		

			 }else{
				res.sendStatus(404);
			 }
		 }else{//if a year
		 	console.log("New DELETE of resource "+countryOrYear);
			 var arrayatheletesnumber = StrArrayAtheletesnumber3(countryOrYear,atheletesnumber);

		   if(arrayatheletesnumber.length>0){
			  	for(var i=0;i<atheletesnumber.length;i++){
			  		if(atheletesnumber[i].year==countryOrYear){
						atheletesnumber.splice(i,1);
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
