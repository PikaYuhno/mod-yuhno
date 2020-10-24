# ModYuhno

This should be a moderation bot written in TypeScript.

## Commands
### Info
- [X] `avatar | avatar [mention|userid|name]`
- [X] `ping`
- [X] `userinfo | userinfo [mention|userid|name]`
- [X] `serverinfo`
- [X] `settings`
- [X] `help | help [commandname]`
- [ ] `roleinfo [roleid|rolename]`
- [ ] `about`
- [ ] `invite`

### Bot Owner
- [X] `eval [code]`
- [X] `guilds`
- [X] `leave [serverid]`

### Configuration
- [X] `prefix | prefix [newPrefix]`
- [X] `messagelog [channelid]`
- [X] `muterole [id]`
- [ ] `modlog [channelid]`
- [ ] `joinlog [channelid]`
- [ ] `leavelog [channelid]`
- [ ] `avatarlog [channelid]`


### Moderation
- [X] `ban [mention|userid] [reason]`
- [X] `unban [mention|userid]`
- [X] `kick [mention|userid|name] [reason]`
- [X] `mute [mention|userid|name] [duration] [reason]`
- [X] `unmute [mention|userid|name]`
- [X] `softban [mention|userid|name] [reason]`
- [X] `clear [parameter]` `Note: save deleted messages`
- [X] `lock [channelid]`
- [X] `unlock [channelid]`
- [X] `voicemove [channelid]`

### Other
- [ ] `poll *[title]* --duration=<hour>:<minute>`
- [ ] `random`
