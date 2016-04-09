var express=require("express");
var app=express();
var bodyParser=require("body-parser");

var locationCtl=require("./about/controls/locationCtl.js");
var animeCtl=require("./about/controls/animeCtl.js");
var sportscentersCtl=require("./about/controls/sportscentersCtl.js");
var participantsNumberCtl=require("./about/controls/participants-numberCtl.js");
var goldMedalsCtl=require("./about/controls/goldMedalsCtl.js");

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

app.get("/time",function (req,res){
  var now=Date();
    res.send("The time now is: "+now);
  });

var passport = require('passport');
var LocalAPIKeyStrategy = require('passport-localapikey-update').Strategy;

passport.use(new LocalAPIKeyStrategy(function(apikey, done) { done(null,apikey); }));

function WriteReadAccess(req, res, next) {
    passport.authenticate('localapikey', function(err, user, info) {
        if(!user)
            return res.sendStatus(401);
        else if (user!="sosrw") {
            return res.sendStatus(403);
        }
        return next();
    })(req, res, next);   
};

function ReadAccess(req, res, next) {
    passport.authenticate('localapikey', function(err, user, info) {
        if(!user)
            return res.sendStatus(401);
        else if (user!="sosrw" && user!="sosr") {
            return res.sendStatus(403);
        }
        return next();
    })(req, res, next);
};

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

app.get("/api/sandbox/animeseries",animeCtl.getAnimes);
app.get("/api/sandbox/animeseries/:name",animeCtl.getAnime);
app.get('/api-test/animeseries/loadInitialData',animeCtl.AnimeLoad);
app.post("/api/sandbox/animeseries",animeCtl.postAnimes);
app.post("/api/sandbox/animeseries/:name",animeCtl.postAnime);
app.put('/api/sandbox/animeseries/:name',animeCtl.putAnime);
app.put("/api/sandbox/animeseries",animeCtl.putAnimeF);
app.delete("/api/sandbox/animeseries/:name",animeCtl.deleteAnime);
app.delete("/api/sandbox/animeseries",animeCtl.deleteAnimes);

//--------------------------------------------ANTONIO API------------------------

app.get("/api/v1/locations",locationCtl.getLocations);
app.get("/api/v1/locations/loadInitialData",locationCtl.getLoadIntialDataLocations);
app.get("/api/v1/locations/:country/:year",locationCtl.getLocations);
app.get("/api/v1/locations/:country",locationCtl.getLocations);
app.post("/api/v1/locations",locationCtl.postLocation);
app.post("/api/v1/locations/:name",locationCtl.postLocationF);
app.post("/api/v1/locations/:country/:year",locationCtl.postLocationF);
app.put('/api/v1/locations/:country/:year',locationCtl.putLocation);
app.put("/api/v1/locations",locationCtl.putLocations);
app.put("/api/v1/locations/:country",locationCtl.putLocations);
app.delete("/api/v1/locations/:value1/:value2",locationCtl.deleteLocation);
app.delete("/api/v1/locations/:value1",locationCtl.deleteLocation);
app.delete("/api/v1/locations",locationCtl.deleteLocations);

//-------------------------------------------------------------------------------


//-----------------------SPORTSCENTERS-------------------------------------------
//----------------API-SPORTSCENTERS-MODULARIZED----------------------------------

app.get("/api/sandbox/sportscenters",sportscentersCtl.getSportsCenters);
app.get("/api/sandbox/sportscenters/:countryOrYear",sportscentersCtl.getSportsCenter);
app.get('/api-test/sportscenters/loadInitialData',sportscentersCtl.getLoadIntialDataSportsCenters);
app.post("/api/sandbox/sportscenters",sportscentersCtl.postSportsCenter);
app.post("/api/sandbox/sportscenters/:name",sportscentersCtl.postSportsCenters);
app.put('/api/sandbox/sportscenters/:name',sportscentersCtl.putSportsCenter);
app.put("/api/sandbox/sportscenters",sportscentersCtl.putSportsCenters);
app.delete("/api/sandbox/sportscenters/:name",sportscentersCtl.deleteSportsCenter);
app.delete("/api/sandbox/sportscenters",sportscentersCtl.deleteSportsCenters);

//-----------------------ENRIQUE API PARTICIPANTS NUMBERS-------------------------------------------
//----------------API-PARTICIPANTS NUMBERS-MODULARIZED----------------------------------
app.get("/api/v1/participants-number/loadInitialData",participantsNumberCtl.getLoadIntialDataParticipantsnumbers);
app.get("/api/v1/participants-number",participantsNumberCtl.getParticipantsnumbers);
app.get("/api/v1/participants-number/:country/:year",participantsNumberCtl.getParticipantsnumber);
app.get("/api/v1/participants-number/:countryOrYear",participantsNumberCtl.getParticipantsnumbersCountryOrYear);
app.post("/api/v1/participants-number",participantsNumberCtl.postParticipantsnumbers);
app.post("/api/v1/participants-number/:country/:year",participantsNumberCtl.postParticipantsnumber);
app.post("/api/v1/participants-number/:countryOrYear",participantsNumberCtl.postParticipantsnumber);
app.put('/api/v1/participants-number/:country/:year',participantsNumberCtl.putParticipantsnumber);
app.put("/api/v1/participants-number/:countryOrYear",participantsNumberCtl.putParticipantsnumbers);
app.put("/api/v1/participants-number",participantsNumberCtl.putParticipantsnumbers);
app.delete("/api/v1/participants-number/:country/:year",participantsNumberCtl.deleteParticipantsnumber);
app.delete("/api/v1/participants-number/:countryOrYear",participantsNumberCtl.deleteParticipantsnumberCountryOrYear);
app.delete("/api/v1/participants-number",participantsNumberCtl.deleteParticipantsnumbers);

//-----------------------MARIO API ATHLETES NUMBERS-------------------------------------------
//----------------GOLD-MEDALS-MODULARIZED----------------------------------

app.get("/api/v1/gold-medals/loadInitialData", ReadAccess , goldMedalsCtl.getLoadIntialDataMedals);
app.get("/api/v1/gold-medals", ReadAccess ,goldMedalsCtl.getMedals);
app.get("/api/v1/gold-medals/:value1", ReadAccess ,goldMedalsCtl.getMedals);
app.get("/api/v1/gold-medals/:value1/:value2", ReadAccess ,goldMedalsCtl.getMedals);
app.post("/api/v1/gold-medals", WriteReadAccess ,goldMedalsCtl.postMedal);
app.post("/api/v1/gold-medals/:country/:year", WriteReadAccess ,goldMedalsCtl.postMedals);
app.post("/api/v1/gold-medals/:countryOrYear", WriteReadAccess ,goldMedalsCtl.postMedals);
app.put("/api/v1/gold-medals/:country/:year", WriteReadAccess ,goldMedalsCtl.putMedal);
app.put("/api/v1/gold-medals/:countryOrYear", WriteReadAccess ,goldMedalsCtl.putMedals);
app.put("/api/v1/gold-medals", WriteReadAccess ,goldMedalsCtl.putMedals);
app.delete("/api/v1/gold-medals/:value1/:value2", WriteReadAccess ,goldMedalsCtl.deleteMedals);
app.delete("/api/v1/gold-medals/:value1", WriteReadAccess ,goldMedalsCtl.deleteMedals);
app.delete("/api/v1/gold-medals", WriteReadAccess ,goldMedalsCtl.deleteMedals);

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
/*app.get("/about/athletesnumber",function (req,res){
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

app.use("/RESTClient",express.static(__dirname + "/restclient"));

app.listen(port);
