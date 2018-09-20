// converts timestamp to date!
// problem: solidity block.timestamp returns seconds since unix epoch
// 					javascript uses miliseconds since unix epoch
//					-> block.timestamp needs to be multiplied by 1000

export default function(timestamp) {
	var date = new Date(timestamp*1000);

	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	var hour = date.getUTCHours()+2;
	var min = date.getUTCMinutes();
	var sec = date.getUTCSeconds();


	month = (month < 10 ? "0" : "") + month;
	day = (day < 10 ? "0" : "") + day;
	hour = (hour < 10 ? "0" : "") + hour;
	min = (min < 10 ? "0" : "") + min;
	sec = (sec < 10 ? "0" : "") + sec;

	// creating a string in our used date format
	var str = day + "." + month + "." + year + " " +  hour + ":" + min + ":" + sec;

	return str;
}
