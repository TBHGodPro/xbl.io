const api = require('./index.js');

(async() => {

	var client = new api.Client();

	client.login(process.env.TEST_API_KEY, (account) => {
		// console.log(client)
	})

	await client.getAccount(2535464872657440)
	await client.getAccount(2535464872657440)

	console.log(client)
	
})();