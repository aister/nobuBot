var Canvas = require('canvas');
var request = require('request');
exports.help = "servant-card <args> :: Generate an FGO Servant Card with the provided arguments\n\nArguments:\nname: Servant's name | class: Servant's class | icon: Servant's icon | rarity: Servant's rarity | HP: Servant's HP | ATK: Servant's ATK\n\nAttach a photo for the servant's image";
let cooldown = {};
exports.exec = (bot, message, msgArray, callback) => {
  if (message.attachments.first()) msgArg = message.attachments.first().url;
  else msgArg = "http://i.imgur.com/b00ZHMN.png";
  message.channel.send("Converting, please wait...", {file: {attachment: msgArg, name: "image.png"}}).then(m => {
    msgArg = m.attachments.first().url;
    request({url: msgArg, encoding: null}, function (err, res, body) {
      //Canvas.registerFont('honoka.ttf', {family: 'FGO'});
      const height = 850;

      const icon_pos = {
        "saber":     [ 213, 753 ],
        "archer":    [ 211, 753 ],
        "lancer":    [ 213, 753 ],
        "caster":    [ 215, 753 ],
        "assassin":  [ 213, 751 ],
        "rider":     [ 215, 754 ],
        "berserker": [ 213, 751 ],
        "ruler":     [ 213, 753 ],
        "shielder":  [ 213, 750 ],
        "avenger":   [ 213, 752 ],
        "all":       [ 213, 752 ]
      }
      let canvas = new Canvas(500, height);
      let ctx = canvas.getContext('2d');

      let Hero_icon, Hero_name, Hero_class, Hero_rarity, HP, ATK;
      if (msgArray.length == 1) {
        Hero_name = "Test";
      } else {
        msgArg = msgArray.slice(1).join(' ');
        msgArg.replace(/ ?\| ?/g, '|').split('|').forEach(item => {
          if (item.startsWith('name:')) Hero_name = item.slice(5).trim();
          else if (item.startsWith('icon:')) Hero_icon = item.slice(5).trim().toLowerCase();
          else if (item.startsWith('class:')) Hero_class = item.slice(6).trim();
          else if (item.startsWith('rarity:')) Hero_rarity = item.slice(7).trim();
          else if (item.startsWith('HP:')) HP = item.slice(3).trim();
          else if (item.startsWith('ATK:')) ATK = item.slice(4).trim();
          
        });
      }
      if (!Hero_icon || !icon_pos[Hero_icon]) Hero_icon = "ruler";
      Hero_rarity = Hero_rarity || 5;
      if (Hero_rarity > 5) Hero_rarity = 5;
      else if (Hero_rarity < 1) Hero_rarity = 1;
      Hero_class = Hero_class || Hero_icon;
      Hero_name = Hero_name || "Test";
      ATK = ATK || "0";
      HP = HP || "0";

      if (Hero_rarity > 3) msgArg = Hero_icon + "3";
      else if (Hero_rarity < 3) msgArg = Hero_icon + "1";
      else msgArg = Hero_icon + "2";

      const img_logo = new Canvas.Image();
      const img_bg = new Canvas.Image();
      const img_frame = new Canvas.Image();
      img_bg.onerror = function (err) { console.log(err); }
      img_frame.onerror = function (err) { console.log(err); }
      img_logo.onerror = function (err) { console.log(err); }
      img_bg.onload = function () {
        ctx.drawImage(img_bg,0, 0, 500, 730);
        request({url: "https://aister.github.io/FGO/img/fgo/S" + Hero_rarity + ".png", encoding: null}, function (err, res, body) {
          img_frame.onload = function () {
            ctx.drawImage(img_frame,0, 0, 500, height);
            console.log(msgArg);
            request({url: "https://aister.github.io/FGO/img/fgo/" + msgArg + ".png", encoding: null}, function (err, res, body) {
              img_logo.onload = function() {
                ctx.drawImage(img_logo,...icon_pos[Hero_icon],76,76);
                Hero_class = Hero_class.slice(0, 1).toUpperCase() + Hero_class.slice(1);
                let y = [727, 732, 753, 830];

                ctx.textAlign = "center";
                ctx.font = "50px Georgia";
                ctx.lineWidth = 4;
                ctx.strokeStyle = "black";
                ctx.strokeText(Hero_class,250,y[0]);
                ctx.fillStyle = "white";
                ctx.fillText(Hero_class,250,y[0]);
                
                ctx.font = "22px Georgia";
                ctx.strokeStyle = "black";
                ctx.lineWidth = 3;
                ctx.strokeText(Hero_name,250,y[2]);
                ctx.fillStyle = "white";
                ctx.fillText(Hero_name,250,y[2]);
                
                ctx.font = "bold 50px Times";
                ctx.strokeStyle = "black";
                ctx.strokeText(ATK,130,y[3]);
                let my_gradient = ctx.createLinearGradient(0,y[3] - 50 ,0,y[3]);
                /*if (!CE && !document.getElementById('gold').checked) {
                  my_gradient.addColorStop(0.5,"#ffeb04");
                  my_gradient.addColorStop(0.6,"#b1a300");
                  my_gradient.addColorStop(1,"#ffeb04");

                } else {*/
                  my_gradient.addColorStop(0.5,"white");
                  my_gradient.addColorStop(0.6,"#8f8f8f");
                  my_gradient.addColorStop(1,"white");
                //}
                ctx.fillStyle = my_gradient;
                ctx.fillText(ATK,130,y[3]);
                
                ctx.strokeStyle = "black";
                ctx.strokeText(HP,370,y[3]);
                ctx.fillStyle = my_gradient;
                ctx.fillText(HP,370,y[3]);


                m.delete();
                message.channel.send("", {file: {attachment: canvas.toBuffer()}});
              };
              img_logo.src = body;
            });
          };
          img_frame.src = body;
        })
      };
      img_bg.src = body;
    });
  });
}