# Vue 2.0 高仿饿了么外卖App
> [**预览地址**](https://hz-rotatingblock.github.io/elemeSellApp/dist/#/)

## 功能模块/组件
### 模块
* **商家基本信息头模块**
* **商家商品详情模块**
* **商家商品列表模块**
* **商家评论列表模块**
* **商家详情页模块**
* **购物车模块**
### 组件
* **商品数量控制组件**
* **商家评论分类组件**
* **页面部分区分条组件**
* **星星评分组件**

## 项目结构

 	.
    |-- build                       // 项目构建(webpack)相关代码
    |   |-- build.js                // 生产环境构建代码
    |   |-- check-version.js        // 检查node、npm等版本
    |   |-- dev-client.js           // 热重载相关
    |   |-- utils.js                // 构建工具相关
    |   |-- webpack.base.conf.js    // webpack基础配置
    |   |-- webpack.dev.conf.js     // webpack开发环境配置
    |   |-- webpack.prod.conf.js    // webpack生产环境配置
    |-- config                      // 项目开发环境配置
    |   |-- dev.env.js              // 开发环境变量
    |   |-- index.js                // 项目一些配置变量
    |   |-- prod.env.js             // 生产环境变量
    |-- node_modules                // npm install 安装的依赖代码库
    |-- static                      // 第三方静态资源
    |   |-- css                    	// 静态css文件
	|		|-- reset.css			// 样式重置css文件
    |-- src                         // 源码目录
    |   |-- components              // vue公共组件
	|		|-- cartcontrol			// 商品数量控制组件
	|		|-- ratingselect		// 商家评论分类组件
	|		|-- split				// 页面部分区分条组件
	|		|-- star				// 星星评分组件
    |   |-- views              		// vue模块
    |       |-- food              	// 商家商品详情模块
    |       |-- goods           	// 商家商品列表模块
    |       |-- header          	// 商家基本信息头模块
	|		|-- ratings				// 商家评论列表模块
	|		|-- seller				// 商家详情页模块
	|		|-- shopcart			// 购物车模块
    |   |-- public                  // 公共文件
	|		|-- css					// css文件相关
	|		|-- fonts				// 字体文件
	|		|-- js					// js相关文件
	|			|-- data.js			// 日期转换功能代码
	|			|-- eventBus.js		// 集中式的事件中间件,用以处理父子组件间简单的数据传输
	|			|-- store.js		// localStorage的存取功能代码
	|			|-- util.js			// url参数解析功能代码
	|		|-- sass				// sass文件
    |   |-- App.vue                 // 页面入口文件
    |   |-- main.js                 // 程序入口文件，加载各种公共组件
    |-- .babelrc                    // ES6语法编译配置
    |-- .editorconfig               // 定义代码格式（编译器配置）
    |-- .eslintignore               // 忽略对哪些文件进行检查
    |-- .eslintrc.js                // eslint的配置文件
    |-- .gitignore                  // git上传需要忽略的文件格式    
    |-- favicon.ico 
    |-- index.html                  // 入口页面
    |-- package.json                // 项目基本信息
    |-- README.md                   // 项目说明
    .
## 项目预览
### 主页/默认页/商品列表筛选

### 商家评论

### 商家详情
