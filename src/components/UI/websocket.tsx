/**
 * 参数：[socketOpen|socketClose|socketMessage|socketError] = func，[socket连接成功时触发|连接关闭|发送消息|连接错误]
 * timeout：连接超时时间
 */

export interface IWebSocket {
  [methods: string]: () => {}
}

export default class WebSocket {
  private readonly props: any;
  private socket: WebSocket & { [name in keyof IWebSocket]: () => void } | any;
  private reconnectCount: number;
  private taskRemindInterval: any;
  private isSuccess: boolean;
  private closeSocket: any;

  constructor(props: any = {}) {
    this.props = props;
    this.reconnectCount = 0;
    this.socket = null;
    this.taskRemindInterval = null;
    this.isSuccess = true;
  }

  connection = () => {
    let {socketUrl, timeout = 0} = this.props;

    this.socket = new WebSocket('ws://' + socketUrl);

    this.socket.onopen = this.onopen;
    this.socket.onmessage = this.onmessage;
    this.socket.onclose = this.onclose;
    this.socket.onerror = this.onerror;
    this.socket.sendMessage = this.sendMessage;
    this.socket.closeSocket = this.closeSocket;

    // 检测返回的状态码 如果socket.readyState不等于1则连接失败，关闭连接
    if (timeout) {
      let time = setTimeout(() => {
        if (this.socket && this.socket.readyState !== 1) {
          this.socket.close();
        }
        clearInterval(time);
      }, timeout);
    }
  };

  // 连接成功触发
  onopen = () => {
    let {socketOpen} = this.props;
    this.isSuccess = false;  //连接成功将标识符改为false
    socketOpen && socketOpen();
  };

  // 后端向前端推得数据
  onmessage = (msg: any) => {
    let {socketMessage} = this.props;
    socketMessage && socketMessage(msg);
    // 打印出后端推得数据
    console.log(msg);
  };

  // 关闭连接触发
  onclose = (e: any) => {
    this.isSuccess = true;   //关闭将标识符改为true
    console.log('关闭socket收到的数据');
    let {socketClose} = this.props;
    socketClose && socketClose(e);
    // 根据后端返回的状态码做操作
    // 我的项目是当前页面打开两个或者以上，就把当前以打开的socket关闭
    // 否则就20秒重连一次，直到重连成功为止
    if (e.code == '4500') {
      this.socket.close();
    } else {
      this.taskRemindInterval = setInterval(() => {
        if (this.isSuccess) {
          this.connection();
        } else {
          clearInterval(this.taskRemindInterval);
        }
      }, 20000);
    }
  };

  onerror = (e: any) => {
    // socket连接报错触发
    let {socketError} = this.props;
    this.socket = null;
    socketError && socketError(e);
  };

  sendMessage = (value: any) => {
    // 向后端发送数据
    if (this.socket) {
      this.socket.send(JSON.stringify(value));
    }
  };
}
