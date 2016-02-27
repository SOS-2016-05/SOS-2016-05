var express=require("express");
var fs=require("fs");
var dat=[];

var app=express();

app.get("/",(req,res)=>{
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

app.listen(process.env.PORT);
