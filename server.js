const express = require("express");
const mod = require("./timeFormat.js");

let server = express();

server.use('/', (req, res) => {
	let startUrl = '/api/timestamp/';
	let date;
	let re = /^(?:[0-9]{1,4}-(?:(?:0{0,1}[1-9]|1[0-2])-(?:0{0,1}[1-9]|1[0-9]|2[0-8])|(?:0{0,1}[13-9]|1[0-2])-(?:29|30)|(?:0{0,1}[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-0{0,1}2-29)$/;
	if(req.url.startsWith(startUrl)) {
		date = req.url.split(startUrl)[1];
		if(date === '') {
			date = new Date();
			res.send({"unix": date.getTime(), "utc": date.toUTCString()});
		} else if (date.match(re)) {
			let timeArr = date.split("-");
			console.log(timeArr);
			date = [mod.timeFormat(timeArr[0],4), mod.timeFormat(timeArr[1],2),mod.timeFormat(timeArr[2], 2)].join("-");
			let time = new Date(date);
			console.log(time);
			res.send ({"unix": time.getTime(), "utc": time.toUTCString()});
		} else if(typeof parseInt(date) == 'number' && date.length == 10) {
			res.send ({"unix": date, "utc": (new Date(date*1000)).toUTCString()});
		}  else {
			res.send({"error": "Invalid Date"});
		}
	}
	res.end();
})

server.listen(9000, () => {
	console.log("server running at 9000");
})