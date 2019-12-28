## 脚手架关键库及技术栈

- webpack `v4`
- react `v16.9`
- typescript `v3.5`
- babel `v7`
- eslint `v6.2`
- rematch `v1.2`
- react-router `v5`
- ECharts `v4`
- mock
- Axios/fetch
- lodash
- ...

## 主要功能

- 对静态资源（图片，模板等）的处理
- 支持typescript，eslint，prettier等工具
- 优化webpack配置，减小代码的体积
- 支持不同的css预处理器（sass等，如需使用请自行安装相关包并配置loader）
- 使项目支持多个环境切换（开发，测试，预发布，生产等）
- 使用规则来自动约束代码规范
- 使用rematch简化传统redux的繁琐写法
- ECharts支持
- Mock数据（不仅支持HTTP请求，而且支持websocket）
- async/await结合Axios/fetch简化API操作流程
- websocket封装
- ...

## 开发流程

1. 克隆代码

> 注意：不要在脚手架的master分支上直接开发与项目相关的逻辑，项目请另起仓库或切换到另外的分支开发。

```bash
git clone ''
```

2. 安装依赖

```bash
npm install
```

3. 启动项目

- 开发环境

```bash
npm run dev
```

- 打包

```bash
npm run build
```

- 另外，如果有websocket链接需求，可以使用以下命令来启动一个ws服务，ws服务端逻辑请在 /build/websocketServer/index.js 文件里面编写。


```bash
npm run ws
```

## 脚手架结构

### 架构

- `/build`: 开发环境的相关配置。包含websocket本地服务、webpack配置等。
- `/dist`：项目打包后自动生成的文件夹。里面是生产环境需要的文件，用以部署到服务器上。
- `/node_modules`：略。
- `/public`：模版文件、静态文件存放地址。存放打包或者开发时需要的一些静态文件。
- `/src`：项目源码。

### 源码及规范

- `/src/apis`：数据交互。该文件会默认导出一个全局的接口函数对象。这个函数对象受到Typescript接口——`IFetchAPIs`的约束，所以在开发接口时请确保该类型已定义了对应的key。

> 注意：这些函数的返回值是`Promise对象`，请配合`sync/await`使用。
>
> 请确保`mocks对象`(/src/apis/api/index.ts)和`apis对象`(/src/apis/mock/index.ts)的key保持一致性，以便在开启mock数据功能后，对应的接口能够正确地生成mock数据。

使用样例：
```ecmascript 6
import fetchApis from '@/apis';

async function getData() {
    const {data} = await fetchApis.fetchTest();
    // do something
}
```

- `/src/components`：组件。注意`/src/components/UI`是存放全局组件的目录，其他模块按照模块名创建新的目录即可。
- `/src/config`：全局变量、全局类型定义、接口API约束及其他相关配置。
- `/src/interface`：全局的typescript接口（interface）。
- `/src/models`：rematch的model定义目录。
- `/src/screens`：页面组装及页面数据分发。
- `/src/store`：初始化rematch的全局store。
- `/src/types`：Typescript的types定义。
- `/src/utils`：helper及其他工具定义。
- `/src/index.ts`：源码入口。

- 根目录其余文件为各种工具的配置文件，可自行了解。

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
