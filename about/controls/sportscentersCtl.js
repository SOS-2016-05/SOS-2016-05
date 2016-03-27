var fs=require("fs");
var sportscenters=[{name: "Ramon_Sanchez_Pizjuan"},
 {name:"Benito_Villamarin"},
 {name:"Pabellon_de_deportes_San_pablo"},
 {name:"Estadio_de_la_Cartuja"}];

function StrArray(str,elements){
	var cont = -1;
 for(var i=0;i<elements.length;i++)
      if(elements[i].name==str)
        cont=i;
	return cont;
};

 


module.exports.getLoadIntialDataSportsCenters=(req,res)=>{  //load json sports centers
    sportscenters= [];
    var content=fs.readFileSync('sportscenters.json','utf8');
    sportscenters = JSON.parse(content);
    res.sendStatus(200);
  }

module.exports.getSportsCenters=(req,res)=>{ 
      console.log("New GET for directory listing");
    res.status(200).jsonp(sportscenters);
  }
module.exports.getSportsCenter=(req,res)=>{ //get the name of a sport center
     var name = req.params.name;
      console.log("New GET of resource "+name);
    var sportcenter = StrArray(req.params.name,sportscenters);
    if(sportscenters != -1){
      res.send(sportscenters[sportcenter]);
      res.sendStatus(200);
    }
    else{
      res.sendStatus(404);
    }
  }

module.exports.postSportsCenter=(req,res)=>{  //post ****
        var spcenter = req.body;
        sportscenters.push(spcenter);
        console.log("New POST of resource "+spcenter.name);
        res.sendStatus(200);
    }

module.exports.postSportsCenters=(req,res)=>{    //post FORBIDDEN
        res.send("Error: Forbidden action, the POST method must be do over a directory");
        res.sendStatus(400);
    }
module.exports.putSportsCenter=(req, res)=>{ //put
        var temp2 = req.body;
        var id2 = req.params.name;
        var sportcenter = StrArray(id2,sportscenters);
        if (sportcenter != -1){
            sportscenters[sportcenter].name=temp2.name;
            res.send(200);
      }
      else{
          res.send(404);
      }
    }
module.exports.putSportsCenters=(req,res)=>{ //put FORBBIDEN
        res.send("Error: Forbidden action, the PUT method must not be do over a directory");
        res.sendStatus(400);
    }
module.exports.deleteSportsCenter=(req,res)=>{  //delete name
       var name=req.params.name;
       console.log("New DELETE of resource "+name);
       var sportcenter = StrArray(name,sportscenters);
       if (sportcenter != -1){
         sportscenters.splice(sportcenter,1);
         res.sendStatus(200);
       }
       else{
        res.sendStatus(404);
       }
     }
module.exports.deleteSportsCenters=(req,res)=>{  //delete list
       console.log("New DELETE of all resources");
       sportscenters.splice(0,sportscenters.length);
       res.sendStatus(200);
     }