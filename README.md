# Discordjs Bot Typescript

> Run: **npm run dev** or **yarn dev**

| Command | Comment |
| ------ | ------ | 
| npm start | Runs discord bot |
| npm run deploy | deploy slash command loads to discord bot |

Fill in the ` .env ` file within the project with your information:

```
TOKEN = 
BOT_ID = 
PREFIX = 
```

Usages:

```js

//  one way
const Hello : ITypes.ISlashCommand = {}
export default Hello

// two way
export default {} as ITypes.ISlashCommand

```


### contents:
* events loader
* slash commands loader
* prefix commands loader
* deploy command
* defined types