/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 操作对讲model
 * @Date: 2020-04-21 周二 11:14:41
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-04-21 周二 11:14:41
 */

const operation: IIntercomOperationModel = {
  state: {},
  reducers: {},
  effects: {
    async intercomGroupCall() {
      // TODO 对接第三方组呼接口
      console.log('调用第三方组呼接口');
    }
  }
};

export default operation;
