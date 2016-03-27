var express=require("express");
var app=express();
var bodyParser=require("body-parser");

var locationCtl=require("./about/controls/locationCtl.js");
var sportscentersCtl=require("./about/controls/sportscentersCtl.js");
var atheletesnumberCtl=require("./about/controls/atheletesnumberCtl.js");

var port=(process.env.PORT || 10000); //local test port

app.use("/about",express.static(__dirname + "/about")); //route
app.use(bodyParser.json()); //se pone en medio de las peticiones

var fs=require("fs");   //for all files.

var dat=[];   //data location
var athletesnumber=[];  //data athletesnumber
//var datt[];       //data gold-medals

//Declares a function where for a given string returns its position from the given array
function StrArray(str,elements){
	var cont = -1;
 for(var i=0;i<elements.length;i++)
      if(elements[i].name==str)
        cont=i;
	return cont;
};

app.get("/time",(req,res)=>{
  var now=Date();
    res.send("The time now is: "+now);
  });


//Music bands-------------------------------------------------------------

var mBands = [{name: "LinkinPark"}, {name: "SimplePlan"}, {name: "Sum41"}];

//Load initial data into the array
app.get('/api-test/musicbands/loadInitialData',function (req,res){
	mBands= [];
	var content=fs.readFileSync('musicbands.json','utf8');
	mBands = JSON.parse(content);
	res.sendStatus(200);
});

//To send back to the client a list of the music bands contained in the API
app.get("/api/sandbox/musicbands",function (req,res){
    console.log("New GET for directory listing");
	res.status(200).jsonp(mBands);

});

//To convert my local data to what the client is requesting for
app.get("/api/sandbox/musicbands/:name",function (req,res){
   var name = req.params.name; //Where the "name" is the one that we've put in /contacts/:xxxx
    console.log("New GET of resource "+name);
	var bandPos = StrArray(req.params.name,mBands);
	if(bandPos != -1)
	{
		res.send(mBands[bandPos]);
		res.sendStatus(200);
}
	else
		res.sendStatus(404);
});

//To storage what the client is sending us
app.post("/api/sandbox/musicbands", function (req,res){
    var mband = req.body;
    mBands.push(mband);
    console.log("New POST of resource "+mband.name);
    res.sendStatus(200);

});

//Sends an error when attempting to post over a resource
app.post("/api/sandbox/musicbands/:name", function (req,res){
	res.send("Error: Forbidden action - POST method should be made over a directory");
});


//Deletes an specified resource
 app.delete("/api/sandbox/musicbands/:name",function (req,res){
    var name=req.params.name;
    console.log("New DELETE of resource "+name);
	var bandPos = StrArray(name,mBands);
	if (bandPos != -1)
	{
    		mBands.splice(bandPos,1);
		res.sendStatus(200);
}
    	else
		res.sendStatus(404);
  });


//Deletes all the resources in the given directory
app.delete("/api/sandbox/musicbands",function (req,res){
	console.log("New DELETE of all resources");
	mBands.splice(0,mBands.length);
	res.sendStatus(200);
  });


//Updates an specified resource
app.put('/api/sandbox/musicbands/:name', function (req, res) {
	var temporal = req.body;
	var id = req.params.name;
	var bandPos = StrArray(id,mBands);
	if (bandPos != -1)
	{
	        mBands[bandPos].name=temporal.name;
	        res.send(200);
	}
	else
	        res.send(404);
});


//Avoids attempting PUT over the directory
app.put("/api/sandbox/musicbands", function (req,res){
    res.send("Error: Forbidden action - Is not possible to PUT over a directory");
});

//---------------------ANIMESERIES----------------------------------------

  var animes=[{name:"hellsing"},{name:"evangelion"},{name:"FMAB"}];

  app.get("/api/sandbox/animeseries",(req,res)=>{   //get list
      console.log("New GET for directory listing");
  	res.status(200).jsonp(animes);
  });

  app.get("/api/sandbox/animeseries/:name",(req,res)=>{ //get name
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
  });

	app.get('/api-test/animeseries/loadInitialData',(req,res)=>{	//load json animeseries
		animes= [];
		var content=fs.readFileSync('animeseries.json','utf8');
		animes = JSON.parse(content);
		res.sendStatus(203);
	});

  app.post("/api/sandbox/animeseries",(req,res)=>{  //post ****
      var ani = req.body;
      animes.push(ani);
      console.log("New POST of resource "+ani.name);
      res.sendStatus(203);
  });

  app.post("/api/sandbox/animeseries/:name",(req,res)=>{    //post FORBIDDEN
      res.send("Error: Forbidden action");
			res.sendStatus(401);
  });

  app.put('/api/sandbox/animeseries/:name',(request, response)=>{ //put
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
  });

  app.put("/api/sandbox/animeseries",(req,res)=>{ //put FORBBIDEN
      res.send("Error: Forbidden action");
			res.sendStatus(401);
  });

  app.delete("/api/sandbox/animeseries/:name",(req,res)=>{  //delete name
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
   });

 app.delete("/api/sandbox/animeseries",(req,res)=>{  //delete list
 		 console.log("New DELETE of all resources");
     animes.splice(0,animes.length);
		 res.sendStatus(200);
   });
//--------------------------------------------ANTONIO API------------------------

app.get("/api/v1/locations",locationCtl.getLocations);
app.get("/api/v1/locations/loadInitialData",locationCtl.getLoadIntialDataLocations);
app.get("/api/v1/locations/:name",locationCtl.getLocation);
app.post("/api/v1/locations",locationCtl.postLocation);
app.post("/api/v1/locations/:name",locationCtl.postLocationF);
app.put('/api/v1/locations/:name',locationCtl.putLocation);
app.put("/api/v1/locations",locationCtl.putLocations);
app.delete("/api/v1/locations/:name",locationCtl.deleteLocation);
app.delete("/api/v1/locations",locationCtl.deleteLocations);

//-------------------------------------------------------------------------------


//-----------------------SPORTSCENTERS-------------------------------------------
//----------------API-SPORTSCENTERS-MODULARIZED----------------------------------

app.get("/api/sandbox/sportscenters",sportscentersCtl.getSportsCenters);
app.get("/api/sandbox/sportscenters/:name",sportscentersCtl.getSportsCenter);
app.get('/api-test/sportscenters/loadInitialData',sportscentersCtl.getLoadIntialDataSportsCenters);
app.post("/api/sandbox/sportscenters",sportscentersCtl.postSportsCenter);
app.post("/api/sandbox/sportscenters/:name",sportscentersCtl.postSportsCenters);
app.put('/api/sandbox/sportscenters/:name',sportscentersCtl.putSportsCenter);
app.put("/api/sandbox/sportscenters",sportscentersCtl.putSportsCenters);
app.delete("/api/sandbox/sportscenters/:name",sportscentersCtl.deleteSportsCenter);
app.delete("/api/sandbox/sportscenters",sportscentersCtl.deleteSportsCenters);

//-----------------------ENRIQUE API ATHLETES NUMBERS-------------------------------------------
//----------------API-ATHLETES NUMBERS-MODULARIZED----------------------------------
app.get("/api/v1/atheletesnumber/loadInitialData",atheletesnumberCtl.getLoadIntialDataAtheletesnumbers);
app.get("/api/v1/atheletesnumber",atheletesnumberCtl.getAtheletesnumbers);
app.get("/api/v1/atheletesnumber/:country/:year",atheletesnumberCtl.getAtheletesnumber);
app.get("/api/v1/atheletesnumber/:countryOrYear",atheletesnumberCtl.getAtheletesnumberCountryOrYear);
app.post("/api/v1/atheletesnumber",atheletesnumberCtl.postAtheletesnumbers);
app.post("/api/v1/atheletesnumber/:country/:year",atheletesnumberCtl.postAtheletesnumber);
app.post("/api/v1/atheletesnumber/:countryOrYear",atheletesnumberCtl.postAtheletesnumber);
app.put('/api/v1/atheletesnumber/:country/:year',atheletesnumberCtl.putAtheletesnumber);
app.put("/api/v1/atheletesnumber/:countryOrYear",atheletesnumberCtl.putAtheletesnumbers);
app.put("/api/v1/atheletesnumber",atheletesnumberCtl.putAtheletesnumbers);
app.delete("/api/v1/atheletesnumber/:country/:year",atheletesnumberCtl.deleteAtheletesnumber);
app.delete("/api/v1/atheletesnumber/:countryOrYear",atheletesnumberCtl.deleteAtheletesnumberCountryOrYear);
app.delete("/api/v1/atheletesnumber",atheletesnumberCtl.deleteAtheletesnumbers);

/*
//location
app.get("/about/location",(req,res)=>{
  fs.readFile('data.json','utf8',(err,content)=>{
    console.log("Data read");
    dat=JSON.parse(content);
    res.write("<html><body>_____Information_____<ul>");
    dat.forEach((d)=>{
      res.write("<li>"+d.country+", "+d.year+", "+d.top+", "+d.doping+"</li>");
    });

    res.write("</ul>__________________</body></html>");
    res.end();
  });
});

//-----------           ALL PUT IN LOCATION.HTML
*/

/*
//gold-medals
app.get("/about/gold-medals",function (req,res) {
  fs.readFile('datagoldmedals.json','utf8',function (err,content) {
    console.log("Data read");
    dat=JSON.parse(content);
    res.write("<html><body>_____Information_____<ul>");
    dat.forEach(function (d) {
      res.write("<li>"+d.country+", "+d.year+", "+d.numgoldmedals+", "+d.numsilvermedals+"</li>");
    });

    res.write("</ul>__________________</body></html>");
    res.end();
  });
});*/

//--------------           ALL PUT IN GOLD-MEDALS.HTML

//athletesnumber
/*app.get("/about/athletesnumber",(req,res)=>{
	fs.readFile('dataatheletesnumber.json','utf8',(err,content)=>{//LEER DE FORMA ASÍNCRONA
	console.log("Data read");
	contacts2= JSON.parse(content);

	res.write("<body><html>Country----------Year----------male athletes number----------female athletes number");
	contacts2.forEach((athletesnumber)=>{
	res.write("<br>-"+athletesnumber.country+"-----------"+athletesnumber.year+"--------------------"+
		athletesnumber.maleathletesnumber+"-------------------------------"+athletesnumber.femaleathletesnumber+"</br>");
});
res.write("</ul></body></html>");
res.end()
});
});*/

//------------ALL PUT IN ATHLETESNUMBER.HTML
app.listen(port);
