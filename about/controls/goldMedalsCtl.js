var fs=require("fs");
var key=false;
var medals=[
	{"country": "China", "year": "2008","goldmedalsnumber": "51","silvermedalsnumber":"21"},
	{"country": "Russia", "year": "2008","goldmedalsnumber": "23","silvermedalsnumber":"21"},
	{"country": "USA","year": "2004","goldmedalsnumber": "35","silvermedalsnumber":"39"},
	{"country": "Russia","year": "2004","goldmedalsnumber": "27","silvermedalsnumber":"27"},
	{"country": "USA","year": "2000","goldmedalsnumber": "39","silvermedalsnumber":"25"}];

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
function FilterByCountryYear(value1,value2) {
    return function(obj){
        return ((value1!=undefined && value2==undefined && (obj.country===value1 || obj.year===value1)) || (value1==undefined && value2!=undefined && obj.year===value2) || (value1!=undefined && value2!=undefined && obj.country===value1 && obj.year===value2) || (value1==undefined && value2==undefined));
    }    
} 

function ArrayDifference(arr1,arr2)
{
    var res = [];
    arr1.forEach(
        function (obj){
            if(arr2.indexOf(obj)==-1)
                res.push(obj);
        }   
    );
    return res;
}

module.exports.unauthorized=function (req,res){
        res.sendStatus(401);
    };

module.exports.getLoadIntialDataMedals=function (req,res){  //Load Gold Medals json data
    medals= [];
	var content=fs.readFileSync('datamedals.json','utf8');
	medals = JSON.parse(content);
	console.log("The Gold Medals data have been successfully loaded.")
	res.sendStatus(200);
  };

module.exports.getMedals=function (req,res){ 
    var value1=req.params.value1;
    var value2=req.params.value2;
    console.log("New GET for directory listing");
    res.send(medals.filter(FilterByCountryYear(value1,value2)));
    
  };

module.exports.postGoldMedal=function (req,res){
    var body = req.body;
    medals.push(body);
    console.log("New POST of resource "+body.country+" "+body.year);
    res.sendStatus(201);
};

module.exports.postGoldMedals=function (req,res){
        res.sendStatus(400);
    }

module.exports.putMedal=function (req,res){ 
	var body = req.body;
	var country = req.params.country;
	var year = req.params.year;
    var temp = medals.filter(FilterByCountryYear(country,year));
    if(temp.length!=0){
        temp.forEach(
            function (obj){
                obj.country=body.country;
                obj.year=body.year;
                obj.goldmedalsnumber=body.goldmedalsnumber;
                obj.silvermedalsnumber=body.silvermedalsnumber;
            }
        );
        res.sendStatus(200);
    }
    
	else
		res.sendStatus(404);
};

module.exports.putMedals=function (req,res){
    res.sendStatus(400);
};

module.exports.deleteMedals=function (req,res){ 
        var value1=req.params.value1;
        var value2=req.params.value2;
        console.log("New DELETE");
        var temp = medals.filter(FilterByCountryYear(value1,value2));
        var diff = ArrayDifference(medals,temp);
        if(temp.length!=0)
        {
            medals=diff;
            res.sendStatus(200);
        }
        else
            res.sendStatus(404);
  };