module.exports = class Command {
  constructor(main, data) {
    this.main = main;
    this.name = data.name;
    this.category = data.category || "Uncategorized";
    this.alias = data.alias || [];
    this.args = data.args || [];
    this.devOnly = data.devOnly || false;
    this.desc = data.help || 'No help text given';
    if (data.nsfw) this.desc += `\n\nThis command is only usable in NFSW-enabled channels`;
    this.help = `${this.name} ${this.args.map(item => {return `<${item.name}>`;}).join(data.argsSep || ' ')}`;
    if (this.args.length) this.help += `\n\n${this.args.map(item => {return `**__${item.name}__**: ${item.desc}`}).join('\n\n')}`;
    this.help = {
      title: `Info for command ${this.name}`,
      description: '\u200b\n',
      fields: [
        {
          name: "Category",
          value: this.category
        },
        {
          name: "Command Format",
          value: this.help
        },
        {
          name: "Alias",
          value: this.alias.join(' | ') || "None"
        },
        {
          name: "Description",
          value: this.desc
        }
      ]
    }
    this.timeUsed = 0;
    this.caseSensitive = data.caseSensitive || false;
    this.cleanContent = data.cleanContent || false;
  }
}