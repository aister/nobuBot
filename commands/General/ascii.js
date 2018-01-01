const Command = require('../../main/command');

module.exports = class AsciiCommand extends Command {
  constructor(main) {
    super(main, {
      name: "ascii",
      category: "General",
      help: "Generate an ascii art of the text, looks best on computer and wide-screen devices",
      args: [
        {
          name: "Text",
          desc: "The text to transform into ascii art, must be letters and spaces only, case insensitive"
        }
      ]
    });
    this.ascii = {
      "a": ["   _   ","  /_\\  "," / _ \\ ","/_/ \\_\\"],
      "b": [" ___ ","| _ )", "| _ \\","|___/"],
      "c": ["  ___ "," / __|","| (__ "," \\___|"],
      "d": [" ___  ","|   \\ ","| |) |","|___/ "],
      "e": [" ___ ","| __|","| _| ","|___|"],
      "f": [" ___ ","| __|","| _| ","|_|  "],
      "g": ["  ___ "," / __|","| (_ |", " \\___|"],
      "h": [" _  _ ","| || |","| __ |","|_||_|"],
      "i": [" ___ ","|_ _|", " | | ","|___|"],
      "j": ["    _ "," _ | |","| || |"," \\__/ "],
      "k": [" _  __","| |/ /","| ' < ","|_|\\_\\"],
      "l": [" _    ","| |   ","| |__ ","|____|"],
      "m": [" __  __ ","|  \\/  |","| |\\/| |","|_|  |_|"],
      "n": [" _  _ ","| \\| |","| .` |","|_|\\_|"],
      "o": ["  ___  "," / _ \\ ","| (_) |"," \\___/ "],
      "p": [" ___ ","| _ \\","|  _/","|_|  "],
      "q": ["  ___  "," / _ \\ ","| (_) |"," \\__\\_\\"],
      "r": [" ___ ","| _ \\","|   /","|_|_\\"],
      "s": [" ___ ","/ __|","\\__ \\","|___/"],
      "t": [" _____ ","|_   _|","  | |  ","  |_|  "],
      "u": [" _   _ ","| | | |","| |_| |"," \\___/ "],
      "v": ["__   __","\\ \\ / /"," \\ V / ","  \\_/  "],
      "w": [" _    _ ","| |  | |","| |/\\| |","|__/\\__|"],
      "x": ["__  __","\\ \\/ /"," >  < ","/_/\\_\\"],
      "y": ["__   __","\\ \\ / /"," \\ V / ","  |_|  "],
      "z": [" ____","|_  /"," / / ","/___|"],
      " ": ["  ", "  ", "  ", "  "]
    };
  }
  run(message, args, prefix) {
    args = args.join(' ');
    if (args) {
      if (/^[a-z ]*$/.test(args) != false) {
        args = args.split("");
        let result = ["", "", "", ""];
        args.forEach(item => {
          result[0] += this.ascii[item][0];
          result[1] += this.ascii[item][1];
          result[2] += this.ascii[item][2];
          result[3] += this.ascii[item][3];
        });
        message.channel.send(`\`\`\`\n${result.join("\n")}\`\`\``);
      } else message.channel.sendMessage("Invalid character, please only use letters and spaces");
    } else message.channel.send(`No argument provided, please consult ${prefix}ascii for more information.`)
  }
}