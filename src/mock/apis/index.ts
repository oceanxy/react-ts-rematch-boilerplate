export interface IFetchAPINames {
  [fetchApiName: string]: IFetchAPI;
}

export interface IFetchAPIs extends IFetchAPINames {
  fetchTest: IFetchAPI;
  fetchTestWebsocket: IFetchAPI;
  deleteData: IFetchAPI;
}

export enum EMethod {
  POST = 'POST',
  GET = 'GET'
}

export interface IFetchAPI {
  url: string; // 请求后台接口的地址
  forceMock?: boolean; // 强制开启mock（当全局mock设置为false的时候，如果此配置为true，则该接口的请求依旧会被mockjs拦截）
  method?: EMethod; // 请求接口方式
  isWebsocket?: boolean; // 是否是websocket长链接，websocket不支持mock

  [otherConfig: string]: any;
}

const apis: IFetchAPIs = {
  fetchTest: {
    url: '/test',
    forceMock: true
  },
  fetchTestWebsocket: {
    // url: '/testWebSocket',
    // url: 'ws://121.40.165.18:8800',
    url: 'ws://localhost:3002/test',
    isWebsocket: true // 如果是websocket长链接且url字段不是完整的websocket地址请务必设置为true
  },
  deleteData: {
    url: '/testDelete'
  }
};

export default apis;
