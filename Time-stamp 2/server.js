var express = require('express');
var bodyparser = require('body-parser');
var cors = require('cors');
var app = express()
app.use(bodyparser.json());
app.use(cors())

app.get('/', function (req, res) {
	res.send('<h1>Welcome</h1><p1>Give Me a date A date and I will Covert it into Unix and natural Date</p1>')
})

app.get('/:date',function (req,resp) {
	var dateval = req.params.date;

	var opt = {
		year : 'numeric',
		month : 'long',
		day: 'numeric'
	}

	if(isNaN(dateval)){
		var naturaldt = new Date(dateval);
		naturaldt = naturaldt.toLocaleDateString('en-US',opt);
		var unixdt = new Date(dateval).getTime()/1000;
	}

	else{
		var unixdt = parseInt(dateval);
		var naturaldt = new Date(dateval*1000);
		naturaldt = naturaldt.toLocaleDateString('en-US',opt);
	}

	resp.json({unix:unixdt,natural:naturaldt});

});


app.listen(process.env.PORT || 3000, function () {
  console.log('Listening on port 3000!')
})
