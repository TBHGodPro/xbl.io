# [XBL.IO](https://xbl.io) Unnofficial Client
#### BY: DerpDevs
#### Github Repo: [github.com/TBHGodPro/xbl.io](https://github.com/TBHGodPro/xbl.io)

<br>

## What is this?

This is a project made by DerpDevs, we had been using [xbl.io](https://xbl.io) for a while and we wanted to make it easier for everyone to use it.

This works just like any API handler, but please note that we are not the official developers of [xbl.io](https://xbl.io) and that there may be issues with this.

<br>

## Starting Off

To get started, head over to [xbl.io](https://xbl.io) and create an account, you can pick a free one but if you would like you may upgrade it (Note: Free accounts allow a maximum of 500 API requests per hour). Once you have created an account, go to your profile by clicking on your username, and clicking profile. Once you are there, make a new API Key and put it somewhere safe. At this point get your code editor open and run `npm install xbl.io` in the terminal to install the package (You need at least node 12 to use this package). 

Note: For these examples, replace `API_KEY` and `NEW_API_KEY` with the actual api keys.

<br>

## Instantiate Client

```JavaScript

const XBL = require("xbl.io");
var client = new XBL.Client();



client.login(API_KEY, (account) => {
	console.log("Logged in as: " + account.settings.Gamertag + "!")
})

OR

await client.login(API_KEY)
console.log("Logged in as: " + account.settings.Gamertag + "!")
```

WARNING: `client.login()` is async *(this is due to the fact that it must verify that the API Key is valid)* so it may not be instant *(though it is pretty quick)* unless you run it with an await before it in an async function. Though you can run a callback with a parameter which is your account and another one which would be your oldAccount if you were logged in before.

<br>

You can easily login to another user by doing:

```JavaScript
client.login(NEW_API_KEY, (newAccount, oldAccount) => {
	console.log("Logged out from: " + oldAccount.settings.Gamertag + " and logged in as: " + newAccount.settings.Gamertag + "!")
})



await client.login(NEW_API_KEY)
console.log("Logged in as: " + account.settings.Gamertag + "!")
```

<br>

## Properties

### cache
```JavaScript
// Object
client.cache
```
The cache which stores all data recently fetched from the servers



## Cache

### account
```JavaScript
// Object
client.cache.account
```
The most recent save of the client's account

### accounts
```JavaScript
// Object<String:Object>
client.cache.accounts
```
The save of all accounts fetched (Saves non-repetitive objects with the user xuid as the key and the account object as the value)



## Methods

### getAccount 
```JavaScript
await client.getAccount(optional:String/Int/null:XUID);
```
Grabs the account of the XUID specified, if no XUID is specified, uses the currently logged in account's XUID.

### getAccounts
```JavaScript
await client.getAccounts(required:Array<String/Int/Null>:XUIDs)
```
Iterates throught the inputted `Array` and returns an array of the accounts of all the xuids inputted.

### friends 
```JavaScript
await client.friends(optional:String/Int:XUID);
```
Grabs the accounts of all the friends of the account specified, if no account is specified, uses the currently logged in account.

### userFetch 
```JavaScript
await client.userFetch(required:String:gamertag);
```
Grabs the account of the user specified.

### friendAdd *(Currently not working)*
```JavaScript
await client.friendAdd(required:String/Int:XUID);
```
Adds a friend to your friends list.

### friendRemove *(Currently not working)*
```JavaScript
await client.friendRemove(required:String/Int:XUID);
```
Removes a friend from your friends list.

### favoriteAdd *(Currently not working)*
```JavaScript
await client.favoriteAdd(required:String/Int:XUID);
```
Adds a friend to your favorites.

### favoriteRemove *(Currently not working)*
```JavaScript
await client.favoriteRemove(required:String/Int:XUID);
```
Removes a friend from your favorites while still keeping them in your friends list.

### fetchPresence
```JavaScript
await client.fetchPresence(optional:Array<String/Int>:XUIDs /* array */);
```
Fetches the presences of all the XUIDs in the array (they must be friends of yours)	. If no array is inputted, it will fetch the presence of all your friends.

### fetchConversation/fetchConversations
```JavaScript
await client.fetchConversation(optional:String/Int:XUID);
OR
await client.fetchConversations(optional:String/Int:XUID);
```
Fetches the conversations between you and the user with the XUID. If no XUID is given, fetches all of your conversations.

### sendMessage *(UNTESTED)*
```JavaScript
await client.sendMessage(required:String:(user, u, or user/u) or (group, g, or group/g), required:String/Int:groupId or user XUID, required:String:message)
```
Sends a message to the user or group specified.

#### sendGroupMessage/sendUserMessage
Same arguments just without the first one. Does the same thing as `sendMessage`, just another method.







<br><br><br><br><br>
#### We hope this guide was helpful for you on your journey!