map = ['fuyuki', 'orleans', 'rome', 'okeanos', 'london', 'america', 'camelot', 'babylonia'];
mapList = map.map(m => {return m.charAt(0).toUpperCase() + m.slice(1); }).join(' | ');
exports.help = "map <map name> :: Get the map of certain stage. Omit <map name> to get list of all maps\n\nMaps images are screenshots from Cirnopedia";
exports.exec = (client, message, msgArray, callback) => {
  if (msgArray.length > 1) {
    item = msgArray.slice(1).join(' ').toLowerCase();
    if (map.includes(item)) {
      message.channel.send('Map for ' + item.charAt(0).toUpperCase() + item.slice(1) + ':', {file: {attachment: 'https://raw.githubusercontent.com/aister/nobuDB/master/images/map/' + map.indexOf(item) + '.png', name: item + '.png'}});
    } else {
      message.channel.send('List of all available maps:\n' + mapList);
    }
  } else {
    message.channel.send('List of all available maps:\n' + mapList);
  }
}