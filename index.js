const fs = require('fs-extra')

const folders = fs.readdirSync(`${__dirname}`).filter(file => file !== 'node_modules' && !file.includes('.'))

var exports = {}

folders.forEach(folder => {
	if(folder === 'blend') {
		exports = {...exports, ...require(`${__dirname}/blend/index`)}
	} else {
		exports[folder] = require(`${__dirname}/${folder}/index`)
	}
});


module.exports = exports