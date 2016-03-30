var fs=require("fs");
var key=false;
var medals=[
	{"country": "China", "year": "2008","goldmedalsnumber": "51","silvermedalsnumber":"21"},
	{"country": "Russia", "year": "2008","goldmedalsnumber": "23","silvermedalsnumber":"21"},
	{"country": "USA","year": "2004","goldmedalsnumber": "35","silvermedalsnumber":"39"},
	{"country": "Russia","year": "2004","goldmedalsnumber": "27","silvermedalsnumber":"27"},
	{"country": "USA","year": "2000","goldmedalsnumber": "39","silvermedalsnumber":"25"}];

function StrArrayGoldMedals(str1,str2,elements){
	var cont = -1;
	for(var i=0;i<elements.length;i++)
	if(elements[i].country==str1 && elements[i].year==str2){
		cont=i;
	}
	return cont;
};

function SubArray(country,year,elements){
    var temp=[];
    if(country==null && year==null)
        temp=elements;
    else if(country!=null && year==null)
    {
        for(var i=0;i<elements.length;i++)
            if(elements[i].country==country)
                temp.push(elements[i]);
	}
    else if(country==null & year!=null)
    {
        for(var i=0;i<elements.length;i++)
            if(elements[i].year==year)
                temp.push(elements[i]);
    }
    else
    {
        for(var i=0;i<elements.length;i++)
            if(elements[i].country==country && elements[i].year==year)
                temp.push(elements[i]);
    }
    return temp; 
};

function StrArrayGoldMedals3(str1,elements){
 	var arr=[];
	for(var i=0;i<elements.length;i++)
		if(elements[i].year==str1){
			arr.push(elements[i]);
		}
		return arr;
};

module.exports.getLoadIntialDataMedals=function (req,res){  //Load Gold Medals json data
    medals= [];
    var apikey=req.query.apikey;
    if(apikey=="sos"){
        console.log("Login success");
        key=true;     
    }else{ 
        console.log("Login fail");
        res.sendStatus(401);
	}

	if(key){
			var content=fs.readFileSync('datamedals.json','utf8');
			medals = JSON.parse(content);
			console.log("The Gold Medals data have been successfully loaded.")
			res.sendStatus(200);
		}else{
		console.log("You must identificate");
		res,sendStatus(401);
	}
  }

module.exports.getMedals=function (req,res){ 
    var country=req.query.country;
    var year=req.query.year;
     if(key){
     	if(country==null && year==null){
            console.log("New GET for directory listing");
    		res.status(200).jsonp(medals);
     	}
        else if(country!=null && year==null)
        {
            var medalsTemp = StrArrayGoldMedals2(country,medals);
     		res.send(medalsTemp);
			res.sendStatus(200);
        }
         
        else{
     		
     	}
		
	}else{
		console.log("you must identificate");
		res.sendStatus(401);
	}
  }

module.exports.getGoldMedal=function (req,res){ //
	if(key){
	 var country = req.params.country;
	 var year = req.params.year;
	 console.log("New GET of resource "+country+" "+year);
	 var medalsnumber2 = StrArrayGoldMedals(country,year,medals);

   if(medalsnumber2 != -1){
	  	res.send(medals[medalsnumber2]);
			res.sendStatus(200);
	 }
	 else{
		res.sendStatus(404);
	 }
	}else{
		console.log("you must identificate");
 		res.sendStatus(401);
	 }
};

module.exports.getGoldMedalsCountryOrYear=function (req,res){
	 var countryOrYear = req.params.countryOrYear;
	if(key){
	 if(isNaN(countryOrYear)){//if not a number
 		 console.log("New GET of resource "+countryOrYear);
		 var medalsTemp = StrArrayGoldMedals2(countryOrYear,medals);

	   if(medalsTemp.length>0){
		  	res.send(medalsTemp);
			res.sendStatus(200);
		 }
		 else{
			res.sendStatus(404);
		 }
	 }else{//if a year
	 	 console.log("New GET of resource "+countryOrYear);
		 var medalsTemp = StrArrayGoldMedals3(countryOrYear,medals);

	   if(medalsTemp.length>0){
		  	res.send(medalsTemp);
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


module.exports.postGoldMedals=function (req,res){
	if(key){        
		var mednumber = req.body;
	        medals.push(mednumber);
	        console.log("New POST of resource "+mednumber.country+" "+mednumber.year);
	        res.sendStatus(201);
	}else{
		console.log("you must identificate");
 		res.sendStatus(401);
	}
    }

module.exports.postGoldMedal=function (req,res){
        res.sendStatus(400);
    }

module.exports.putGoldMedal=function (req,res){ 
	if(key){
		var temp = req.body;
		var country = req.params.country;
		var year = req.params.year;
		var mednumber2 = StrArrayGoldMedals(country,year,medals);
		if (mednumber2 != -1){
				medals[mednumber2].country=temp.country;
				medals[mednumber2].year=temp.year;
				medals[mednumber2].goldmedalsnumber=temp.goldmedalsnumber;
				medals[mednumber2].silvermedalsnumber=temp.silvermedalsnumber;
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

module.exports.putGoldMedals=function (req,res){
        res.sendStatus(400);
    }

module.exports.deleteGoldMedal=function (req,res){
	if(key){	
		var country = req.params.country;
		var year = req.params.year;
		console.log("New DELETE of resource "+country+" "+year);
		var mednumber2 = StrArrayGoldMedals(country,year,medals);
		if (mednumber2 != -1){
			 medals.splice(mednumber2,1);
			 res.sendStatus(200);
		 }
		else{
			res.sendStatus(404);
		 }
	}else{
		console.log("you must identificate");
 		res.sendStatus(401);
	}
 };

module.exports.deleteGoldMedals=function (req,res){
	if(key){
		console.log("New DELETE of all resources");
		medals.splice(0,medals.length);
		res.sendStatus(200);
	}else{
		console.log("you must identificate");
 		res.sendStatus(401);
	}
 };

module.exports.deleteGoldMedalsCountryOrYear=function (req,res){
	var countryOrYear = req.params.countryOrYear;
	if(key){
	 	if(isNaN(countryOrYear)){//if not a number
	 		 console.log("New DELETE of resource "+countryOrYear);
			 var medalsTemp = StrArrayGoldMedals2(countryOrYear,medals);
	
		   if(medalsTemp.length>0){
			  	for(var i=0;i<medals.length;i++){
			  		if(medals[i].country==countryOrYear){
						medals.splice(i,1);
						res.sendStatus(200);
					}
			  	}    		
			 }else{
				res.sendStatus(404);
			 }
		 }else{//if a year
		 	console.log("New DELETE of resource "+countryOrYear);
			 var medalsTemp = StrArrayGoldMedals3(countryOrYear,medals);
	
		   if(medalsTemp.length>0){
			  	for(var i=0;i<medals.length;i++){
			  		if(medals[i].year==countryOrYear){
						medals.splice(i,1);
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
