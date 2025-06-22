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

### type usages:
| type | comment | meets | use |
| ------ | ------ | ------ | ------ |
| **IClient** | Bot launch client | .. | use so; client: IClient |
| **IPrefixCommand** | Used for prefix commands | name, execute | {name: "exampleCommand"} as IPrefixCommand |
| **PrefixCommandArgs** | Is a type given to command values | client, message, args | execute({client, message, args} : PrefixCommandArgs){} |
| **ISlashCommand** | Used for slash commands | data, execute | {name: "exampleCommand"} as ISlashCommand |
| **SlashCommandArgs** | Is a type given to command values | client, interaction | execute({client, interaction} : SlashCommandArgs){} |
| **IEvent** | A type given to event files | name, once, execute | IEvent<ActivityType.ClientReady> |

