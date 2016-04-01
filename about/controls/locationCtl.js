
var fs=require("fs");
var locations=[];
var key=false;

function FilterLocations(str1,str2){
	return function(location){
		return ((str1!=undefined &&  str2 ==undefined &&
		(location.country===str1 || location.year===str1)) ||
	(str1==undefined && str2!=undefined && location.year===str2 ||
	(str1!=undefined && str2!=undefined && location.country===str1 && location.year===str2) ||
  (str1==undefined && str2==undefined)));
	}
}

module.exports.getLoadIntialDataLocations=function (req,res){	//load json locations
	locations= [];
	var apikey=req.query.apikey;

	if(apikey!="abc"){
		console.log("failed");
		res.sendStatus(401);
	}else{
		console.log("success");
		key=true;
	}

	if(key){
		var content=fs.readFileSync('./datalocation.json','utf8');
		locations = JSON.parse(content);
		console.log("The location data has been loaded.")
		res.sendStatus(201);
	}else{
		console.log("you must identificate");
		res.sendStatus(401);
	}
};

module.exports.getLocations=function (req,res){	//load json locations

	if(key){
		var country=req.params.country;
		var year=req.params.year;
		res.send(locations.filter(FilterLocations(country,year)));
	}else{
		console.log("you must identificate");
		res.sendStatus(401);
	}
};

module.exports.getLocation=function (req,res){ //get name
	 var country = req.params.country;
	 var year=req.params.year;

	 if(key){
		 console.log("New GET of resource "+country+" "+ year);
		 res.send(locations.filter(FilterLocations(country,year)));
	 }else{
		console.log("you must identificate");
 		res.sendStatus(401);
	 }
};

module.exports.postLocation=function (req,res){  //post ****
		var loc = req.body;

		if(key){
			locations.push(loc);
			console.log("New POST of resource "+loc.name);
			res.sendStatus(201);

		}else{
			console.log("you must identificate");
			res.sendStatus(401);
		}
};

module.exports.postLocationF=function (req,res){    //post FORBIDDEN
		console.log("Error: Forbidden action");
		res.sendStatus(405);
};

module.exports.putLocation=function (req,res){ //put
	if(key){
		var body = req.body;
		var country = req.params.country;
		var year = req.params.year;

    var temp = locations.filter(FilterLocations(country,year));

		console.log(temp.length);

		if(temp.length!=0){
      temp.forEach(
				function (location){
          location.country=body.country;
          location.year=body.year;
          location.top=body.top;
          location.doping=body.doping;
      });
    	res.sendStatus(200);
    }else{
			res.sendStatus(404);
    }
	}else{
		console.log("you must identificate");
		res.sendStatus(401);
	}
};

module.exports.putLocations=function (req,res){ //put FORBBIDEN
		console.log("Error: Forbidden action");
		res.sendStatus(405);
};

module.exports.putLocationName=function(req,res){	//put name FORBIDDEN
	console.log("Error: Forbidden action");
	res.sendStatus(405);
}

module.exports.deleteLocation=function (req,res){  //delete name	**FALLA

	 if(key){
		 var country=req.params.country;
		 var year=req.params.year;
		 console.log("New DELETE");
		 var location = locations.filter(FilterLocations(country,year));
		 //var diff = ArrayDifference(locations,temp);
		 var contt=StrArrayCountryNumber(country,locations);

		/*
		 if(temp.length!=0)
		 {
				 locations=diff;
				 res.sendStatus(200);
		 }
		 else
				 res.sendStatus(404);*/
	 }else{
		console.log("you must identificate");
 		res.sendStatus(401);
	 }
 };

module.exports.deleteLocations=function (req,res){  //delete list
		if(key){
		 console.log("New DELETE of all resources");
	 	 locations.splice(0,locations.length);
	 	 res.sendStatus(200);
		}
		else{
			console.log("you must identificate");
			res.sendStatus(401);
		}
 };
