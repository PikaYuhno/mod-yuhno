import {
    Client,
    Message,
    Permissions,
    GuildMember,
    User,
    MessageEmbed,
    VoiceChannel,
} from "discord.js";
import { Constants } from "../utils/utils";

export default class VoiceMove {
    private _client: Client;
    private _args: Array<string>;
    private _message: Message;
    public requiredPermission: any = Permissions.FLAGS.SEND_MESSAGES;
    public _category: string = "moderation";

    public _help: string = "Moves all users to the specified voice channel";
    public _example: Array<string> = ["voicemove [channelId]"];

    constructor(client: Client, args: Array<string>, message: Message) {
        this._client = client;
        this._args = args;
        this._message = message;
    }

    public async run() {
        if (this._args.length === 0)
            return this._message.channel.send(
                `${Constants.PREFIX_FAILURE} Please provide the required paramenters!`
            );

        const channel = this._message.guild.channels.cache.get(this._args[0]);
        if (!channel)
            return this._message.channel.send(
                `${Constants.PREFIX_FAILURE} Channel not found!`
            );

        const targetChannel = channel as VoiceChannel;
        const currentChannel = this._message.member.voice.channel;

        if (!currentChannel)
            return this._message.channel.send(
                `${Constants.PREFIX_FAILURE} Please join a voice channel first!`
            );

        if (targetChannel.id === currentChannel.id)
            return this._message.channel.send(
                `${Constants.PREFIX_FAILURE} You are already in this voice channel!`
            );
        let memberCount = 0;
        for (let member of currentChannel.members.values()) {
            memberCount++;
            member.voice.setChannel(targetChannel);
        }

        this._message.channel.send(
            `${Constants.PREFIX_SUCCESS} Successfully moved **${memberCount}** people to <#${targetChannel.id}>!`
        );
    }
}
