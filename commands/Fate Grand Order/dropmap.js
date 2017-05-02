dropMap = {
  'fuyuki': 'http://vignette4.wikia.nocookie.net/fategrandorder/images/2/27/Fuyuki_Ascension_Item_Map.png',
  'orleans': 'http://vignette1.wikia.nocookie.net/fategrandorder/images/1/14/France_Ascension_Item_Map.png',
  'rome': 'http://vignette2.wikia.nocookie.net/fategrandorder/images/c/cf/Rome_Ascension_Item_Map.png',
  'okeanos': 'http://vignette2.wikia.nocookie.net/fategrandorder/images/6/6e/Okeanos_Ascension_Item_Map.png',
  'london': 'http://vignette1.wikia.nocookie.net/fategrandorder/images/b/b6/London_Ascension_Item_Map.png',
  'america': 'http://vignette3.wikia.nocookie.net/fategrandorder/images/a/af/E_Pluribus_Unum_Ascension_Map.jpg',
  'camelot': 'http://vignette3.wikia.nocookie.net/fategrandorder/images/a/a6/CamelotAscensionMap.png'
}
dropMapList = [];
for (m in dropMap) {
  dropMapList.push(m.charAt(0).toUpperCase() + m.slice(1));
}
dropMapList = dropMapList.join(' | ');
exports.help = "dropmap <map name> :: Get the drop map of certain stage. Omit <map name> to get list of all maps\n\nMaps images are screenshots from Cirnopedia";
exports.exec = (client, message, msgArray, callback) => {
  if (msgArray.length > 1) {
    item = msgArray.slice(1).join(' ');
    if (dropMap[item]) {
      message.channel.sendFile(dropMap[item], item + '.png', 'Drop Map for ' + item.charAt(0).toUpperCase() + item.slice(1) + ':');
    } else {
      message.channel.sendMessage('List of all available maps:\n' + dropMapList);
    }
  } else {
    message.channel.sendMessage('List of all available maps:\n' + dropMapList);
  }
}