const fetch = require('node-fetch')

const cb = (callback, p1, p2, p3) => {
	if(callback === undefined) return p1
	try {callback(p1, p2, p3);return p1} catch(err) {throw err}
}

const handle = async (res, returnInsteadOfError) => {
	res = await res.text()

	var returnData = ''
	
	try {
		res = JSON.parse(res)
	} catch(err) {}

	if(res.message === 'Invalid API Key.') {
		if(returnInsteadOfError) {
			returnData = 'Invalid API Key'
		} else {
			throw 'XBL.IO ERROR: Invalid API Key'
		}
	}

	if(typeof res === 'object') {
		if(Object.keys(res).length === 1 && Object.keys(res)[0] === 'profileUsers') {
			returnData = res.profileUsers[0]
		}
		if(returnData.settings !== undefined) {
			var settings = returnData.settings
			returnData.settings = {}

			for(var i = 0;i<settings.length;i++) {
				returnData.settings[settings[i].id] = settings[i].value
			}
			
		}
	}

	if(returnData === '') {returnData = res}
	return returnData
}

class XBL_Client {
	#XAuth = null
	
	constructor() {
		this.#XAuth = null
		this.account = {}
		this.accounts = []
	};

	fetchData(method, body) {
		return {
			method: method ? method.toUpperCase() : 'GET',
			headers: {
				'X-Authorization': this.#XAuth ? this.#XAuth : ''
			},
			body
		};
	};

	async login(XAuth, callback) {
		var XAuthStore = this.#XAuth
		this.#XAuth = XAuth

		var account = await fetch(`https://xbl.io/api/v2/account`, this.fetchData()).then(async res => {return await handle(res, true)})
		
		if(account === 'Invalid API Key') {
			this.XAuth = XAuthStore
			throw 'XBL.IO ERROR: Invalid API Key'
		}

		this.account = account

		return cb(callback, account)
	};

	async getAccount(xuid) {

		if(typeof xuid !== typeof '' && typeof xuid !== typeof 123 && xuid !== undefined && xuid !== null) {throw 'XBL.IO ERROR: Incorrect input type for `getAccount()`, must input a value with type `string`, `integer`, `undefined`, or `null`\nInputted ' + xuid + ', which is a type ' + typeof xuid}

		var account = await fetch(`https://xbl.io/api/v2/account${xuid ? `/${xuid}` : ''}`, this.fetchData()).then(async res => {return await handle(res)})
		
		if(xuid === this.account.id || xuid === undefined) {
			this.account = account
		} else {
			this.accounts = this.accounts.filter(acc => acc.id !== account.id)
			
			if(this.accounts.length >= 10) {
				this.accounts.splice(-(this.accounts.length - 9), this.accounts.length - 9)
				this.accounts.splice(0, 0, account)
			} else {
				this.accounts.splice(0, 0, account)
			}
			
 		}
		
		return account
		
	}

	async getAccounts(xuids) {
		if(typeof xuids !== typeof []) {throw 'XBL.IO ERROR: XUIDs must be an array when fetching multiple accounts with `getAccounts()`, for singular accounts, use `getAccount()`'}
		var returnData = []
		for(var i = 0; i < xuids.length; i++) {
			returnData = [...returnData, await getAccount(xuids[i])]
		}
		return returnData
	}

	async friends(xuid) {
		return await fetch(`https://xbl.io/api/v2/friends${xuid ?  `?xuid=${xuid}` : ''}`, fetchData()).then(async res => {return await handle(res)})
	}

	async userFetch(gt) {
		if(!gt) {throw 'XBL.IO ERROR: Must have GamerTag input on User Search'}
		return await fetch(`https://xbl.io/api/v2/friends/search?gt=${gt}`, fetchData()).then(async res => {return await handle(res)})
	}

	async friendAdd(xuid) {
		if(!xuid) {throw 'XBL.IO ERROR: Must include a User XUID to add a friend.'}

		return await fetch(`https://xbl.io/api/v2/friends/add/${xuid}`, fetchData()).then(async res => {return await handle(res)})
	}

	async friendRemove(xuid) {
		if(!xuid) {throw 'XBL.IO ERROR: Must include a Friend XUID to remove a friend.'}

		return await fetch(`https://xbl.io/api/v2/friends/remove/${xuid}`, fetchData()).then(async res => {return await handle(res)})
	}

	async favoriteAdd(xuid) {
		if(!xuid) {throw 'XBL.IO ERROR: Must have include an xuid to add as a favorite.'}

		return await fetch(`https://xbl.io/api/v2/friends/favorite`, fetchData('post', {"xuids":[parseInt(xuid)]})).then(async res => {return await handle(res)})
	}

	async favoriteRemove(xuid) {
		if(!xuid) {throw 'XBL.IO ERROR: Must have include an xuid to remove from favorites.'}

		return await fetch(`https://xbl.io/api/v2/friends/favorite/remove`, fetchData('post', {"xuids":[parseInt(xuid)]})).then(async res => {return await handle(res)})
	}

	async fetchPresence(xuids) {
		if(typeof xuids !== 'array' && xuids !== undefined) {throw 'XUIDs for presence fetching must be either empty or an array.'}

		if(xuids !== undefined) {
			var XUIDs = ''
			for(i = 0;i < xuids.length;i++) {
				XUIDs = `${XUIDs},${xuids[i]}`
			}
			XUIDs = `/${XUIDs.substr(1)}`
		}

		return await fetch(`https://xbl.io/api/v2${XUIDs ? XUIDs : ''}/presence`, fetchData()).then(async res => {return await handle(res)})
	}

	async fetchConverstaion(xuid) {
		return await fetch(`https://xbl.io/api/v2/conversations${xuid ? `/${xuid}` : ''}`, fetchData()).then(async res => {return await handle(res)})
	}
	async fetchConversations(xuid) {return await this.fetchConversation(xuid)}

	async sendUserMessage(xuid, message) {
		if(!xuid || !message) {throw 'XBL.IO ERROR: Must input XUID and message to send to user.'}

		return await fetch(`https://xbl.io/api/v2/conversations`, fetchData('post', {"xuid":`${xuid}`, "message":message})).then(async res => {return await handle(res)})
	}

	async sendGroupMessage(groupId, message) {
		if(!groupId || !message) {throw 'XBL.IO ERROR: Must input Group ID and message to send to group.'}

		return await fetch(`https://xbl.io/api/v2/group/send`, fetchData('post', {"groupId":`${groupId}`,"message":message}))
	}

	async sendMessage(UoG, ID, Message) {
		if(!UoG || !ID || !Message) {throw 'XBL.IO ERROR: Must input type of conversation (group/g or user/u), conversation id, and message.'}

		UoG = UoG.toLowerCase()

		if(UoG === 'group' || UoG === 'g' || UoG ===  'group/g') {
			var url = 'https://xbl.io/api/v2/group/send'
			var data = {
				"groupId":`${ID}`,
				"message":message
			}
		} else if(UoG === 'user' || UoG === 'u' || UoG === 'user/u') {
			var url = 'https://xbl.io/api/v2/conversations'
			var data = {
				"xuid":`${ID}`,
				"message":message
			}
		}

		if(url === undefined) {throw 'XBL.IO ERROR: Invalid message type. (Not group/g or user/u).'}

		return await fetch(url, fetchData('post', data)).then(async res => {return await handle(res)})
	}

	
};

module.exports = XBL_Client