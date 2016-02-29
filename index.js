var express=require("express");
var app=express();

var fs=require("fs");   //for all files.

var dat=[];   //data location

app.get("/about",(req,res)=>{
  res.write("<html><body>_____Group Members_____<ul>");

  res.write("<li>Antonio Jimenez Vega: <a href='/about/location'>location</a></li>");
  res.write("<li>Enrique Guerrero Fernandez: participants-number</li>");
  res.write("<li>Mario Esteban Ucles: gold-medals</li>");

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



//});



app.listen(process.env.PORT);
//app.listen(process.env.PORT); //default port of heroku
