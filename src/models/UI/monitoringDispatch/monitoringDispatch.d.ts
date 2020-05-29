/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 监控调度类型定义
 * @Date: 2020-04-24 周五 13:42:22
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-05-21 周四 17:25:33
 */

import { EProtocal } from '@/interfaces/config';
import { CallModeEnum } from '@/models/UI/monitoringDispatch/index';
import { ModelConfig } from '@rematch/core';

declare global {
  interface IMonitoringDispatchConfig {
    /**
     * 是否支持视频会议
     */
    isSupportVideoConferece: boolean
    /**
     * 是否支持视频电话
     */
    isSupportVideoCall: boolean
    /**
     * 是否支持语音会议
     */
    isSupportAudioConferece: boolean
    /**
     * 是否支持发送文本
     */
    isSupportMessageText: boolean
    /**
     * 对讲服务器地址
     */
    audioServerIP: string
    /**
     * 是否支持语音留言
     */
    isSupportRTAudioMessage: boolean
    /**
     * 对讲平台调度服务端口
     */
    dispatchServicePort: string
    /**
     * 是否拥有禁言角色 true:有; false:没有
     */
    isOwnPreventSpeechRole: boolean
    /**
     * 用户拥有的临时组id集合
     */
    userOwnTempAssignmentIntercomGroupIdList: []
    /**
     * 对讲服务器端口
     */
    audioServerPort: number
    /**
     * 会话ID
     */
    pid: string
    /**
     * 是否支持实时视频上传
     */
    isSupportVideoFunc: boolean
    /**
     * 对讲平台通知服务端口
     */
    eventServicePort: number
    /**
     * 是否支持发送图片
     */
    isSupportMessageImage: boolean
    /**
     * 是否支持电子围栏
     */
    isSupportFenceEnable: boolean
    /**
     * 客户ID
     */
    custId: number
    /**
     * 当前账号名称
     */
    name: string
    /**
     * 是否支持语音对讲
     */
    isSupportAudio: boolean
    /**
     * 账号类型 1:I类账号 2:II类账号 3.III类账号
     */
    attributes: CreateEngineRequest['attribute']
    /**
     * 是否支持视频功能
     */
    isSupportVideo: boolean
    /**
     * 是否支持传感
     */
    isSupportSensor: boolean
    /**
     * 当前账号ID
     */
    id: number
    /**
     * 是否支持GIS
     */
    isSupportGis: boolean
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
    hjMediaEngine: HiJoyEngine | null
    /**
     * 当前呼叫模式
     */
    callModeEnum: CallModeEnum
    /**
     * 登录响应状态
     */
    loginResponseStatus: boolean
    /**
     * 第三方调度登录接口需要的配置参数
     */
    config?: IMonitoringDispatchConfig
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
      /**
       * 从后台获取登录第三方服务的参数列表。如果成功获取，则立即调用第三方服务的登录接口
       */
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
       * 开始主呼
       */
      startCalling(request: StartCallingRequest): void
      /**
       * 停止主呼
       * 主动停止主呼时不会触发主呼停止事件
       */
      stopCalling(): void

      /**
       * 删除群组成员
       * @param {RemoveGroupMemberRequest} request
       */
      removeGroupMember(request: RemoveGroupMemberRequest): void

      /**
       * 删除临时组成员
       * @param {RemoveTempGroupMemberRequest} request
       */
      removeTempGroupMember(request: RemoveTempGroupMemberRequest): void

      /**
       * 添加临时组成员
       * @param {number[]} memberIds
       */
      addTempGroupMember(memberIds: number[]): void

      /**
       * 创建临时组
       * @param {CreateTempGroupRequest} request
       */
      createTempGroup(request: CreateTempGroupRequest): void

      /**
       * 删除临时组
       * @param {number} tempGroupId 要删除的临时组ID
       */
      deleteTempGroup(tempGroupId: number): void

      /**
       * 远程控制用户 遥晕（禁言）、遥醒（解除禁言）、遥毙（）
       * @param {RemoteControlMsRequest} request
       */
      remoteControlMs(request: RemoteControlMsRequest): void

      /**
       * 加入群组
       * @param {{groupId: number}} request
       */
      joinGroup(request: JoinOrExitGroupRequest): void

      /**
       * 退出群组
       * @param {{groupId: number}} request
       */
      exitGroup(request: JoinOrExitGroupRequest): void

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
      onTempGroupList(response: {tempGroupList: TemporaryGroup[]}): void
      /**
       * 双工主叫响铃事件处理
       * 发起双工主呼后，如果双工链路寻呼成功，会触发双工主叫响铃事件
       * @param {DuplexCallingRingResponse} response
       */
      onDuplexCallingRing(response: DuplexCallingRingResponse): void
      /**
       * 主呼响应事件
       * 开始主呼会触发主呼开始响应事件；
       * 双工主呼在触发双工主叫响铃事件后，如果双工被叫接听，会触发主呼开始响应事件；
       */
      onCallingStartResponse(response: CallingStartResponse): void
      /**
       * 主呼停止事件 (非主动停止主呼时)
       */
      onCallingStop(response: CallingStopResponse): void
      /**
       * 创建临时组响应事件
       * 主动停止主呼时不会触发主呼停止事件
       */
      onCreateTempGroupResponse(response: CreateTempGroupResponse): void
      /**
       * 临时组更新事件
       * 在其它用户创建或者删除临时组后，对讲服务会推送新的临时组信息
       */
      onTempGroupUpdate(response: TempGroupUpdateResponse): void
      /**
       * 添加临时组成员响应事件
       * @param {AddTempGroupMemberResponse} response
       */
      onAddTempGroupMemberResponse(response: AddTempGroupMemberResponse): void
    }
  }
}
