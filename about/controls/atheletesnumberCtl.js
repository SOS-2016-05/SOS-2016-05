var fs=require("fs");

var atheletesnumber=[];

function StrArrayAtheletesnumber(str1,str2,elements){
	var cont = -1;
 for(var i=0;i<elements.length;i++)
      if(elements[i].country==str1 && elements[i].year==str2){
				cont=i;
			}
	return cont;
};

module.exports.getLoadIntialDataAtheletesnumbers=(req,res)=>{  //load json  atheletesnumber
    atheletesnumber= [];
    var content=fs.readFileSync('dataatheletesnumber.json','utf8');
    atheletesnumber = JSON.parse(content);
    console.log("The Atheletesnumbers data has been loaded.")
    res.sendStatus(200);
  }

module.exports.getAtheletesnumbers=(req,res)=>{ 
    console.log("New GET for directory listing");
    res.status(200).jsonp(atheletesnumber);
  }

module.exports.getAtheletesnumber=(req,res)=>{ //
	 var country = req.params.country;
	 var year = req.params.year;
	 var limit=req.query.limit;
	 var offset=req.query.offset;
	 var area=req.query.area;

	 console.log("New GET of resource "+country+" "+year);
	 console.log("Limit "+limit);
	 console.log("Offset "+offset);

	 var atheletesnumber2 = StrArrayAtheletesnumber(country,year,atheletesnumber);

   if(atheletesnumber2 != -1){
	  	res.send(atheletesnumber[atheletesnumber2]);
			res.sendStatus(200);
	 }
	 else{
		res.sendStatus(404);
	 }
};

module.exports.postAtheletesnumbers=(req,res)=>{
        var athnumber = req.body;
        atheletesnumber.push(athnumber);
        console.log("New POST of resource "+athnumber.country+" "+athnumber.year);
        res.sendStatus(200);
    }

module.exports.postAtheletesnumber=(req,res)=>{
        res.send("Error: Forbidden action, the POST method must be do over a directory");
        res.sendStatus(400);
    }

module.exports.putAtheletesnumber=(req, res)=>{ 
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
};

module.exports.putAtheletesnumbers=(req,res)=>{
        res.send("Error: Forbidden action, the PUT method must not be do over a directory");
        res.sendStatus(400);
    }

module.exports.deleteAtheletesnumber=(req,res)=>{
	var country = req.params.country;
	var year = req.params.year;
	console.log("New DELETE of resource "+country+" "+year);
	var athnumber2 = StrArrayAtheletesnumber(country,year,atheletesnumber);
	if (athnumber2 != -1){
		 atheletesnumber.splice(athnumber2,1);
		 res.sendStatus(200);
	 }
	else{
		res.sendStatus(404);
	 }
 };

module.exports.deleteAtheletesnumbers=(req,res)=>{
	 console.log("New DELETE of all resources");
	 atheletesnumber.splice(0,atheletesnumber.length);
	 res.sendStatus(200);
 };