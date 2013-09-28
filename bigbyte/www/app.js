var request = require('request');
var connect = require('connect');

const api_key = "9880b7209ebc9f0b0f8d0beb628ece0c";
const api_secret = "c213e61e81279a84";

const oauth_endpoint = "https://api.att.com/oauth/token";
const sms_endpoint = "https://api.att.com/sms/v3/messaging/outbox"

var app = connect()
	.use(connect.query())
	.use(action)
.listen(8080);

function action(req, resp, next) {
	sendSMS("tel:+14256586782", "Hello from alex  2222222", resp);
};

function sendSMS(mobilenumber, message, resp) {
	request({
		url: oauth_endpoint,
		method: "POST",
		headers: { "Accept": "application/json", "Content-Type": "application/x-www-form-urlencoded" },
		body: "grant_type=client_credentials&client_id=" + api_key + "&client_secret=" + api_secret + "&scope=SMS"
	} ,
	function (error, response, body){
		request({
			url: sms_endpoint,
			method: "POST",
			headers: { "Authorization": "Bearer " + JSON.parse(body).access_token, "Content-Type": "application/x-www-form-urlencoded" },
			body: "address=" + encodeURIComponent(mobilenumber) + "&message=" + encodeURIComponent(message)
		} , function (error, response, body){ resp.write(body); resp.end(); });
	})
};