/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 监控调度model
 * @Date: 2020-04-24 周五 14:07:50
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-19 周二 13:43:51
 */

import fetchApis from '@/apis';
import { LogType } from '@/models/UI/log';
import { store } from '@/store';
import { message } from 'antd';

/**
 * 呼叫模式
 */
export enum CallModeEnum {
  /**
   * 无模式
   * @type {number}
   */
  NULL = -1,
  /**
   * 个呼模式
   * @type {number}
   */
  INDIVIDUAL_CALL_MODE = 0,
  /**
   * 组呼模式
   * @type {number}
   */
  GROUP_CALL_MODE = 1,
  /**
   * 双工模式
   * @type {number}
   */
  DUPLEX_CALL_MODE = 2,
  /**
   * 全呼模式
   * @type {number}
   */
  FULL_CALL_MODE = 3
}

/**
 * 用户ID类型
 */
export enum UserIDTypeEnum {
  /**
   * 用户ID
   * @type {number}
   */
  USER_ID_TYPE_ID = 101,
  /**
   * 用户个呼号码
   * @type {number}
   */
  USER_ID_TYPE_NUMBER = 102
}

/**
 * 控制监控对象
 * 控制命令 0：遥晕 1：遥醒 2：遥毙
 */
export enum ControlCmd {
  BAN = 0,
  LIFT_BAN = 1
}

/**
 * 群组ID类型
 */
export enum GroupIDTypeEnum {
  /**
   * 物理组旋钮号
   * @type {number}
   */
  GROUP_ID_TYPE_KNOB = 1,
  /**
   * 群组ID
   * @type {number}
   */
  GROUP_ID_TYPE_ID = 2,
  /**
   * 群组号码
   * @type {number}
   */
  GROUP_ID_TYPE_NUMBER = 3
}

/**
 * 主呼开始响应结果
 */
export enum CallingStartResultEnum {
  /**
   * 主呼呼叫成功
   * @type {number}
   */
  CALLING_START_SUCCESS = 0,
  /**
   * 呼叫对象不在线
   * @type {number}
   */
  CALLING_START_FAILURE_4_TARGET_NOT_ONLINE = 1,
  /**
   * 内部状态错误，比如网络故障，正在进行其它呼叫等
   * @type {number}
   */
  CALLING_START_FAILURE_4_STATUS_ERROR = 2,
  /**
   * 呼叫模式错误
   * @type {number}
   */
  CALLING_START_FAILURE_4_CALL_MODE_ERROR = 4,
  /**
   * 呼叫优先级低，无法抢占呼叫
   * @type {number}
   */
  CALLING_START_FAILURE_4_PRIORITY_LOW = 6,
  /**
   * 用户被遥晕
   * @type {number}
   */
  CALLING_START_FAILURE_4_NOT_PERMIT_CALLING = 7,
  /**
   * 群组号码错误
   * @type {number}
   */
  CALLING_START_FAILURE_4_GROUP_NUMBER_ERROR = 8,
  /**
   * 呼叫对象正在忙
   * @type {number}
   */
  CALLING_START_FAILURE_4_TARGET_ON_CALLING = 9,
  /**
   * 呼叫对象不存在
   * @type {number}
   */
  CALLING_START_FAILURE_4_TARGET_NOT_EXIST = 10,
  /**
   * 目前不支持全呼呼叫
   * @type {number}
   */
  CALLING_START_FAILURE_4_NOT_SUPPORT_FULL_CALL = 11,
  /**
   * 双工呼叫，对方拒绝
   * @type {number}
   */
  CALLING_START_FAILURE_4_DUPLEX_TARGET_REJECT = 12,
  /**
   * 双工主叫，寻呼链路建立失败
   * @type {number}
   */
  CALLING_START_FAILURE_4_WAIT_DUPLEX_RING_TIMEOUT = 13,
  /**
   * 双工呼叫，对方无应答
   * @type {number}
   */
  CALLING_START_FAILURE_4_WAIT_DUPLEX_RSP_TIMEOUT = 14,
  /**
   * 双工呼叫，对方无法呼通
   * @type {number}
   */
  CALLING_START_FAILURE_4_TARGET_NO_ANSWER = 15,
  /**
   * 群组ID错误
   * @type {number}
   */
  CALLING_START_FAILURE_4_GROUP_ID_ERROR = 16,
  /**
   * 网络故障
   * @type {number}
   */
  CALLING_START_FAILURE_4_NO_ACTIVE_NETWORK = 18,
  /**
   * 未知错误
   * @type {number}
   */
  CALLING_START_FAILURE_4_UNKNOWN = 255
}

/**
 * 主呼停止原因
 */
export enum CallingStopCauseEnum {
  /**
   * 正常原因呼叫停止
   * @type {number}
   */
  CALLING_STOP_CAUSE_NORMAL = 0,
  /**
   * 呼叫超时
   * @type {number}
   */
  CALLING_STOP_CAUSE_TIMEROUT = 1,
  /**
   * Web管理操作导致呼叫停止
   * @type {number}
   */
  CALLING_STOP_CAUSE_OM = 2,
  /**
   * 切换群组导致呼叫停止
   * @type {number}
   */
  CALLING_STOP_CAUSE_CHANGE_GROUP = 3,
  /**
   * 呼叫被抢占
   * @type {number}
   */
  CALLING_STOP_CAUSE_CALL_PREEPTION = 4,
  /**
   * 用户被调度到临时组导致呼叫停止
   * @type {number}
   */
  CALLING_STOP_CAUSE_SCHEDULE = 5,
  /**
   * 遥晕或者遥毙导致呼叫停止
   * @type {number}
   */
  CALLING_STOP_REMOTE_CONTROL = 6,
  /**
   * 创建会议导致呼叫停止
   * @type {number}
   */
  CALLING_STOP_CREATE_MEETING = 7,
  /**
   * 未知原因
   * @type {number}
   */
  CALLING_STOP_CAUSE_UNKNOW = 255
}

/**
 * 被叫终止原因
 */
export enum CalledStopCauseEnum {
  /**
   * 正常原因呼叫停止
   * @type {number}
   */
  CALLED_STOP_CAUSE_NORMAL = 0,
  /**
   * 呼叫超时
   * @type {number}
   */
  CALLED_STOP_CAUSE_TIMEOUT = 1
}

/**
 * 登录响应结果
 */
export enum LoginResultEnum {
  /**
   * 登录成功
   * @type {number}
   */
  LOGIN_RESULT_SUCCESS = 0,
  /**
   * 网络故障
   * @type {number}
   */
  LOGIN_RESULT_FAILURE_4_NETWORK = 1,
  /**
   * 用户不存在
   * @type {number}
   */
  LOGIN_RESULT_FAILURE_4_USER_NOT_EXIST = 2,
  /**
   * 密码错误
   * @type {number}
   */
  LOGIN_RESULT_FAILURE_4_PASSWORD_ERROR = 3,
  /**
   * 内部状态错误，如果连续多次调用登陆接口就可能返回此错误
   * @type {number}
   */
  LOGIN_RESULT_FAILURE_4_STATUS_ERROR = 7,
  /**
   * 用户被遥毙
   * @type {number}
   */
  LOGIN_RESULT_FAILURE_4_REMOTE_DIE = 8,
  /**
   * 用户被禁用
   * @type {number}
   */
  LOGIN_RESULT_FAILURE_4_DEVICE_DISABLED = 9,
  /**
   * 用户所属客户被禁用
   * @type {number}
   */
  LOGIN_RESULT_FAILURE_4_CUSTOMER_DISABLED = 10,
  /**
   * 用户所属客户欠费
   * @type {number}
   */
  LOGIN_RESULT_FAILURE_4_CUSTOMER_ARREARS = 11,
  /**
   * 未知错误
   * @type {number}
   */
  LOGIN_RESULT_FAILURE_4_UNKNOWN = 255
}

const monitoringDispatch: IMonitoringDispatchModel = {
  state: {
    hjMediaEngine: null,
    callModeEnum: CallModeEnum.NULL,
    loginResponseStatus: false,
    config: undefined
  },
  reducers: {
    updateState(state: IMonitoringDispatchState, payload: Partial<IMonitoringDispatchState>): IMonitoringDispatchState {
      return {
        ...state,
        ...payload
      };
    }
  },
  effects: {
    async fetchData() {
      const response = await fetchApis.fetchDispatchServer();

      if (+response.retCode === 0) {
        const config = response.data;
        store.dispatch.monitoringDispatch.updateState({config});
        store.dispatch.monitoringDispatch.fetchMediaServiceEngine(config);
      } else {
        // 后续修改成自动登录
        message.error('登录对讲服务失败，请刷新页面重试！');
      }
    },
    setState(payload: Partial<IMonitoringDispatchState>): void {
      store.dispatch.monitoringDispatch.updateState(payload);
    },
    fetchMediaServiceEngine(config): void {
      // 登录第三方调度服务
      const mediaGlobalConfig: CreateEngineRequest = {
        audioEngine: true,
        videoEngine: false,
        attribute: config.attributes,
        loginName: config.name,
        password: '000000',
        serverIP: config.audioServerIP,
        serverPort: config.dispatchServicePort
      };
      const {
        onLoginResponse, onLogout, onTempGroupList, onCallingStartResponse, onCallingStop,
        onCreateTempGroupResponse, onTempGroupUpdate, onAddTempGroupMemberResponse,
        updateState, login, onDuplexCallingRing
      } = store.dispatch.monitoringDispatch;

      // 创建第三方调度服务引擎
      const hjMediaEngine = hjMediaService.createEngine(mediaGlobalConfig);
      // ================================= 注册事件 =======================================
      hjMediaEngine.audioEngine.onLoginResponse = onLoginResponse;
      hjMediaEngine.audioEngine.onLogout = onLogout;
      hjMediaEngine.audioEngine.onTempGroupList = onTempGroupList;
      hjMediaEngine.audioEngine.onDuplexCallingRing = onDuplexCallingRing;
      hjMediaEngine.audioEngine.onCallingStartResponse = onCallingStartResponse;
      hjMediaEngine.audioEngine.onCallingStop = onCallingStop;
      hjMediaEngine.audioEngine.onCreateTempGroupResponse = onCreateTempGroupResponse;
      hjMediaEngine.audioEngine.onTempGroupUpdate = onTempGroupUpdate;
      hjMediaEngine.audioEngine.onAddTempGroupMemberResponse = onAddTempGroupMemberResponse;

      // TODO 加一个电话接通事件

      // ==================================================================================

      // 更新服务引擎的状态
      updateState({hjMediaEngine});
      // 登录第三方调度服务
      login();
    },
    login(): void {
      const {hjMediaEngine} = store.getState().monitoringDispatch;

      if (hjMediaEngine) {
        // 调度服务登录
        hjMediaEngine.audioEngine.login();
      }
    },
    onLoginResponse(response) {
      if (response.result === LoginResultEnum.LOGIN_RESULT_SUCCESS) {
        // 设置登录状态
        store.dispatch.monitoringDispatch.updateState({loginResponseStatus: true});
      }
    },
    onLogout(): void {
      store.dispatch.monitoringDispatch.updateState({loginResponseStatus: false});
      message.info('第三方调度服务已退出');
    },
    startCalling(request: StartCallingRequest): void {
      const {hjMediaEngine} = store.getState().monitoringDispatch;

      if (hjMediaEngine) {
        hjMediaEngine.audioEngine.startCalling(request);
      } else {
        message.error('第三方对讲服务未启动！');
      }
    },
    stopCalling(): void {
      const {hjMediaEngine, loginResponseStatus} = store.getState().monitoringDispatch;

      if (hjMediaEngine && loginResponseStatus) {
        hjMediaEngine.audioEngine.stopCalling();
      } else {
        message.error('第三方对讲服务已断开！');
      }
    },
    joinGroup(request: JoinOrExitGroupRequest) {
      const {hjMediaEngine, loginResponseStatus} = store.getState().monitoringDispatch;

      if (hjMediaEngine && loginResponseStatus) {
        hjMediaEngine.audioEngine.joinGroup(request);
      } else {
        message.error('第三方对讲服务未启动！');
      }
    },
    exitGroup(request): void {
      const {hjMediaEngine} = store.getState().monitoringDispatch;

      if (hjMediaEngine) {
        hjMediaEngine.audioEngine.exitGroup(request);
      } else {
        message.error('第三方对讲服务未启动！');
      }
    },
    removeGroupMember(request: RemoveGroupMemberRequest): void {
      const {hjMediaEngine} = store.getState().monitoringDispatch;

      if (hjMediaEngine) {
        hjMediaEngine.audioEngine.removeGroupMember(request);
      } else {
        message.error('第三方对讲服务未启动！');
      }
    },
    removeTempGroupMember(request: RemoveTempGroupMemberRequest): void {
      const {hjMediaEngine} = store.getState().monitoringDispatch;

      if (hjMediaEngine) {
        hjMediaEngine.audioEngine.removeTempGroupMember(request);
      } else {
        message.error('第三方对讲服务未启动！');
      }
    },
    addTempGroupMember(memberIds: number[]): void {
      const {
        monitoringDispatch: {hjMediaEngine},
        intercomGroupName: {intercomId}
      } = store.getState();

      if (hjMediaEngine) {
        hjMediaEngine.audioEngine.addTempGroupMember({
          tempGroupId: intercomId,
          tempGroupMemberMsIdList: memberIds
        });
      } else {
        message.error('第三方对讲服务未启动！');
      }
    },
    createTempGroup(request: CreateTempGroupRequest): void {
      const {hjMediaEngine, loginResponseStatus} = store.getState().monitoringDispatch;

      if (hjMediaEngine && loginResponseStatus) {
        hjMediaEngine.audioEngine.createTempGroup(request);
      } else {
        message.error('第三方对讲服务未启动！');
      }
    },
    async onCreateTempGroupResponse(response) {
      // 关闭创建临时组loading状态以及关闭创建临时组对话框
      store.dispatch.temporaryGroup.setState({loading: false, isShowEditModal: false});

      if (response.result === 0) {
        // 获取所有成员ID
        const ids = response.addGroupMemberResult.reduce((ids, member) => {
          if (member.result === 0) {
            ids.push(member.groupMemberMsId);
          }

          return ids;
        }, <number[]> []);

        // 维护平台后台临时组数据
        const res = await fetchApis.createTemporaryGroup(<ICreateTemporaryGroupRequest> {
          temporaryGroup: response.tempGroupName,
          intercomGroupId: response.tempGroupId,
          userIds: ids
        });

        message.destroy();
        if (Number(res.retCode) === 0) {
          // 成功创建临时组后，刷新临时组数据
          store.dispatch.temporaryGroup.fetchData();

          message.success('创建临时组成功！');
        } else {
          message.warning('创建临时组失败，请稍候再试！');
        }
      } else {
        message.warning('创建临时组失败，请稍候再试！');
      }
    },
    deleteTempGroup(tempGroupId: number): void {
      const {hjMediaEngine, loginResponseStatus} = store.getState().monitoringDispatch;

      if (hjMediaEngine && loginResponseStatus) {
        hjMediaEngine.audioEngine.deleteTempGroup({tempGroupId});
      } else {
        message.error('第三方对讲服务未启动！');
      }
    },
    remoteControlMs(request: RemoteControlMsRequest): void {
      const {hjMediaEngine} = store.getState().monitoringDispatch;

      if (hjMediaEngine) {
        hjMediaEngine.audioEngine.remoteControlMs(request);

        // 记录日志
        store.dispatch.log.addLog({
          type: request.controlCmd === ControlCmd.BAN ?
            LogType.Ban :
            LogType.LiftBan,
          id: store.getState().intercomGroupName.id
        });
      } else {
        message.error('第三方对讲服务未启动！');
      }
    },
    onTempGroupList(response): void {
      // TODO 更新临时组数据
    },
    onDuplexCallingRing(response: DuplexCallingRingResponse) {
      store.dispatch.intercomOperation.onDuplexCallingRing(response);
    },
    onCallingStartResponse(response): void {
      store.dispatch.intercomOperation.onCallingStartResponse(response);
    },
    onCallingStop(response): void {
      // TODO 主呼停止事件处理（非主动停止主呼时）
    },
    onTempGroupUpdate(response): void {
      // TODO 临时组更新
    },
    async onAddTempGroupMemberResponse(response) {
      // 关闭loading状态以及关闭对话框
      store.dispatch.temporaryGroup.setState({loading: false, isShowEditModal: false});

      if (response.addGroupMemberResult?.length) {
        // 获取所有成员ID
        const ids = response.addGroupMemberResult.reduce((ids, member) => {
          if (member.result === 0) {
            ids.push(member.groupMemberMsId);
          }

          return ids;
        }, <number[]> []);

        // 维护平台后台临时组数据
        const res = await store.dispatch.intercomMembers.addMember(ids);

        message.destroy();
        if (Number(res.retCode) === 0) {
          // 成功创建临时组后，刷新临时组数据
          store.dispatch.temporaryGroup.fetchData();

          // 添加日志
          await store.dispatch.log.addLog({
            type: LogType.AddIntercomGroup,
            id: store.getState().intercomGroupName.id
          });
          message.success('添加成功！');
        } else {
          message.warning('添加失败失败，请稍候再试！');
        }
      } else {
        message.warning('添加失败，请稍候再试！');
      }
    }
  }
};

export default monitoringDispatch;
