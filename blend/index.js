const fs = require('fs-extra')

const functions = fs.readdirSync(`${__dirname}/functions`).filter(file => file.endsWith('.js'))

var funcExports = {}

functions.forEach(func => {
	funcExports[func.substr(0, func.length-3)] = require(`${__dirname}/functions/${func}`)
})

const dataExports = {
	baseUrl: 'https://xbl.io',
	apiUrl: 'https://xbl.io/api/v2',
}

module.exports = {...dataExports, ...funcExports}