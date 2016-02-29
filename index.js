var express=require("express");
var app=express();

var fs=require("fs");   //for all files.

var dat=[];   //data location
var athletesnumber=[];  //data athletesnumber
var datt[];       //data gold-medals

app.get("/about",(req,res)=>{
  res.write("<html><body>_____Group Members_____<ul>");

  res.write("<li>Antonio Jimenez Vega: <a href='/about/location'>location</a></li>");
  res.write("<li>Enrique Guerrero Fernandez:<a href='/about/athletesnumber'> participants-number</a></li>");
  res.write("<li>Mario Esteban Ucles:<a href='/about/gold-medals'> gold-medals </a></li>");

  res.write("<ul>________Theme________");
  res.write("<li>Our sources of information are aimed at analyzing the relationship between the location, no of participants and achieved gold medals in the Olympic Games throughout history.</li>");

  send.write("</ul></ul>__________________</body></html>");
  res.end();
});


//location
app.get("/about/location",(req,res)=>{
  fs.readFile('data.json','utf8',(err,content)=>{
    console.log("Data read");
    dat=JSON.parse(content);
    res.write("<html><body>_____Information_____<ul>");
    dat.forEach((d)=>{
      res.write("<li>"+d.country+", "+d.year+", "+d.event+", "+d.edition+"</li>");
    });

    res.write("</ul>__________________</body></html>");
    res.end();
  });
});

//-----------



//gold-medals
app.get("/about/gold-medals",function (req,res) {
  fs.readFile('datagoldmedals.json','utf8',function (err,content) {
    console.log("Data read");
    dat=JSON.parse(content);
    res.write("<html><body>_____Information_____<ul>");
    datt.forEach(function (dd) {
      res.write("<li>"+dd.country+", "+dd.year+", "+dd.numgoldmedals+", "+dd.numsilvermedals+"</li>");
    });

    res.write("</ul>__________________</body></html>");
    res.end();
  });
});

//--------------

//athletesnumber
app.get("/about/athletesnumber",(req,res)=>{
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
});

//------------


app.listen(process.env.PORT);
//app.listen(process.env.PORT); //default port of heroku
