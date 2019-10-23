export interface IFetchAPIs {
  [fetchApiName: string]: IFetchAPI;
}

export enum EMethod {
  POST = 'POST',
  GET = 'GET'
}

export interface IFetchAPI {
  url: string; // 请求后台接口的地址
  forceMock?: boolean; // 强制开启mock（当全局mock设置为false的时候，如果此配置为true，则该接口得请求依旧会被mockjs拦截）
  method?: EMethod; // 请求接口方式
  isWebsocket?: boolean; // 是否是websocket长链接

  [otherConfig: string]: any;
}

const apis: IFetchAPIs = {
  fetchTest: {
    url: '/test',
    forceMock: false
  },
  fetchTest2: {
    url: '/test2'
  }
};

export default apis;
