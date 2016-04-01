
var fs=require("fs");
var locations=[];
var key=false;
/*
function StrArrayLocation(str,elements){
	var cont = -1;
 for(var i=0;i<elements.length;i++){
      if(elements[i].country==str || elements[i].year==str || elements[i].top==str
			|| elements[i].doping==str){
				cont=i;
			}
	}
	return cont;
};
/*
function StrArrayLocation2(str1,elements){
 	var arr=[];
	for(var i=0;i<elements.length;i++)
	      if(elements[i].country==str1){
					arr.push(elements[i]);
				}
				else if(elements[i].year==str1){
					arr.push(elements[i]);
				}
		return arr;
};*/

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

module.exports.putLocation=function (req,res){ //put ***FALLA
		var temp = req.body;
		var country = req.params.country;
		var year=req.params.year;

		if(key){
			/*var location = StrArrayLocation(id,locations);
			if (location != -1){
					locations[location].country=temp.country;
					locations[location].year=temp.year;
					locations[location].top=temp.top;
					locations[location].doping=temp.doping;
					response.sendStatus(201);
		}else{
				response.sendStatus(404);
		  }*/

			res.send(locations.filter(FilterLocations(country,year)));
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
	 var name=req.params.name;

	 if(key){
		 console.log("New DELETE of resource "+name);
		 res.send(locations.filter(FilterLocations(name)));
		/* var location = StrArrayLocation(name,locations);
	 	 if (location != -1){
		 locations.splice(location,1);
		 res.sendStatus(200);
	 	}else{
		 res.sendStatus(404);
	 }*/

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
