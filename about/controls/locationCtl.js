
var fs=require("fs");

var locations=[];
var key=false;

function StrArrayLocation(str,elements){
	var cont = -1;
 for(var i=0;i<elements.length;i++)
      if(elements[i].country==str || elements[i].year==str || elements[i].top==str
			|| elements[i].doping==str){
				cont=i;
			}
	return cont;
};

module.exports.getLoadIntialDataLocations=(req,res)=>{	//load json locations
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
		res,sendStatus(401);
	}
};

module.exports.getLocations=(req,res)=>{	//load json locations

	if(key){
		console.log("New GET for directory listing");
		res.status(200).jsonp(locations);
	}else{
		console.log("you must identificate");
		res.sendStatus(401);
	}
};

module.exports.getLocation=(req,res)=>{ //get name
	 var name = req.params.name;

	 var limit=req.query.limit;
	 var offset=req.query.offset;
	 var area=req.query.area;		//search

	 if(key){
		 console.log("New GET of resource "+name);
		 console.log("Limit "+limit);
		 console.log("Offset "+offset);

		 var location = StrArrayLocation(req.params.name,locations);

	   if(location != -1){
		  	res.send(locations[location]);
				res.sendStatus(200);
		 }else{
			res.sendStatus(404);
		 }
	 }else{
		console.log("you must identificate");
 		res.sendStatus(401);
	 }
};

module.exports.postLocation=(req,res)=>{  //post ****
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

module.exports.postLocationF=(req,res)=>{    //post FORBIDDEN
		console.log("Error: Forbidden action");
		res.sendStatus(401);
};

module.exports.putLocation=(request, response)=>{ //put ***
		var temp = request.body;
		var id = request.params.name;

		if(key){
			var location = StrArrayLocation(id,locations);
			if (location != -1){
					locations[location].country=temp.country;
					locations[location].year=temp.year;
					locations[location].top=temp.top;
					locations[location].doping=temp.doping;
					response.sendStatus(201);
		}else{
				response.sendStatus(404);
		  }
		}else{
			console.log("you must identificate");
			res.sendStatus(401);
		}
};

module.exports.putLocations=(req,res)=>{ //put FORBBIDEN
		console.log("Error: Forbidden action");
		res.sendStatus(401);
};

module.exports.deleteLocation=(req,res)=>{  //delete name
	 var name=req.params.name;

	 if(key){
		 console.log("New DELETE of resource "+name);
	 	 var location = StrArrayLocation(name,locations);
	 	 if (location != -1){
		 locations.splice(location,1);
		 res.sendStatus(200);
	 	}else{
		 res.sendStatus(404);
	 	}

	 }else{
		console.log("you must identificate");
 		res.sendStatus(401);
	 }
 };

module.exports.deleteLocations=(req,res)=>{  //delete list
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
