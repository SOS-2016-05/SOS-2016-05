var express=require("express");
var app=express();

app.get("/about",(req,res)=>{
  res.write("<html><body>_____Group Members_____<ul>");

  res.write("<li><a href='/about/location.js'>Antonio Jimenez Vega: location</a></li>");
  res.write("<li>Enrique Guerrero Fernandez: participants-number</li>");
  res.write("<li>Mario Esteban Ucles: gold-medals</li>");

  res.write("<ul>________Theme________");
  res.write("<li>Our sources of information are aimed at analyzing the relationship between the location, no of participants and achieved gold medals in the Olympic Games throughout history.</li>");

  send.write("</ul></ul>__________________</body></html>");
  res.end();
});

app.listen(process.env.PORT)
//app.listen(process.env.PORT); //default port of heroku
