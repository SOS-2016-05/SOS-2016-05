
var fs=require("fs");
var locations=[];

function FilterLocations(str1,str2){	//filter for Locations
	return function(location){
		return ((str1!=undefined &&  str2 ==undefined &&
		(location.country===str1 || location.year===str1)) ||
	(str1==undefined && str2!=undefined && location.year===str2 ||
	(str1!=undefined && str2!=undefined && location.country===str1 && location.year===str2) ||
  (str1==undefined && str2==undefined)));
	}
}

function ArrayDifference(arr1,arr2){	//Filter for Deletes
    var res = [];
    arr1.forEach(
        function (obj){
            if(arr2.indexOf(obj)==-1)
                res.push(obj);
        }
    );
    return res;
}

function FilterLimit(limit,offset,arr){	//filter for pagination
	var res=[];
	var cont=0;

	if (offset==undefined || offset==null){
		offset=0;
	}if(limit==undefined){
		limit=arr.length;
	}

	if(offset>arr.length){
		console.log("Error, offset greater than the array size.");
	}else{

		for(var i=offset;i<arr.length;i++){
			if(limit>cont){
				res.push(arr[i]);
				cont++;
			}
		}
	}
	return res;
}

function SearchInArray(value1,value2){			//SEARCH
    return function(location){
        return ((value1!=undefined && value2==undefined && location.top===value1) ||
				(value1==undefined && value2!=undefined && location.doping===value2) ||
				(value1!=undefined && value2!=undefined && location.top===value1 && location.doping===value2) ||
				(value1==undefined && value2==undefined));
    }
}

function SearchDatesInArray(from,to){		//SEARCH DATE
    return function(location){
        return ((from!=undefined && to==undefined && location.year>=from) ||
				(from==undefined && to!=undefined && location.year<=to) ||
				(from!=undefined && to!=undefined && location.year>=from && location.year<=to ||
					 (from==undefined && to==undefined)));
    }
}

function ApiKey(password){		//APIKEY URL
	var pass=false;
	if(password=="abc"){
		pass=true;
	}
	return pass;
}

function CheckBody(body){		//check 400
    return body.country && body.year && body.top && body.doping;
}

module.exports.getLoadIntialDataLocations=function (req,res){	//load json locations
	locations= [];
	var apikey=ApiKey(req.query.apikey);

	if(apikey){
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
	var apikey=ApiKey(req.query.apikey);
	if(apikey){
		var country=req.params.country;
		var year=req.params.year;
		var from=req.query.from;
 	  var to=req.query.to;
 	  var doping=req.query.doping;
 	  var top=req.query.top;
	  var limit=req.query.limit;
		var offset=req.query.offset;
		var temp=locations;

		temp=FilterLimit(limit,offset,temp).filter(FilterLocations(country,year)).
	 	filter(SearchInArray(top,doping)).
	 	filter(SearchDatesInArray(from,to));

		if(temp.length!=0)
        res.send(temp);
    else
        res.sendStatus(404);

	}else{
		console.log("you must identificate");
		res.sendStatus(401);
	}
};

module.exports.postLocation=function (req,res){  //post ****
		var apikey=ApiKey(req.query.apikey);

		if(apikey){
			var loc = req.body;
			if(CheckBody(loc)){
				var temp= locations.filter(FilterLocations(loc.country,loc.year));
				if(!temp.length){
					locations.push(loc);
					console.log("New POST of resource "+loc.name);
					res.sendStatus(201);
				}else{
					res.sendStatus(409);
				}
			}else{
				res.sendStatus(400);
			}
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
	var apikey=ApiKey(req.query.apikey);
	if(apikey){
		var body = req.body;
		var country = req.params.country;
		var year = req.params.year;

    var temp = locations.filter(FilterLocations(country,year));

		console.log(temp.length);

		if(temp.length!=0){
			if(CheckBody(body) && body.country==req.params.country && body.year==req.params.year){
      temp.forEach(
				function (location){
          location.country=body.country;
          location.year=body.year;
          location.top=body.top;
          location.doping=body.doping;
      });
    	res.sendStatus(201);
    	}else{
			res.sendStatus(400);
    	}
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

module.exports.deleteLocation=function (req,res){  //delete name
	var apikey=ApiKey(req.query.apikey);

	if(apikey){
			var value1=req.params.value1;
			var value2=req.params.value2;
			console.log("New DELETE "+ value1+ " "+value2);
			var temp = locations.filter(FilterLocations(value1,value2));
			var diff = ArrayDifference(locations,temp);
			if(temp.length!=0)
			{
					locations=diff;
					res.sendStatus(201);
			}
			else
					res.sendStatus(404);
	}
	else{
		console.log("you must identificate");
		res.sendStatus(401);
	}
 };

module.exports.deleteLocations=function (req,res){  //delete list
		var apikey=ApiKey(req.query.apikey);
		if(apikey){
		 console.log("New DELETE of all resources");
	 	 locations.splice(0,locations.length);
	 	 res.sendStatus(201);
		}
		else{
			console.log("you must identificate");
			res.sendStatus(401);
		}
 };
