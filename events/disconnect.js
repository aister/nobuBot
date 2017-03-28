exports.exec = (client) => {
  return (event) => {
    client.initTime = Date.now()
    console.log(event);
  };
}