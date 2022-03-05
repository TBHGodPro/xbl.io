const fs = require('fs-extra')
const path = require('path')

const folders = fs.readdirSync(path.resolve(__dirname, './')).filter(file => file !== 'node_modules' && !file.includes('.'))

var exports = {}

folders.forEach(folder => {
	if(folder === 'blend') {
		exports = {...exports, ...require(path.resolve(__dirname, `./${folder}/index.js`))}
	} else {
		exports[folder] = require(path.resolve(__dirname, `./${folder}/index.js`))
	}
});


module.exports = exports