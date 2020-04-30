/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 第三方调度服务API类型定义
 * @Date: 2020-04-25 周六 14:17:44
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-04-25 周六 14:17:44
 */

import {
  CallingStartResultEnum,
  CallingStopCauseEnum,
  CallModeEnum,
  GroupIDTypeEnum,
  LoginResultEnum,
  UserIDTypeEnum
} from '@/models/UI/monitoringDispatch/index';

declare global {
  /**
   * 第三方返回的临时组数据
   */
  interface TemporaryGroup {
    /**
     * 临时组ID
     */
    tempGroupId: number
    /**
     * 临时组名称
     */
    tempGroupName: string
    /**
     * 临时组号码
     */
    tempGroupNumber: number
    /**
     * 临时组当前状态
     */
    tempGroupStatus: number
    /**
     * 创建临时组用户ID
     */
    tempGroupCreatorMsId: number
    /**
     * 临时组成员用户ID列表
     */
    tempGroupMemberMsId: []
  }

  /**
   * 开始主呼request
   */
  interface StartCallingRequest {
    /**
     * 呼叫模式，包括组呼,个呼,双工,全呼;
     */
    callMode: CallModeEnum
    /**
     * 呼叫对象ID类型
     * 呼叫模式是组呼时，呼叫对象ID类型定义参考 GroupIDTypeEnum;
     * 呼叫模式是个呼或者双工时，呼叫对象ID类型参考 UserIDTypeEnum;
     * 呼叫模式是全呼时，呼叫对象ID类型为空
     */
    targetIdType?: GroupIDTypeEnum | UserIDTypeEnum
    /**
     * 呼叫对象ID;
     * 呼叫模式是组呼时，呼叫对象ID是群组ID;
     * 呼叫模式是个呼或者双工时，呼叫对象ID是用户ID;
     * 呼叫模式是全呼时，呼叫对象ID为空
     */
    targetId?: number
  }

  /**
   * 主呼停止事件处理
   * 主呼停止事件是由服务器后台触发或者底层网络中断触发
   */
  interface StopCallingRequest {
    /**
     * 主呼停止原因
     */
    cause: CallingStopCauseEnum
  }

  /**
   * 主呼开始response
   */
  interface CallingStartResponse {
    /**
     * 发起呼叫结果
     */
    result: CallingStartResultEnum
    /**
     * 呼叫模式
     */
    callMode: CallModeEnum
    /**
     * 呼叫对象ID类型
     */
    targetIdType?: UserIDTypeEnum
    /**
     * 呼叫对象ID
     */
    targetId?: number
  }

  /**
   * 主呼停止事件response
   */
  interface CallingStopResponse {
    /**
     * 主呼停止原因
     */
    cause: CallingStopCauseEnum
  }

  /**
   * 创建临时组request
   */
  interface CreateTempGroupRequest {
    /**
     * 临时组名称
     */
    tempGroupName: string
    /**
     * 临时组成员用户ID列表
     */
    tempGroupMemberMsIdList: number[]
  }

  /**
   * 创建临时组响应事件response
   */
  interface CreateTempGroupResponse {
    /**
     * 临时组名称。与创建临时组参数中的临时组名称一致
     */
    tempGroupName: string
    /**
     * 创建临时组结果
     */
    result: number
    /**
     * 临时组ID
     */
    tempGroupId: number
    /**
     * 临时组号码
     */
    tempGroupNum: number
    /**
     * 添加临时组成员结果
     */
    addGroupMemberResult: {
      /**
       * 临时组成员用户ID
       */
      groupMemberMsId: number
      /**
       * 添加成员成功结果 0：成功
       */
      result: number
    }[]
  }

  /**
   * 临时组更新response
   */
  interface TempGroupUpdateResponse {
    /**
     * 操作类型
     * 0:添加 1:更新 2:删除
     */
    opType: 0 | 1 | 2
    /**
     * 临时组ID
     */
    tempGroupId: number
    /**
     * 临时组号码
     */
    tempGroupNumber: number
    /**
     * 临时组名称
     */
    tempGroupName: string
    /**
     * 临时组当前状态
     */
    tempGroupStatus: number
    /**
     * 创建临时组用户ID
     */
    tempGroupCreatorMsId: number
  }

  /**
   * 创建引擎请求参数
   */
  interface CreateEngineRequest {
    audioEngine: boolean
    videoEngine: boolean
    /**
     * 账号类型 1:I类账号 2:II类账号 3.III类账号
     */
    attribute: 1 | 2 | 3
    /**
     * 登录名
     */
    loginName: string
    /**
     * 登录密码
     */
    password: string
    /**
     * 服务器地址
     */
    serverIP: string
    /**
     * 服务器端口
     */
    serverPort: string
  }

  /**
   * 添加临时组成员response
   */
  interface AddTempGroupMemberResponse {
    /**
     * 临时组ID
     */
    tempGroupId: number
    /**
     * 添加临时组成员结果
     */
    addGroupMemberResult?: {
      /**
       * 临时组成员用户ID
       */
      groupMemberMsId: number
      /**
       * 添加成员结果 0:成功
       */
      result: number
    }[]
  }

  /**
   * 登录response
   */
  interface LoginResponse {
    /**
     * 登录结果
     */
    result: LoginResultEnum
    /**
     * 用户ID
     */
    msId: number
    /**
     * 用户名称
     */
    msName: string
    /**
     * 用户个呼号码
     */
    msNumber: number
    /**
     * 用户呼叫优先级
     */
    priority: number
  }

  /**
   * 对讲调度操作API
   * 该接口实现了调度账号登陆服务器，语音对讲和语音调度的功能
   */
  interface HJMediaService {
    /**
     * 创建服务引擎
     * @param {CreateEngineRequest} globalConfig
     * @returns {HiJoyEngine}
     */
    createEngine(globalConfig: CreateEngineRequest): HiJoyEngine
  }

  /**
   * 服务引擎
   */
  interface HiJoyEngine {
    /**
     * 音频引擎
     */
    audioEngine: AudioEngine
    /**
     * 视频引擎
     */
    videoEngine?: VideoEngine
    readonly TAG: 'HiJoyEngine'
  }

  /**
   * 短消息发送对象列表
   */
  interface TargetObjectList {
    /**
     * 对象类型 0：群组 1：用户
     */
    objectType: 0 | 1
    /**
     * 对象ID（群组ID或者用户ID）
     */
    objectId: number
  }

  /**
   * SMS消息发送request
   */
  interface SMSRequest {
    /**
     * 短消息类型 0：普通短消息 1：广播短消息
     */
    smsType: 0 | 1
    /**
     * 短消息发送对象列表
     */
    targetObjectList: TargetObjectList[]
    /**
     * 短消息内容，UTF-8编码，长度不能超过256
     */
    smsContent: string
  }

  /**
   * 退出群组request
   */
  interface ExitGroupRequest {
    /**
     * 退出群主ID
     */
    groupId: number
  }

  /**
   * 删除群组成员request
   */
  interface RemoveGroupMemberRequest {
    /**
     * 群组ID
     */
    groupId: number
    /**
     * 群组成员用户ID
     */
    groupMemberMsId?: []
  }

  /**
   * 删除临时组成员request
   */
  interface RemoveTempGroupMemberRequest {
    /**
     * 临时组ID
     */
    tempGroupId: number
    /**
     * 临时组成员用户ID列表
     */
    tempGroupMemberMsIdList?: []
  }

  /**
   * 添加临时组成员request
   */
  interface AddTempGroupMemberRequest {
    /**
     * 临时组ID
     */
    tempGroupId: number
    /**
     * 临时组成员用户ID列表
     */
    tempGroupMemberMsIdList: number[]
  }

  interface VideoEngine {}

  /**
   *
   */
  interface AudioEngine {
    /**
     * 登录
     */
    login(): void

    /**
     * 登录响应事件
     * @param {LoginResponse} response
     */
    onLoginResponse(response: LoginResponse): void

    /**
     * 调度服务登出事件
     * 底层网络连接断开或者服务器主动断开连接都会触发登出事件；
     * 在收到登出事件时应尝试重连；
     */
    onLogout(): void

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
     * 退出群组
     */
    exitGroup(request: ExitGroupRequest): void

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
     * @param {AddTempGroupMemberRequest} request
     */
    addTempGroupMember(request: AddTempGroupMemberRequest): void

    /**
     * 主呼发起响应事件
     * 开始主呼会触发主呼开始响应事件；
     * 双工主呼在触发双工主叫响铃事件后，如果双工被叫接听，会触发主呼开始响应事件；
     * @param {CallingStartResponse} response
     */
    onCallingStartResponse(response: CallingStartResponse): void

    /**
     * 主呼停止事件
     * @param {{cause: CallingStopCauseEnum}} response
     */
    onCallingStop(response: CallingStopResponse): void

    onCalledStart(): void

    onCalledStop(): void

    onEnterFullCallMode(): void

    onExitFullCallMode(): void

    onDuplexCallingRing(): void

    onDuplexCalledRing(): void

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
     * 创建临时组响应事件
     * @param {CreateTempGroupResponse} response
     */
    onCreateTempGroupResponse(response: CreateTempGroupResponse): void

    /**
     * 添加临时组成员响应事件
     * @returns {any}
     */
    onAddTempGroupMemberResponse(response: AddTempGroupMemberResponse): void

    onInterceptedAudioStart(): void

    onInterceptedAudioEnd(): void

    onInterceptedEnviromentAudioStart(): void

    onInterceptedEnviromentAudioEnd(): void

    /**
     * 临时组更新事件
     * 在其它用户创建或者删除临时组后，对讲服务会推送新的临时组信息
     * @param {TempGroupUpdateResponse} response
     */
    onTempGroupUpdate(response: TempGroupUpdateResponse): void

    /**
     * 添加监听对象响应事件处理
     */
    onAddInterceptObjectResponse(): void

    onRtcOfferOrAnswer(): void

    onRtcIceCandidate(): void

    /**
     * 调度服务临时组列表事件
     * @param {{tempGroupList: TemporaryGroup[]}} response
     */
    onTempGroupList(response: {tempGroupList: TemporaryGroup[]}): void

    /**
     * 发送短消息/通知
     * @param reqPayload
     */
    sendSMS(reqPayload: SMSRequest): void

    readonly TAG: 'HiJoyAudioEngine'
  }

  // eslint-disable-next-line no-redeclare
  const hjMediaService: HJMediaService;
}
