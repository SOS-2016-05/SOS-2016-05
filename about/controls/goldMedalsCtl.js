var fs=require("fs");
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

function SearchInArray(value1,value2){
    return function(obj){
        return ((value1!=undefined && value2==undefined && obj.goldmedalsnumber===value1) || (value1==undefined && value2!=undefined && obj.silvermedalsnumber===value2) || (value1!=undefined && value2!=undefined && obj.goldmedalsnumber===value1 && obj.silvermedalsnumber===value2) || (value1==undefined && value2==undefined));
    }
}

function SearchInArray(value1,value2){
    return function(obj){
        return ((value1!=undefined && value2==undefined && obj.goldmedalsnumber===value1) || (value1==undefined && value2!=undefined && obj.silvermedalsnumber===value2) || (value1!=undefined && value2!=undefined && obj.goldmedalsnumber===value1 && obj.silvermedalsnumber===value2) || (value1==undefined && value2==undefined));
    }
}

function SearchDatesInArray(from,to){
    return function(obj){
        return ((from!=undefined && to==undefined && obj.year>=from) || (from==undefined && to!=undefined && obj.year<=to) || (from!=undefined && to!=undefined && obj.year>=from && obj.year<=to || (from==undefined && to==undefined)));
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

function Paginate(offset,limit,arr){
	var res=[];
	var cont=0;

	if (offset==undefined)
		offset=0;
	if(limit==undefined)
		limit=arr.length;
	if(offset>arr.length)
		console.log("Error: Offset greater than the array size.");
	else
		for(var i=offset;i<arr.length;i++)
			if(limit>cont){
				res.push(arr[i]);
				cont++;
			}
	return res;
}

function CheckBody(body){
    return body.country && body.year && body.goldmedalsnumber && body.silvermedalsnumber;
    
}

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
    var goldMedals = req.query.goldmedalsnumber;
    var silverMedals = req.query.silvermedalsnumber;
    var from = req.query.from;
    var to = req.query.to;
    var offset = req.query.offset;
    var limit = req.query.limit;
    var temp = medals;
    console.log("New GET for directory listing");    temp=Paginate(offset,limit,medals.filter(FilterByCountryYear(value1,value2)).filter(SearchInArray(goldMedals,silverMedals)).filter(SearchDatesInArray(from,to)));
    if(temp.length!=0)
        res.send(temp);
    else
        res.sendStatus(404);
  };

module.exports.postMedal=function (req,res){
    var body = req.body;
    if(CheckBody(body))
    {
        var temp= medals.filter(FilterByCountryYear(body.country,body.year));
        if(!temp.length)
        {
            medals.push(body);
            console.log("New POST of resource "+body.country+" "+body.year);
            res.sendStatus(201);
        }
        else
            res.sendStatus(409);
    }
    else
        res.sendStatus(400);
};

module.exports.postMedals=function (req,res){
        res.sendStatus(405);
    }

module.exports.putMedal=function (req,res){ 
	var body = req.body;
    var country = req.params.country;
    var year = req.params.year;
     var temp = medals.filter(FilterByCountryYear(country,year));
     if(temp.length!=0){
         if(CheckBody(body) && body.country==req.params.country && body.year==req.params.year)
         {
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
            res.sendStatus(400);
    }
    else
        res.sendStatus(404);
};

module.exports.putMedals=function (req,res){
    res.sendStatus(405);
};

module.exports.deleteMedals=function (req,res){ 
    var value1=req.params.value1;
    var value2=req.params.value2;
    var goldMedals = req.query.goldmedalsnumber;
    var silverMedals = req.query.silvermedalsnumber;
    var from = req.query.from;
    var to = req.query.to;
    var offset = req.query.offset;
    var limit = req.query.limit;
    console.log("New DELETE");
    var temp = medals; temp=Paginate(offset,limit,medals.filter(FilterByCountryYear(value1,value2)).filter(SearchInArray(goldMedals,silverMedals)).filter(SearchDatesInArray(from,to)));
    var diff = ArrayDifference(medals,temp);
    if(temp.length!=0)
    {
        medals=diff;
        res.sendStatus(200);
    }
    else
        res.sendStatus(404);
};