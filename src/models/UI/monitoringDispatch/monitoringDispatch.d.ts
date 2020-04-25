/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 监控调度类型定义
 * @Date: 2020-04-24 周五 13:42:22
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-25 周六 14:18:50
 */

import { CallModeEnum, UserIDTypeEnum } from '@/models/UI/monitoringDispatch/index';
import { ModelConfig } from '@rematch/core';

declare global {
  interface IMonitoringDispatchConfig {
    /**
     * 是否支持视频会议
     */
    isSupportVideoConferece: boolean,
    /**
     * 是否支持视频电话
     */
    isSupportVideoCall: boolean,
    /**
     * 是否支持语音会议
     */
    isSupportAudioConferece: boolean,
    /**
     * 是否支持发送文本
     */
    isSupportMessageText: boolean,
    /**
     * 对讲服务器地址
     */
    audioServerIP: string,
    /**
     * 是否支持语音留言
     */
    isSupportRTAudioMessage: boolean,
    /**
     * 对讲平台调度服务端口
     */
    dispatchServicePort: string,
    /**
     * 是否拥有禁言角色 true:有; false:没有
     */
    isOwnPreventSpeechRole: boolean,
    /**
     * 用户拥有的临时组id集合
     */
    userOwnTempAssignmentIntercomGroupIdList: [],
    /**
     * 对讲服务器端口
     */
    audioServerPort: number,
    /**
     * 会话ID
     */
    pid: string,
    /**
     * 是否支持实时视频上传
     */
    isSupportVideoFunc: boolean,
    /**
     * 对讲平台通知服务端口
     */
    eventServicePort: number,
    /**
     * 是否支持发送图片
     */
    isSupportMessageImage: boolean,
    /**
     * 是否支持电子围栏
     */
    isSupportFenceEnable: boolean,
    /**
     * 客户ID
     */
    custId: number,
    /**
     * 当前账号名称
     */
    name: string,
    /**
     * 是否支持语音对讲
     */
    isSupportAudio: boolean,
    /**
     * 账号类型 1:I类账号 2:II类账号 3.III类账号
     */
    attributes: CreateEngineRequest['attribute'],
    /**
     * 是否支持视频功能
     */
    isSupportVideo: boolean,
    /**
     * 是否支持传感
     */
    isSupportSensor: boolean,
    /**
     * 当前账号ID
     */
    id: number,
    /**
     * 是否支持GIS
     */
    isSupportGis: boolean,
    /**
     * 是否支持巡更
     */
    isSupportPatrolEnable: boolean
  }

  /**
   * 监控调度状态
   */
  interface IMonitoringDispatchState {
    /**
     * 第三方调度服务引擎
     */
    hjMediaEngine: HiJoyEventEngine | null,
    /**
     * 当前呼叫模式
     */
    callModeEnum: CallModeEnum,
    /**
     * 登录响应状态
     */
    loginResponseStatus: boolean,
    /**
     * 第三方调度登录接口需要的配置参数
     */
    config: IMonitoringDispatchConfig
  }

  /**
   * 监控调度model
   */
  interface IMonitoringDispatchModel extends ModelConfig {
    state: IMonitoringDispatchState
    reducers: {
      /**
       * 更新本地状态
       * @param {IMonitoringDispatchState} state
       * @param {Partial<IMonitoringDispatchState>} payload
       * @returns {IMonitoringDispatchState}
       */
      updateState(state: IMonitoringDispatchState, payload: Partial<IMonitoringDispatchState>): IMonitoringDispatchState
    }
    effects: {
      fetchData(): void
      /**
       * 设置状态
       * @param {Partial<IMonitoringDispatchState>} payload
       */
      setState(payload: Partial<IMonitoringDispatchState>): void
      /**
       * 获取第三方调度服务引擎
       * @param {IMonitoringDispatchConfig} config
       */
      fetchMediaServiceEngine(config: IMonitoringDispatchConfig): void
      /**
       * 登录调度服务
       */
      login(): void
      /**
       * 登录响应事件
       * @param {LoginResponse} response
       */
      onLoginResponse(response: LoginResponse): void
      /**
       * 调度服务登出事件
       */
      onLogout(): void
      /**
       * 调度服务临时组列表事件
       * 在登陆成功后，对讲服务会推送临时组列表信息给用户
       */
      onTempGroupList(event: {tempGroupList: TemporaryGroup[]}): void
      /**
       * 主呼响应事件
       * 开始主呼会触发主呼开始响应事件；
       * 双工主呼在触发双工主叫响铃事件后，如果双工被叫接听，会触发主呼开始响应事件；
       */
      onCallingStartResponse(event: CallingStartResponse): void
      /**
       * 主呼停止事件
       */
      onCallingStop(event: CallingStopResponse): void
      /**
       * 创建临时组响应事件
       */
      onCreateTempGroupResponse(event: CreateTempGroupResponse): void
      /**
       * 临时组更新事件
       * 在其它用户创建或者删除临时组后，对讲服务会推送新的临时组信息
       */
      onTempGroupUpdate(event: TempGroupUpdateResponse): void
      /**
       * 添加临时组成员响应事件
       * @param {AddTempGroupMemberResponse} response
       */
      onAddTempGroupMemberResponse(response: AddTempGroupMemberResponse): void
    }
  }
}
