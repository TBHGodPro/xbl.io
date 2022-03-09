const api = require('./index.js');

(async() => {

	var client = new api.Client();

	client.login(process.env.TEST_API_KEY, (account) => {
		console.log(client)
	})
	
})();