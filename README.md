# Discordjs Bot Typescript

> Run: **npm run dev** or **yarn dev**

| Command | Comment |
| ------ | ------ | 
| npm run build | Compiles typescript files to javascript |
| npm start | Runs compiled javascript files |

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