// run `node index.js` in the terminal

import { createServer } from 'node:http';
import * as url from 'node:url';
import * as undici from 'undici';

const httpProxyServer = createServer(async (req, resp) => {
  const reqUrl = url.parse(req.url);
  console.log('--------------', `[proxy to ${req.url}](http)`);
  const resp2 = await undici.fetch('https://swapi.dev/api/people/1/');
  const json = await resp2.text();
  console.log(json);
  // req.socket.write(json);
  // req.socket.end();
  resp.write(json); //write a response to the client
  resp.end(); //end the response
});

httpProxyServer.on('connect', async (req, clientSocket, head) => {
  console.log(`[proxy to ${req.url}]`);
});

httpProxyServer.on('close', () => {
  console.log('close');
});

httpProxyServer.listen(Number(3000), () => {
  console.log('Server runnig at http://localhost:' + 3000);
});
