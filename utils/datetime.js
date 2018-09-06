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


	var str = day + "." + month + "." + year + " " +  hour + ":" + min + ":" + sec;

	return str;
}
