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
    tempGroupMemberMsIdList: []
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
    }
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
    }
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

  interface VideoEngine {

  }

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
     * 主呼发起响应事件
     * 开始主呼会触发主呼开始响应事件；
     * 双工主呼在触发双工主叫响铃事件后，如果双工被叫接听，会触发主呼开始响应事件；
     * @param {CallingStartResponse} event
     */
    onCallingStartResponse(event: CallingStartResponse): void

    /**
     * 主呼停止事件
     * @param {{cause: CallingStopCauseEnum}} event
     */
    onCallingStop(event: CallingStopResponse): void

    onCalledStart(): void

    onCalledStop(): void

    onEnterFullCallMode(): void

    onExitFullCallMode(): void

    onDuplexCallingRing(): void

    onDuplexCalledRing(): void

    /**
     * 创建临时组事件
     * @param {CreateTempGroupRequest} request
     */
    createTempGroup(request: CreateTempGroupRequest): void

    /**
     * 创建临时组响应事件
     * @param {CreateTempGroupResponse} response
     */
    onCreateTempGroupResponse(response: CreateTempGroupResponse): void

    /**
     * 添加临时组成员响应事件
     * @returns {any}
     */
    onAddTempGroupMemberResponse(): void

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
     * 添加临时组成员响应事件处理
     * @param {AddTempGroupMemberResponse} response
     */
    onAddInterceptObjectResponse(response: AddTempGroupMemberResponse): void

    onRtcOfferOrAnswer(): void

    onRtcIceCandidate(): void

    /**
     * 调度服务临时组列表事件
     * @param {{tempGroupList: TemporaryGroup[]}} response
     */
    onTempGroupList(response: {tempGroupList: TemporaryGroup[]}): void

    readonly TAG: 'HiJoyAudioEngine'
  }

  /**
   *
   */
  const hjMediaService: HJMediaService;
}
