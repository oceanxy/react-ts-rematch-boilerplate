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

  // 发送服务器时间给客户端
  const interval = setInterval(() => {
    if (ws.readyState === 1) {
      const date = new Date();
      ws.send(JSON.stringify(
        date.getFullYear() + '-' +
        (date.getMonth() + 1) + '-' +
        date.getDate() + ' ' +
        date.getHours() + ':' +
        date.getMinutes() + ':' +
        date.getSeconds() + ' ' +
        '星期' +
        ['日', '一', '二', '三', '四', '五', '六'][date.getDay()]
      ));
    }
  }, 1000);

  // 清除定时器
  ws.on('close', () => {
    console.log('客户端已断开');
    clearInterval(interval);
  });
});
