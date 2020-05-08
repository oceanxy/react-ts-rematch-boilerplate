/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: mock数据模版
 * @Date: 2019-10-17 10:04:40
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-25 周六 15:20:19
 */

import apis, { APIName, APIRequestConfig } from '@/apis/api';
import { APIResponse } from '@/interfaces/api/mock';
import _ from 'lodash';
import { mock, Random } from 'mockjs';
import moment from 'moment';

/**
 * mock数据集
 */
export type Mocks = {
  [K in APIName]: APIResponse;
};

/**
 * 按接口生成mock数据
 * @param fetchName {keyof FetchAPIs} 接口名
 * @param isWebsocket {boolean} 是否是websocket访问
 */
export const productionData = (fetchName: keyof APIRequestConfig, isWebsocket?: boolean) => {
  // 如果是websocket长链接，则自定义请求路径，以便采用HTTP轮询的方式模拟数据
  if (isWebsocket) {
    mock(`/${fetchName}`, mocks[fetchName]);
  }

  mock(apis[fetchName].url, mocks[fetchName]);
};

/**
 * 生成车牌
 * @returns {string}
 */
function monitorName() {
  const p = [
    '皖',
    '京',
    '渝',
    '闽',
    '甘',
    '粤',
    '区',
    '黔',
    '琼',
    '冀',
    '豫',
    '黑',
    '蒙',
    '区',
    '青',
    '鲁',
    '晋',
    '陕',
    '沪',
    '川',
    '津',
    '藏',
    '新',
    '滇',
    '浙',
    '港',
    '澳'
  ][Math.floor(Math.random() * 27)];
  const r = mock(/[A-Z]·[\dA-Z]{5}/);

  return `${p}${r}`;
}

/**
 * 获取重庆主城内随机经纬度
 * @returns {number[]}
 */
function getLngLat() {
  return [
    Random.float(106.258848, 106.708944, 6, 8),
    Random.float(29.373039, 29.644338, 6, 8)
  ];
}

/**
 * Mock数据生成规则
 * 注意返回对象内的fetchAPI名称需要与api目录内的相应名称对应
 */
const mocks: Mocks = {
  // 测试接口
  fetchTest: {
    retCode: 0,
    retMsg: '',
    data: {
      'name|+1': ['苹果', 'OPPO', '三星', '华为', '小米'],
      'value|10-100': 1,
      'child|2-5': [
        {
          name: '@cname',
          'value|10-100': 1
        }
      ]
    }
  },
  // 测试websocket接口
  fetchTestWebsocket: {
    retCode: 0,
    retMsg: '',
    data: {
      name: 'websocket',
      'value|1-10': 1
    }
  },
  // 测试删除数据接口
  deleteData: {
    retCode: 0,
    retMsg: '',
    data: null
  },
  fetchECharts: {
    retCode: 0,
    retMsg: '',
    data: [
      [
        [28604, 77, 17096869, 'Australia', 1990],
        [31163, 77.4, 27662440, 'Canada', 1990],
        [1516, 68, 1154605773, 'China', 1990],
        [13670, 74.7, 10582082, 'Cuba', 1990],
        [28599, 75, 4986705, 'Finland', 1990],
        [29476, 77.1, 56943299, 'France', 1990],
        [31476, 75.4, 78958237, 'Germany', 1990],
        [28666, 78.1, 254830, 'Iceland', 1990],
        [1777, 57.7, 870601776, 'India', 1990],
        [29550, 79.1, 122249285, 'Japan', 1990],
        [2076, 67.9, 20194354, 'North Korea', 1990],
        [12087, 72, 42972254, 'South Korea', 1990],
        [24021, 75.4, 3397534, 'New Zealand', 1990],
        [43296, 76.8, 4240375, 'Norway', 1990],
        [10088, 70.8, 38195258, 'Poland', 1990],
        [19349, 69.6, 147568552, 'Russia', 1990],
        [10670, 67.3, 53994605, 'Turkey', 1990],
        [26424, 75.7, 57110117, 'United Kingdom', 1990],
        [37062, 75.4, 252847810, 'United States', 1990]
      ],
      [
        [44056, 81.8, 23968973, 'Australia', 2015],
        [43294, 81.7, 35939927, 'Canada', 2015],
        [13334, 76.9, 1376048943, 'China', 2015],
        [21291, 78.5, 11389562, 'Cuba', 2015],
        [38923, 80.8, 5503457, 'Finland', 2015],
        [37599, 81.9, 64395345, 'France', 2015],
        [44053, 81.1, 80688545, 'Germany', 2015],
        [42182, 82.8, 329425, 'Iceland', 2015],
        [5903, 66.8, 1311050527, 'India', 2015],
        [36162, 83.5, 126573481, 'Japan', 2015],
        [1390, 71.4, 25155317, 'North Korea', 2015],
        [34644, 80.7, 50293439, 'South Korea', 2015],
        [34186, 80.6, 4528526, 'New Zealand', 2015],
        [64304, 81.6, 5210967, 'Norway', 2015],
        [24787, 77.3, 38611794, 'Poland', 2015],
        [23038, 73.13, 143456918, 'Russia', 2015],
        [19360, 76.5, 78665830, 'Turkey', 2015],
        [38225, 81.4, 64715810, 'United Kingdom', 2015],
        [53354, 79.1, 321773631, 'United States', 2015]
      ]
    ]
  },
  // 事件详情
  fetchEventDetails: {
    retCode: 0,
    retMsg: 'success',
    data: {
      administrativeRegion: '@county',
      eventEndAddress: '@county(true)',
      endTime: '@datetime',
      eventDurationTime: 19500,
      eventDurationTimeStr: '5小时25分0秒',
      'eventLevel|1-4': 1,
      'eventName|1': ['上班未到岗', '超时长停留'],
      eventProcessingTime: 3892,
      eventProcessingTimeStr: '1小时4分52秒',
      'eventStatus|0-1': 0,
      eventType: '152',
      latitude: '29.893485',
      longitude: '111.730631',
      monitorId: '@guid',
      startTime: '@datetime',
      monitorName: monitorName,
      eventId: '@guid'
    }
  },
  fetchEventList: {
    retCode: 0,
    retMsg: '',
    data: {
      'eventList|10-15': [
        {
          description: null,
          'eventLevel|1-4': 1,
          'eventName|1': ['上班未到岗', '超时长停留'],
          'eventStatus|0-1': 0,
          eventType: '154',
          monitorId: '@guid',
          monitorName: monitorName,
          startTime: '@datetime',
          eventId: '@guid'
        }
      ],
      eventStatistics: {
        'finnishedNum|1-10': 1,
        'processingNum|1-10': 1,
        'totalNum|1-10': 1,
        'untreatedNum|1-10': 1
      },
      latestEventDetails: {
        administrativeRegion: '@county',
        eventEndAddress: '@county(true)',
        endTime: '@datetime',
        eventDurationTime: 19500,
        eventDurationTimeStr: '5小时25分0秒',
        'eventLevel|1-4': 1,
        'eventName|1': ['上班未到岗', '超时长停留'],
        eventProcessingTime: 3892,
        eventProcessingTimeStr: '1小时4分52秒',
        'eventStatus|0-1': 0,
        eventType: '152',
        latitude: '29.893485',
        longitude: '111.730631',
        monitorId: '@guid',
        startTime: '@datetime',
        monitorName: monitorName,
        eventId: '@guid'
      }
    }
  },
  handleEvent: {
    retCode: 0,
    retMsg: '',
    data: {
      handledEventList: {
        monitorId: '@guid',
        startTime: moment().format('YYYY-MM-dd HH:mm:ss'),
        eventType: 0,
        monitorName,
        eventStatus: 2,
        eventName: '上班未到岗',
        eventLevel: 1,
        'description': '单个监控对象事件批量处理测试'
      }
    }
  },
  fetchSearchByMonitorName: {
    retMsg: '',
    retCode: 0,
    data: {
      'monitors|10-20': [
        {
          monitorId: '@guid',
          'monitorName|1': [monitorName, () => Random.cname()],
          'monitorType|1': [0, 1, 2, 9, 10],
          'assignmentName|1': ['分组1', '分组2', '分组3', '分组4'],
          deviceNum: Math.floor(Math.random() * 10000),
          'groupName|1': ['组织1', '组织2', '组织3', '组织4'],
          simCardNum: Math.floor(Math.random() * 10000),
          userId: Random.integer(10000, 99999)
        }
      ]
    }
  },
  fetchFences: {
    retCode: 0,
    retMsg: '',
    data: {
      fenceTreeNodes: [
        {
          iconSkin: null,
          id: '1f43cb0b-402e-45bd-9f27-aed1a93669ac',
          name: '所有绘制方式',
          objType: null,
          parentId: '0',
          type: 'fenceParent',
          childNodes: [
            {
              childNodes: null,
              iconSkin: 'zw_m_polygon_skin',
              id: 'f5349dc7-4b5c-4c96-af22-bcf09463cd0c',
              name: 'duobianx-2',
              objType: 'zw_m_polygon',
              parentId: '1f43cb0b-402e-45bd-9f27-aed1a93669ac',
              type: 'fence'
            },
            {
              childNodes: null,
              iconSkin: 'zw_m_circle_skin',
              id: '6a8160f4-e829-4b2c-a932-b32c347ab224',
              name: 'yuanxing',
              objType: 'zw_m_circle',
              parentId: '1f43cb0b-402e-45bd-9f27-aed1a93669ac',
              type: 'fence'
            },
            {
              childNodes: null,
              iconSkin: 'zw_m_line_skin',
              id: 'adb1a293-a5c9-4b7b-bcdf-8e5d83d8ae7d',
              name: 'luxian-2',
              objType: 'zw_m_line',
              parentId: '1f43cb0b-402e-45bd-9f27-aed1a93669ac',
              type: 'fence'
            },
            {
              childNodes: null,
              iconSkin: 'zw_m_marker_skin',
              id: 'd7b14108-5f42-4c02-b8b2-31c5381b4a92',
              name: 'biaozhu-2',
              objType: 'zw_m_marker',
              parentId: '1f43cb0b-402e-45bd-9f27-aed1a93669ac',
              type: 'fence'
            },
            {
              childNodes: null,
              iconSkin: 'zw_m_administration_skin',
              id: '8ca18d7a-cf35-469e-91fe-5e2b1aa554d5',
              name: '湖北-宜昌',
              objType: 'zw_m_administration',
              parentId: '1f43cb0b-402e-45bd-9f27-aed1a93669ac',
              type: 'fence'
            },
            {
              childNodes: null,
              iconSkin: 'zw_m_circle_skin',
              id: '78e694a5-e8ca-4fca-98f4-5d1c9430ccba',
              name: 'yuan',
              objType: 'zw_m_circle',
              parentId: '1f43cb0b-402e-45bd-9f27-aed1a93669ac',
              type: 'fence'
            }
          ]
        },
        {
          iconSkin: null,
          id: 'a987d60b-f5ea-4dca-a4ca-a02b6229a5d4',
          name: 'quxi-下级创建',
          objType: null,
          parentId: '0',
          type: 'fenceParent',
          childNodes: [
            {
              childNodes: null,
              iconSkin: 'zw_m_circle_skin',
              id: 'ef11341b-628f-4d56-8ba0-9b716bd73da0',
              name: 'yuan',
              objType: 'zw_m_circle',
              parentId: 'a987d60b-f5ea-4dca-a4ca-a02b6229a5d4',
              type: 'fence'
            },
            {
              childNodes: null,
              iconSkin: 'zw_m_circle_skin',
              id: 'b49dc658-366b-43aa-80cc-6c6843ac68ff',
              name: 'yuanxing',
              objType: 'zw_m_circle',
              parentId: 'a987d60b-f5ea-4dca-a4ca-a02b6229a5d4',
              type: 'fence'
            },
            {
              childNodes: null,
              iconSkin: 'zw_m_administration_skin',
              id: '4a19456c-6437-4147-b32c-719f4c64a424',
              name: '湖北-宜昌-枝江',
              objType: 'zw_m_administration',
              parentId: 'a987d60b-f5ea-4dca-a4ca-a02b6229a5d4',
              type: 'fence'
            }
          ]
        },
        {
          iconSkin: null,
          id: 'cdecb3bd-dccf-4be4-82ac-7ad3b966d9ff',
          name: 'yuan',
          objType: null,
          parentId: '0',
          type: 'fenceParent',
          childNodes: [
            {
              childNodes: null,
              iconSkin: 'zw_m_circle_skin',
              id: 'a8328d1c-73d0-42af-b3b0-cdf9824da845',
              name: 'test001',
              objType: 'zw_m_circle',
              parentId: 'cdecb3bd-dccf-4be4-82ac-7ad3b966d9ff',
              type: 'fence'
            },
            {
              childNodes: null,
              iconSkin: 'zw_m_circle_skin',
              id: 'b8a5fe63-0df3-45f9-9d31-7b1264095d79',
              name: 'test002',
              objType: 'zw_m_circle',
              parentId: 'cdecb3bd-dccf-4be4-82ac-7ad3b966d9ff',
              type: 'fence'
            },
            {
              childNodes: null,
              iconSkin: 'zw_m_circle_skin',
              id: '1edcd618-fdef-44a4-acb2-8c8b331e9124',
              name: 'yuanxing',
              objType: 'zw_m_circle',
              parentId: 'cdecb3bd-dccf-4be4-82ac-7ad3b966d9ff',
              type: 'fence'
            }
          ]
        }
      ]
    }
  },
  fetchAroundEvent: {
    retMsg: '',
    retCode: 0,
    data: {
      statistics: {
        'itemName|7': ['@cname'],
        'totalNum|7': ['@integer(100,500)']
      }
    }
  },
  fetchRSByAdminRegions: {
    retMsg: '',
    retCode: 0,
    data: {
      statistics: {
        'itemName|7': ['@cname'],
        'totalNum|7': ['@integer(100,500)']
      }
    }
  },
  fetchRSByFence: {
    retMsg: '',
    retCode: 0,
    data: {
      statistics: {
        'itemName|7': ['@cname'],
        'totalNum|7': ['@integer(100,500)']
      }
    }
  },
  fetchTaskList: {
    retCode: 0,
    retMsg: '',
    data: {
      taskPageInfo: {
        totalRecords: 1,
        start: 0,
        totalPages: 1,
        pageSize: 10,
        end: 10,
        page: 1,
        'records|10-20': [
          {
            address: '@county(true)',
            createDataTime: '@datetime',
            createDataUsername: '@name',
            dateDuplicateType: '',
            description: Random.paragraph(10, 20),
            endTime: '2020-04-17 23:59:59',
            'eventNames|1': ['超时长停留', '紧急报警'],
            events: null,
            executors: null,
            groupId: '@guid',
            groupName: Random.paragraph(3, 5),
            realEndTime: null,
            realStartTime: null,
            startTime: '@datetime',
            'status|1': [0, 1, 2],
            taskId: '@guid',
            'taskLevel|1': [1, 2, 3],
            taskName: () => `任务${Random.integer(10, 100)}`,
            'taskPeriod|1': [1, 2],
            updateDataTime: '@datetime',
            updateDataUsername: null
          }
        ]
      },
      taskStatistics: {
        'finishedNum|1-10': 1,
        'processingNum|1-10': 1,
        'totalNum|1-10': 1,
        'untreatedNum|1-10': 1
      }
    }
  },
  fetchTaskDetails: {
    retCode: 0,
    retMsg: '',
    data: {
      taskInfo: {
        address: Random.county(true),
        dateDuplicateType: () => {
          const weeks = ['', '周一', '周二', '周三', '周四', '周五', '周六', '周日'];
          const weeksXB: number[] = [];

          _.range(Random.integer(1, 7)).forEach(() => {
            const xb = Random.integer(1, 7);
            if (!weeksXB.includes(xb)) {
              weeksXB.push(xb);
            }
          });

          const weekXBSort = weeksXB.sort((a, b) => a - b);

          // 直接返回中文形式的值 如'周一,周二'
          // const result = weekXBSort.map((xb) => weeks[xb]);
          // return result.join(',');

          // 返回数字形式的值 如‘1,2,3’
          return weekXBSort.join();
        },
        description: '任务创建接口测试',
        eventNames: '紧急报警,超时长停留',
        groupId: '960c2a44-a13c-1039-8e6f-e9bbe4905ce3',
        groupName: null,
        realEndTime: '@datetime',
        realStartTime: '@datetime',
        remark: Random.cparagraph(20, 30),
        'status|1': [0, 1, 2],
        taskId: '@guid',
        'taskLevel|1': [1, 2, 3],
        taskDurationTimeStr: () => {
          const time = [
            `${Random.integer(1, 10)}天`,
            `${Random.integer(0, 23)}时`,
            `${Random.integer(0, 59)}分`,
            `${Random.integer(0, 59)}秒`
          ];

          return time.slice(Random.integer(0, 3)).join('');
        },
        taskName: () => `任务${Random.integer(10, 100)}`,
        startTime: '@datetime',
        endTime: '@datetime',
        'taskPeriod|1': [1, 2],
        'events|3-6': [
          {
            description: null,
            eventId: '@guid',
            'taskLevel|1': [1, 2, 3],
            eventName: () => {
              return `事件${Random.integer(1, 100)}`;
            },
            'eventStatus|1': [0, 1],
            eventType: Random.integer(1000, 10000),
            monitorId: '@guid',
            monitorName: monitorName,
            startTime: '@datetime'
          }
        ],
        'executors|3-6': [
          {
            assignmentName: 'tb-group09,tb-group01,tb-group02',
            curAssignmentName: '大王叫我去巡山040910534',
            curAssignmentType: '2',
            deviceNum: '0002527',
            dispatchStatus: '2',
            groupName: '回归测试',
            hasForbiddenWord: false,
            iconUrl: null,
            monitorId: '@guid',
            monitorName: monitorName,
            monitorType: '0',
            onlineStatus: 0,
            plateColor: null,
            simCardNum: '18600332931',
            thingTypeName: null,
            userId: 7349,
            userNumber: '93446'
          }
        ]
      }
    }
  },
  updateTask: {
    retMsg: '',
    retCode: Random.integer(0, 1),
    data: {
      newUserIds: null,
      deleteUserIds: null,
      intercomGroupId: null
    }
  },
  completeTask: {
    retMsg: '',
    retCode: Random.integer(0, 1),
    data: null
  },
  fetchIntercomMembers: {
    retCode: 0,
    retMsg: '',
    data: {
      'interlocutorMemberList|30-50': [
        {

          'audioOnlineStatus': () => Random.integer(0, 1),
          'userName': monitorName,
          'type': () => Random.integer(0, 2),
          'userId': () => Random.integer(),
          'deviceId': () => Random.integer().toString(),
          'modelName': () => Random.integer().toString(),
          'sensorAbility': 0,
          'sensorOnlineStatus': 0,
          'defaultGroupId': 4294947295,
          'isApp': 0,
          'gpsFunction': 1,
          'fenceEnable': 0,
          'patrolEnable': 0,
          'videoOnlineStatus': 0,
          'beStunned': 0,
          'videoFunction': 0,
          'iconSkin': 'vehicleSkin',
          'gisAbility': 0,
          'audioAbility': 1,
          'custId': 94,
          'userNumber': 93446,
          'locatestatus': 1
        }
      ]
    }
  },
  fetchTemporaryGroup: {
    retMsg: '',
    retCode: 0,
    data: {
      'temporaryGroupList|4-10': [
        {
          'intercomGroupId': '@guid',
          'name': () => `临时组${Random.integer(0, 100)}`,
          'id': '@guid'
        }
      ]
    }
  },
  unbindTemporaryGroup: {
    retCode: 0,
    retMsg: '',
    data: null
  },
  fetchDispatchServer: {
    retCode: 0,
    retMsg: '',
    data: {
      'isSupportVideoConferece': true,
      'isSupportVideoCall': true,
      'isSupportAudioConferece': true,
      'isSupportMessageText': false,
      'audioServerIP': 'hj.iwalkie.cn',
      'isSupportRTAudioMessage': false,
      'dispatchServicePort': '9000',
      'isOwnPreventSpeechRole': true,
      'userOwnTempAssignmentIntercomGroupIdList': [],
      'audioServerPort': 9000,
      'pid': '63183d88-5000-492e-b42f-9047f684ced2',
      'isSupportVideoFunc': false,
      'eventServicePort': '443',
      'isSupportMessageImage': false,
      'isSupportFenceEnable': false,
      'custId': 94,
      'name': 'xiaoyun',
      'isSupportAudio': true,
      'attributes': 2,
      'isSupportVideo': false,
      'isSupportSensor': false,
      'id': 6590,
      'isSupportGis': false,
      'isSupportPatrolEnable': false
    }
  },
  createTemporaryGroup: {
    retMsg: '',
    retCode: 0,
    data: null
  },
  removeMember: {
    retCode: 0,
    retMsg: '',
    data: null
  },
  addMember: {
    retCode: 0,
    retMsg: '',
    data: null
  },
  fetchEntityByCircle: {
    retCode: 0,
    retMsg: '',
    data: {
      'monitors|10-20': [
        {
          monitorId: '@guid',
          'monitorName|1': [monitorName, () => Random.cname()],
          'monitorType|1': [0, 1, 2, 9, 10],
          'assignmentName|1': ['分组1', '分组2', '分组3', '分组4'],
          deviceNum: () => Math.floor(Math.random() * 10000),
          'groupName|1': ['组织1', '组织2', '组织3', '组织4'],
          simCardNum: () => Math.floor(Math.random() * 10000),
          userId: () => Random.integer(10000, 99999)
        }
      ]
    }
  },
  addLog: {
    retCode: 0,
    retMsg: '',
    data: null
  },
  fetchMassPoint: {
    retCode: 0,
    retMsg: '',
    data: {
      'positionList|150-200': [
        {
          'happenEvent|1': [0, 1],
          // 'style|+1': [0, 1, 2, 3, 4],
          // 'monitorType|+1': [0, 1, 2, 9, 10],
          'style|+1': [0, 1, 2, 3],
          'monitorType|+1': [0, 1, 2, 9],
          'iconUrl': 'http://192.168.110.161:8080/clbs/resources/img/vico/v_21.png',
          'lnglat': getLngLat,
          'monitorId': '@guid',
          'monitorName': monitorName,
          'userId': () => Random.integer()
        }
      ],
      'iconSortList': [
        'http://192.168.24.144:8799/mediaserver/profesionalpic/158452428941261.png',
        'http://192.168.24.144:8799/mediaserver/profesionalpic/158452425135653.png',
        'http://192.168.110.161:8080/clbs/resources/img/vico/v_1.png',
        'http://192.168.110.161:8080/clbs/resources/img/vico/dispatch-car.png',
        'http://192.168.110.161:8080/clbs/resources/img/vico/dispatch-people.png',
        'http://192.168.110.161:8080/clbs/resources/img/vico/dispatch-thing.png'
      ]
    }
  },
  fetchWindowInfo: {
    retMsg: '',
    retCode: 0,
    data: {
      'monitor': {
        'assignmentName': 'tb-group02,tb-group01,tb-group09',
        'curAssignmentName': 'tb-group09',
        'curAssignmentType': '1',
        'deviceNum': '0002527',
        'groupName': '回归测试',
        'hasForbiddenWord': false,
        'iconUrl': 'http://192.168.110.161:8080/clbs/resources/img/vico/v_21.png',
        'monitorId': '@guid',
        'monitorName': monitorName,
        'monitorType|1': [0, 1, 2, 9, 10],
        'onlineStatus|1': [0, 1],
        'plateColor': '黄色',
        'simCardNum': '18600332931',
        'userId': 7349,
        'userNumber': '93446'
      },
      'location': {
        'address': '重庆市渝中区石油路街道长江二路172号龙湖重庆时代天街',
        'latitude': '29.535635',
        'gpsTime': '2020-03-26 19:06:39',
        'longitude': '106.514349'
      },
      'eventNames|1': ['超时长停留', '超时长停留，上班未到岗', '上班未到岗，SOS报警', 'SOS报警', '上班未到岗'],
      'tasks|3-5': [
        {
          'taskName': () => ['去哪里', '到哪里', '定时任务'][Random.integer(0, 2)],
          'taskLevel|1': [1, 2, 3],
          'status|1': [0, 1, 2]
        }
      ],
      'eventList|10-15': [
        {
          description: null,
          'eventLevel|1-4': 1,
          'eventName|1': ['上班未到岗', '超时长停留'],
          'eventStatus|0-1': 0,
          eventType: '154',
          monitorId: '@guid',
          monitorName: monitorName,
          startTime: '@datetime',
          eventId: '@guid'
        }
      ]
    }
  }
};

export default mocks;
