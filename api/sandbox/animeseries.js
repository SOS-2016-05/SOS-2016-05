var express=require("express");
var bodyParser=require("body-parser");

var app=express();

var port=(process.env.PORT || 10000);

app.use(bodyParser.json()); //se pone en medio de las peticiones

var anime=[];

app.get("/api/sandbox/:name",(req,res)=>{
  var name=req.params.name;
  console.log("New GET of resource "+name);
  res.send(contacts[0]);
}); //identificador :name

app.post("/api/sandbox",(req,res)=>{
  var  contact=req.body;  //contacto del cliente
  contacts.push(contact);
  console.log("New POST of resource "+contact.name);
  res.sendStatus(200);
});

app.listen(port,()=>{
  console.log("Ready to go! port: "+port);
});
