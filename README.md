## 脚手架关键库及技术栈

- webpack `v4`
- react `v16`
- react-redux `v7`
- redux `v4`
- rematch `v1.2` (基于redux的封装库)
- typescript `v3.5`
- babel `v7`
- eslint `v6.2`
- react-router `v5`
- sass-dart `v1`
- ECharts `v4`
- antd `v4`
- eCharts `v4`
- sockjs `v1`
- stompjs `v2`
- mock `v1`
- styled-components `v5`
- Axios/fetch (已封装在`src/apis/index.ts`, 为每一个接口自动生成对应的函数)
- lodash `v4`
- ...

## 主要功能

- 对静态资源（图片，模板等）的处理
- 支持typescript，eslint，prettier等工具
- 优化webpack配置，减小代码的体积
- 支持不同的css预处理器（sass等，如需使用请自行安装相关包并配置loader）
- 使项目支持多个环境切换（开发，测试，预发布，生产等）
- 使用规则来自动约束代码规范
- 使用rematch简化传统redux的繁琐写法
- ECharts及Ant Design支持
- styled-components，在组件内写样式
- Mock数据（支持HTTP请求和websocket双工通信）
- async/await结合Axios/fetch简化API操作流程
- websocket封装（支持原生websocket、sockjs及stompjs）
- ...

## 开发流程

1. 克隆代码

> 注意：不要在脚手架的master分支上直接开发与项目相关的逻辑，项目请另起仓库或切换到另外的分支开发。

```bash
git clone ssh://git@192.168.24.250:2022/shiyebu/shiyebu-fe-generator.git
```

2. 安装依赖

```bash
npm install
```

也可以使用yarn

```bash
yarn
```

3. 启动项目

因项目可能越写越大，启动开发环境或者打包时的编译时间可能会增加，可在后期自行配置`happypack`提升编译速度。

- 开发环境

开发环境的配置主要有以下几个地方：
1. `build/config.js`: `devServer`为webpack的开发环境，请根据实际情况进行配置
2. `src/config/index.ts`: 里面可对数据接口进行相关配置、地图配置、mock开关以及项目根目录进行配置
3. 联调时，请关闭`mock`，然后在`devServer`里面添加接口代理

```bash
npm run dev
```

```bash
yarn dev
```

- 打包

生产环境打包的配置主要有以下几个地方：
1. `src/config.index.ts`: 将`mock`关闭，然后根据实际情况配置`basename`及其他字段。关于接口路径，请仔细阅读文件内的`接口配置说明`注释
2. `build/webpack.prod.js`: 根据实际情况更改js和css的打包输出路径

```bash
npm run build
```

```bash
yarn build
```

- 路由配置

`src/config/router.ts`

- 另外，如果有websocket链接需求，可以使用以下命令来启动一个ws服务，ws服务端逻辑请在 `/build/websocketServer/index.js` 文件里面编写。
- sockjs的测试服务暂未提供。如有需要，请自行使用nodejs搭建。


```bash
npm run ws
```

## 脚手架结构

### 架构

- `/build`: 开发环境的相关配置。包含websocket本地服务、webpack配置等。
- `/dist`：项目打包后自动生成的文件夹。里面是生产环境需要的文件，用以部署到服务器上。
- `/node_modules`：略。
- `/public`：模版文件、静态文件存放地址。存放打包或者开发时需要的一些静态文件。
- `/src`：项目源码，下面有详细介绍。
- 其余文件为各种工具的配置文件，可自行了解。

### 源码及规范

- `/src/apis`：数据交互。该文件会默认导出一个全局的接口函数对象。这个函数对象受到Typescript接口——`FetchApis`的约束，所以在开发接口时请确保该类型已定义了对应的key，`key`受到`APIName`类型的约束。

> 注意：这些函数的返回值是`Promise对象`，请配合`sync/await`使用。
>
> 请确保`mocks对象`(/src/apis/api/index.ts)和`apis对象`(/src/apis/mock/index.ts)的key保持一致性，以便在开启mock数据功能后，对应的接口能够正确地生成mock数据。

使用样例：
```typescript
import fetchApis from '@/apis';

async function getData() {
    const response: APIResponse = await fetchApis.fetchTest();
    // do something
}
```

- `/src/components`：组件。注意`/src/components/UI`是存放全局组件的目录，其他模块按照模块名创建新的目录即可。该目录推荐只存放无副作用的纯组件
- `/src/config`：全局变量、全局类型定义、接口API约束及其他相关配置。
- `/src/containers`：组件。注意`src/containers/UI`是存放全局组件的目录。该目录内的组件用以实现纯组件的渲染逻辑、connect等功能
- `/src/images`: 用于存放一些全局性的图片资源，组件的图片建议放到组件内部。
- `/src/interface`：全局的typescript接口（interface）。存放一些公用文件的类型定义，如api、route等。
- `/src/models`：rematch的model定义目录，每个组件/模块的数据处理逻辑或者状态控制，注意区别于containers内的组件渲染逻辑。
- `/src/store`：初始化rematch的全局store。
- `/src/styled`：styled-components全局性的样式定义文件。
- `/src/types`：Typescript的types定义，主要为一些没有ts类型定义的库自定义类型定义。
- `/src/utils`：helper及其他工具定义。
- `/src/index.ts`：源码入口。

## 功能用法速查

### 接口API与Mock数据

Mock数据（前端模拟数据），基于前后端评审得出的接口文档自动生成的一系列模拟数据，达到前端不依赖于后端的接口而并行开发的目的。

可在`/src/config`文件配置启用或者不启用。

各个接口的mock数据生成规则可在`/src/apis/mock/index.ts`内定义，以下简称`mock对象`。

各个接口的API规则可在`/src/apis/api/index.ts`内定义，以下简称`api对象`。

mock对象和api对象受到全局`FetchAPIs`类型的约束。

启用mock，则所有接口发送的请求会被拦截，并返回mock数据。

禁用mock，除了设置强制开启mock的api对象，则直接向服务端请求数据。

### websocket

如要使用websocket，请在`api对象`内添加如下键值对即可：

```json5
{
    url: '/testWebSocket',
    port: '3002',
    host: 'localhost',
    isWebsocket: true
}
```

或者

```json5
{
    url: 'ws://localhost:3002/testWebSocket',
    isWebsocket: true
}
```

> 注意：如果`url`为完整的链接（如：ws://localhost:3002/testWebSocket），则直接使用这个URL；如果不完整，则自动按照设置的参数拼接URL。

### sockjs & stompjs

可用sockjs代替websocket，注意isWebsocket和isSockjs的优先级，后者更高

```json5
{
  url: '/testSockjs',
  port: '3002',
  host: 'localhost',
  isSockjs: true
}
```

### 接口配置说明（port、host和protocol三项的配置说明）

- 当host为域名时，port无效
- 本地调试配置样例。如果有跨域问题，可使用webpack的devServer代理。如果是后端处理跨域，则根据实际情况配置port、host以及protocol

PS：本地时推荐不配置此三项，会自动使用默认值
```json5
{
  protocol: EProtocal.HTTP,
  port: 8080,
  host: 'localhost'
}
```


- 生产环境配置样例。port、host和protocol为空，则除全双工通道以外的接口默认为相对服务环境的根路径，全双工通道需要在websocket配置项内单独配置

1. 按域名配置全局生产环境配置
```json5
{
  protocol: EProtocal.HTTPS,
  host: 'zw.iwalkie.cn'
}
```

2. 按IP配置全局生产环境配置
```json5
{
  protocol: EProtocal.HTTPS,
  host: '192.168.1.1',
  port: 8080
}
```

3. 使用部署服务器的相对路径，此时可省略全局protocol/port/host配置，但此时必须为全双工通信配置单独的protocol/port/host
```json5
{
  websocket: {
    protocol: EProtocal.HTTPS,
    port: 8080,
    host: '192.168.1.1'
  }
}
```

4. 为开发环境和生产环境分别配置全双工通信的protocol/port/host
```json5
{
  websocket: {
    prod: {
      protocol: EProtocal.HTTPS,
      port: 8080,
      host: '192.168.1.1'
    },
    // 推荐省略dev配置，自动使用默认值
    dev: {
      protocol: EProtocal.HTTP,
      port: 3001,
      host: 'localhost'
    }
  }
}
```
