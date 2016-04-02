 var fs=require("fs");
 var animes=[{name:"hellsing"},{name:"evangelion"},{name:"FMAB"}];

 module.exports.getAnimes=function (req,res){   //get list
      console.log("New GET for directory listing");
  	res.status(200).jsonp(animes);
  };

  module.exports.getAnime=function (req,res){ //get name
    var name = req.params.name;
    console.log("New GET of resource "+name);
  	var anime = StrArray(req.params.name,animes);
  	if(anime != -1){
      res.send(animes[anime]);
			res.sendStatus(200);
    }
  	else{
      res.sendStatus(404);
    }
  };

	module.exports.AnimeLoad=function (req,res){	//load json animeseries
		animes= [];
		var content=fs.readFileSync('./animeseries.json','utf8');
		animes = JSON.parse(content);
		res.sendStatus(203);
	};

  module.exports.postAnimes=function (req,res){  //post ****
      var ani = req.body;
      animes.push(ani);
      console.log("New POST of resource "+ani.name);
      res.sendStatus(203);
  };

  module.exports.postAnime=function (req,res){    //post FORBIDDEN
      res.send("Error: Forbidden action");
			res.sendStatus(401);
  };

  module.exports.putAnime=function (request,response){ //put
      var temp = request.body;
      var id = request.params.name;
			var anime = StrArray(id,animes);
      if (anime != -1){
          animes[anime].name=temp.name;
          response.send(203);
  	}
  	else{
        response.send(404);
    }
  };

  module.exports.putAnimeF=function (req,res){ //put FORBBIDEN
      res.send("Error: Forbidden action");
			res.sendStatus(401);
  };

  module.exports.deleteAnime=function (req,res){  //delete name
     var name=req.params.name;
    console.log("New DELETE of resource "+name);
   var anime = StrArray(name,animes);
   if (anime != -1){
     animes.splice(anime,1);
		 res.sendStatus(200);
   }
   else{
    res.sendStatus(404);
   }
  };

 module.exports.deleteAnimes=function (req,res){  //delete list
 		 console.log("New DELETE of all resources");
     animes.splice(0,animes.length);
		 res.sendStatus(200);
   };
