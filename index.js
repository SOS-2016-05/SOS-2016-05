var express=require("express");
var app=express();
var bodyParser=require("body-parser");

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


//Music groups

var mgroups = [{name: "LinkinPark"}, {name: "SimplePlan"}, {name: "Sum41"}];

//To convert my local data to what the client is requesting for
app.get("/api/sandbox/musicgroups/:name",function (req,res){
   var name = req.params.name; //Where the "name" is the one that we've put in /contacts/:xxxx
    console.log("New GET of resource "+name);
	if(mgroups[StrArray(req.params.name,mgroups!=-1)
	    res.send(mgroups[StrArray(req.params.name,mgroups)]);
	else
		res.sendStatus(404);
});

//To storage what the client is sending us
app.post("/api/sandbox/musicgroups", function (req,res){
    var mgroup = req.body;
    mgroups.push(mgroup);
    console.log("New POST of resource "+mgroup.name);
    res.sendStatus(200);
    
});


//animejs----------------
/*  fs.readFile('/api-test/animeseries.json','utf8',(err,content)=>{
    console.log("Data read");
    dat=JSON.parse(content);
  });*/

/*

  var animes=[{name:"hellsing"},{name:"evangelion"}];
  var cont=0;

  app.get("/api-test/:name",(req,res)=>{    //name
    var name=req.params.name;
    for(var i=0;i<animes.length;i++){
      if(animes[i]==name){
        cont=i;
      }
      else{
        cont=i;
      }
    }
    
    console.log("New GET of resource "+name);
    res.send(animes[cont]);
  });


  app.get("/api-test",(req,res)=>{    //list
    var name=req.params.name;
    console.log("New GET of resource "+name);
    res.send(animes[0]);
  });

  app.post("/api-test",(req,res)=>{
    var anime=req.body;  //contacto del cliente
    animes.push(anime);
    console.log("New POST of resource "+anime.name);
    res.sendStatus(200);
  });

  app.put("/api-test/:name",(req,res)=>{  //data update
    var name=req.params.name;
    animes.push(anime);
    console.log("New PUT of resource "+anime.name);
    res.send(anime[0]);
  });

  app.delete("/api-test/:name",(req,res)=>{ //delete name
    var name=req.params.name;
    console.log("New DELETE of resource "+name);
    res.sendStatus(200);
  });



*/



/*  app.delete("/api-test",(req,res)=>{ //delete list
    var name=req.params.name;
    console.log("New DELETE of resource "+name);
    res.sendStatus(200);
  });*/

//--------------------


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
//app.listen(process.env.PORT); //default port of heroku
