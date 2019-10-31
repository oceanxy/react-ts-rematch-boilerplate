/**
 * websocket测试的服务：ws包参考 https://github.com/websockets/ws
 */

const websocketServer = require('ws').Server;
const ws = new websocketServer({port: 3002, pathname: '/test'});

console.log('websocket服务已启动');

ws.on('connection', (ws) => {
  console.log('客户端已连接');

  // 接收到客户端的消息
  ws.on('message', (message) => {
    console.log(message);
  });

  // 循环向客户端发送自增的数字
  let n = 0;
  const interval = setInterval(() => {
    if (ws.readyState === 1) {
      n++;
      ws.send(JSON.stringify(n));
      console.log('已发送数据：' + n);
    }
  }, 1000);

  // 清除定时器
  ws.on('close', () => {
    console.log('客户端已断开');
    clearInterval(interval);
  });
});
