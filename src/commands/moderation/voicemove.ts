import { Client, Message, Permissions, VoiceChannel } from "discord.js";
import { Constants } from "../../utils/";
import Command from "../Command";

export default class VoiceMove implements Command {
    public requiredPermission: number = Permissions.FLAGS.MOVE_MEMBERS;
    public _name: string = "voicemove";
    public _category: string = "moderation";
    public _help: string = "Moves all users to the specified voice channel";
    public _example: Array<string> = ["voicemove [channelId]"];

    public async run(client: Client, args: Array<string>, message: Message) {
        if (args.length === 0)
            return message.channel.send(
                `${Constants.PREFIX_FAILURE} Please provide the required paramenters!`
            );

        const channel = message.guild.channels.cache.get(args[0]);
        if (!channel)
            return message.channel.send(
                `${Constants.PREFIX_FAILURE} Channel not found!`
            );

        const targetChannel = channel as VoiceChannel;
        const currentChannel = message.member.voice.channel;

        if (!currentChannel)
            return message.channel.send(
                `${Constants.PREFIX_FAILURE} Please join a voice channel first!`
            );

        if (targetChannel.id === currentChannel.id)
            return message.channel.send(
                `${Constants.PREFIX_FAILURE} You are already in this voice channel!`
            );
        let memberCount = 0;
        for (let member of currentChannel.members.values()) {
            memberCount++;
            member.voice.setChannel(targetChannel);
        }

        message.channel.send(
            `${Constants.PREFIX_SUCCESS} Successfully moved **${memberCount}** people to <#${targetChannel.id}>!`
        );
    }
}
