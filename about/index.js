var express=require("express");
var app=express();

app.get("/about/",(req,res)=>{
  res.write("<html><body>_____Group Members_____<ul>");

  res.write("<li>Antonio Jimenez Vega</li>");
  res.write("<li>Enrique Guerrero Fernandez</li>");
  res.write("<li>Mario Esteban Ucles</li>");
  res.write("");
  res.write("<ul>________Theme________");
  res.write("<li>Our sources of information are aimed at analyzing the relationship between the location, no of participants and achieved gold medals in the Olympic Games throughout history.</li>");

  send.write("</ul></ul>__________________</body></html>");
  res.end();
});

app.listen(process.env.PORT)
//app.listen(process.env.PORT); //default port of heroku
