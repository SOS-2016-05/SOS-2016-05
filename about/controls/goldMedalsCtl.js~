var fs=require("fs");

var medalsnumber=[
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

function StrArrayGoldMedals2(str1,elements){
 	var arr=[];
	for(var i=0;i<elements.length;i++)
	      if(elements[i].country==str1){
					arr.push(elements[i]);
				}
		return arr;
};

function StrArrayGoldMedals3(str1,elements){
 	var arr=[];
	for(var i=0;i<elements.length;i++)
	      if(elements[i].year==str1){
					arr.push(elements[i]);
				}
		return arr;
};

module.exports.getLoadIntialDataGoldMedals=(req,res)=>{  //Load Gold Medals json data
    medalsnumber= [];
    var content=fs.readFileSync('datagoldmedals.json','utf8');
    medalsnumber = JSON.parse(content);
    console.log("The Gold Medals data have been successfully loaded.")
    res.sendStatus(200);
  }

module.exports.getGoldMedals=(req,res)=>{ 
    console.log("New GET for directory listing");
    res.status(200).jsonp(medalsnumber);
  }

module.exports.getGoldMedal=(req,res)=>{ //
	 var country = req.params.country;
	 var year = req.params.year;
	 console.log("New GET of resource "+country+" "+year);
	 var medalsnumber2 = StrArrayGoldMedals(country,year,medalsnumber);

   if(medalsnumber2 != -1){
	  	res.send(medalsnumber[medalsnumber2]);
			res.sendStatus(200);
	 }
	 else{
		res.sendStatus(404);
	 }
};

module.exports.getGoldMedalsCountryOrYear=(req,res)=>{
	 var countryOrYear = req.params.countryOrYear;

	 if(isNaN(countryOrYear)){//if not a number
 		 console.log("New GET of resource "+countryOrYear);
		 var arraymedalsnumber = StrArrayGoldMedals2(countryOrYear,medalsnumber);

	   if(arraymedalsnumber.length>0){
		  	res.send(arraymedalsnumber);
			res.sendStatus(200);
		 }
		 else{
			res.sendStatus(404);
		 }
	 }else{//if a year
	 	 console.log("New GET of resource "+countryOrYear);
		 var arraymedalsnumber = StrArrayGoldMedals3(countryOrYear,medalsnumber);

	   if(arraymedalsnumber.length>0){
		  	res.send(arraymedalsnumber);
			res.sendStatus(200);
		 }
		 else{
			res.sendStatus(404);
		 }
	 }
	
};


module.exports.postGoldMedals=(req,res)=>{
        var mednumber = req.body;
        medalsnumber.push(mednumber);
        console.log("New POST of resource "+mednumber.country+" "+mednumber.year);
        res.sendStatus(201);
    }

module.exports.postGoldMedal=(req,res)=>{
        res.sendStatus(400);
    }

module.exports.putGoldMedal=(req, res)=>{ 
		var temp = req.body;
		var country = req.params.country;
		var year = req.params.year;
		var mednumber2 = StrArrayGoldMedals(country,year,medalsnumber);
		if (mednumber2 != -1){
				medalsnumber[mednumber2].country=temp.country;
				medalsnumber[mednumber2].year=temp.year;
				medalsnumber[mednumber2].goldmedalsnumber=temp.goldmedalsnumber;
				medalsnumber[mednumber2].silvermedalsnumber=temp.silvermedalsnumber;
				res.sendStatus(203);
	}
	else{
			res.sendStatus(404);
	}
};

module.exports.putGoldMedals=(req,res)=>{
        res.sendStatus(400);
    }

module.exports.deleteGoldMedal=(req,res)=>{
	var country = req.params.country;
	var year = req.params.year;
	console.log("New DELETE of resource "+country+" "+year);
	var mednumber2 = StrArrayGoldMedals(country,year,medalsnumber);
	if (mednumber2 != -1){
		 medalsnumber.splice(mednumber2,1);
		 res.sendStatus(200);
	 }
	else{
		res.sendStatus(404);
	 }
 };

module.exports.deleteGoldMedals=(req,res)=>{
	 console.log("New DELETE of all resources");
	 medalsnumber.splice(0,medalsnumber.length);
	 res.sendStatus(200);
 };

module.exports.deleteGoldMedalsCountryOrYear=(req,res)=>{
	var countryOrYear = req.params.countryOrYear;

	 if(isNaN(countryOrYear)){//if not a number
 		 console.log("New DELETE of resource "+countryOrYear);
		 var arraymedalsnumber = StrArrayGoldMedals2(countryOrYear,medalsnumber);

	   if(arraymedalsnumber.length>0){
		  	for(var i=0;i<medalsnumber.length;i++){
		  		if(medalsnumber[i].country==countryOrYear){
					medalsnumber.splice(i,1);
				}
		  	}
	      		

		 }else{
			res.sendStatus(404);
		 }
	 }else{//if a year
	 	console.log("New DELETE of resource "+countryOrYear);
		 var arraymedalsnumber = StrArrayGoldMedals3(countryOrYear,medalsnumber);

	   if(arraymedalsnumber.length>0){
		  	for(var i=0;i<medalsnumber.length;i++){
		  		if(medalsnumber[i].year==countryOrYear){
					medalsnumber.splice(i,1);
				}
		  	}

		 }else{
			res.sendStatus(404);
		 }
	 }
 };
