const { parentPort } = require('worker_threads');

parentPort.on('message', message => {
  console.log('Starting thread');
  let i = 0;

  while (i < 100000) {
    let j = 0;

    while (j < 100000) {
      j++;
    }

    i++;
  }

  console.log('Ending thread');

  message.port.postMessage('Done');
  message.port.close();
});
