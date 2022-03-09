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
var client = new 7XBL.Client();



client.login(API_KEY, (account) => {
	console.log("Logged in as: " + account.settings.Gamertag + "!")
})

OR

await client.login(API_KEY)
console.log(client.settings.Gamertag)
```

WARNING: `client.login()` is async *(this is due to the fact that it must verify that the API Key is valid)* so it may not be instant *(though it is pretty quick)* unless you run it with an await before it in an async function. Though you can run a callback with a parameter which is your account.

<br>

You can easily login to another user by doing:

```JavaScript
client.login(NEW_API_KEY, (account) => {
	console.log(account.settings.Gamertag)
})



await client.login(NEW_API_KEY)
console.log(client.settings.Gamertag)
```

<br>

## Properties

### account
```JavaScript
// Object
client.account
```
The most recent cache save of the client's account

### accounts
```JavaScript
// Array<Object>
client.accounts
```
The cache of all accounts recently fetched (saves up to 10 non-repetitive accounts not including the client's account with newer cached items first)


## Methods

### getAccount 
```JavaScript
await client.getAccount(optional:XUID);
```
Grabs the account of the XUID specified, if no XUID is specified, uses the currently logged in account's XUID.

### getAccounts
```JavaScript
await client.getAccounts(required:XUIDs)
```
Iterates throught the inputted `Array` and returns an array of the accounts of all the xuids inputted.

### friends 
```JavaScript
await client.friends(optional:XUID);
```
Grabs the accounts of all the friends of the account specified, if no account is specified, uses the currently logged in account.

### userFetch 
```JavaScript
await client.userFetch(required:gamertag);
```
Grabs the account of the user specified.

### friendAdd *(Currently not working)*
```JavaScript
await client.friendAdd(required:XUID);
```
Adds a friend to your friends list.

### friendRemove *(Currently not working)*
```JavaScript
await client.friendRemove(required:XUID);
```
Removes a friend from your friends list.

### favoriteAdd *(Currently not working)*
```JavaScript
await client.favoriteAdd(required:XUID);
```
Adds a friend to your favorites.

### favoriteRemove *(Currently not working)*
```JavaScript
await client.favoriteRemove(required:XUID);
```
Removes a friend from your favorites while still keeping them in your friends list.

### fetchPresence
```JavaScript
await client.fetchPresence(optional:XUIDs /* array */);
```
Fetches the presences of all the XUIDs in the array (they must be friends of yours)	. If no array is inputted, it will fetch the presence of all your friends.

### fetchConversation/fetchConversations
```JavaScript
await client.fetchConversation(optional:XUID);
OR
await client.fetchConversations(optional:XUID);
```
Fetches the conversations between you and the user with the XUID. If no XUID is given, fetches all of your conversations.

### sendMessage *(UNTESTED)*
```JavaScript
await client.sendMessage(required:(user, u, or user/u) or (group, g, or group/g), required:groupId or user XUID, required:message)
```
Sends a message to the user or group specified.

#### sendGroupMessage/sendUserMessage
Same arguments just without the first one. Does the same thing as `sendMessage`, just another method.







<br><br><br><br><br>
#### We hope this guide was helpful for you on your journey!