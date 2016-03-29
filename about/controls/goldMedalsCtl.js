
var fs=require("fs");

var medals=[
  {"country": "China", "year": "2008","goldmedalsnumber": "51","silvermedalsnumber":"21"},
  {"country": "Russia", "year": "2008","goldmedalsnumber": "23","silvermedalsnumber":"21"},
  {"country": "USA","year": "2004","goldmedalsnumber": "35","silvermedalsnumber":"39"},
  {"country": "Russia","year": "2004","goldmedalsnumber": "27","silvermedalsnumber":"27"},
  {"country": "USA","year": "2000","goldmedalsnumber": "39","silvermedalsnumber":"25"}];
var key=false;

function StrArrayMedal(str,elements){
	var cont = -1;
 for(var i=0;i<elements.length;i++)
      if(elements[i].country==str || elements[i].year==str || elements[i].top==str
			|| elements[i].doping==str){
				cont=i;
			}
	return cont;
};

module.exports.getLoadIntialDatamedals=(req,res)=>{	//load json medals
	medals= [];

	var apikey=req.query.apikey;
	if(apikey!="abc"){
		console.log("failed");
		res.sendStatus(401);
	}else{
		console.log("success");
		key=true;
	}

	if(key){
		var content=fs.readFileSync('./datagoldmedals.json','utf8');
		medals = JSON.parse(content);
		console.log("The medal data has been loaded.")
		res.sendStatus(201);
	}else{
		console.log("you must identificate");
		res,sendStatus(401);
	}
};

module.exports.getMedals=(req,res)=>{	//load json medals

	if(key){
		console.log("New GET for directory listing");
		res.status(200).jsonp(medals);
	}else{
		console.log("you must identificate");
		res.sendStatus(401);
	}
};

module.exports.getMedal=(req,res)=>{ //get name
	 var name = req.params.name;

	 var limit=req.query.limit;
	 var offset=req.query.offset;
	 var area=req.query.area;		//search

	 if(key){
		 console.log("New GET of resource "+name);
		 console.log("Limit "+limit);
		 console.log("Offset "+offset);

		 var medal = StrArrayMedal(req.params.name,medals);

	   if(medal != -1){
		  	res.send(medals[medal]);
				res.sendStatus(200);
		 }else{
			res.sendStatus(404);
		 }
	 }else{
		console.log("you must identificate");
 		res.sendStatus(401);
	 }
};

module.exports.postMedal=(req,res)=>{  //post ****
		var loc = req.body;

		if(key){
			medals.push(loc);
			console.log("New POST of resource "+loc.name);
			res.sendStatus(201);
		}else{
			console.log("you must identificate");
			res.sendStatus(401);
		}


};

module.exports.postMedalF=(req,res)=>{    //post FORBIDDEN
		console.log("Error: Forbidden action");
		res.sendStatus(401);
};

module.exports.putMedal=(request, response)=>{ //put ***
		var temp = request.body;
		var id = request.params.name;

		if(key){
			var medal = StrArrayMedal(id,medals);
			if (medal != -1){
					medals[medal].country=temp.country;
					medals[medal].year=temp.year;
					medals[medal].top=temp.top;
					medals[medal].doping=temp.doping;
					response.sendStatus(201);
		}else{
				response.sendStatus(404);
		  }
		}else{
			console.log("you must identificate");
			res.sendStatus(401);
		}
};

module.exports.putmedals=(req,res)=>{ //put FORBBIDEN
		console.log("Error: Forbidden action");
		res.sendStatus(401);
};

module.exports.deleteMedal=(req,res)=>{  //delete name
	 var name=req.params.name;

	 if(key){
		 console.log("New DELETE of resource "+name);
	 	 var medal = StrArrayMedal(name,medals);
	 	 if (medal != -1){
		 medals.splice(medal,1);
		 res.sendStatus(200);
	 	}else{
		 res.sendStatus(404);
	 	}

	 }else{
		console.log("you must identificate");
 		res.sendStatus(401);
	 }
 };

module.exports.deletemedals=(req,res)=>{  //delete list
		if(key){
		 console.log("New DELETE of all resources");
	 	 medals.splice(0,medals.length);
	 	 res.sendStatus(200);
		}
		else{
			console.log("you must identificate");
			res.sendStatus(401);
		}
 };
