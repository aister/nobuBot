module.exports = class Command {
  constructor(data) {
    this.info = {
      name: data.info.name,
      category: data.info.category || "Uncategorized",
      args: data.info.args || [],
      devOnly: data.info.devOnly || false,
      desc: data.info.help || 'No help text given'
    }
    this.info.help = `${data.info.name} ${this.info.args.map(item => {return `<${item.name}>`;}).join(' ')}`
    if (data.info.nsfw) this.info.desc += `\n\nThis command is only usable in NFSW-enabled channels`;
    if (this.info.args.length) this.info.help += `\n\n${this.info.args.map(item => {return `**__${item.name}__**: ${item.desc}`}).join('\n\n')}`;
    this.info.help = {
      title: `Info for command ${this.info.name}`,
      description: '\u200b\n',
      fields: [
        {
          name: "Category",
          value: this.info.category
        },
        {
          name: "Command Format",
          value: this.info.help
        },
        {
          name: "Description",
          value: this.info.desc
        }
      ]
    }
    this.run = data.run;
  }
}