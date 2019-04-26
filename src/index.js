var http = require('http');

const { Worker, isMainThread, MessageChannel } = require('worker_threads');

//create a server object:
http
  .createServer(function(_req, res) {
    if (isMainThread) {
      const worker = new Worker(`${__dirname}/worker.js`);
      const channel = new MessageChannel();

      channel.port2.on('message', message => console.log(message));
      worker.postMessage({ port1: channel.port1 }, [channel.port1]);
    }

    // console.log('Starting');

    // let i = 0;

    // while (i < 100000) {
    //   let j = 0;
    //   while (j < 100000) {
    //     j++;
    //   }
    //   i++;
    // }
    // console.log('Ending');

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify({ message: 'Hello, world!' }));
    console.log('Sending response');

    res.end(); //end the response
  })
  .listen(8080, () => {
    console.log('Server started');
  }); //the server object listens on port 8080
