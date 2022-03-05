const api = require('./index.js');

(async() => {

	var client = api.Client();

	client.login(process.env.TEST_API_KEY, (account) => {
		console.log(account)
	})
	
})();