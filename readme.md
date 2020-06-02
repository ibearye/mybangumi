# MyBangumi

获取自己在B站的追番数据

**原理**

 - 通过反向代理官方接口，使用CORS解决跨域问题；
 - 伪造请求代理封面接口，解决官方图片防盗链限制。

## 安装

命令下载

```
git clone https://github.com/ibearye/mybangumi.git
```

或者 Download Zip

## 引入

引入 `mybangumi.min.js` 和 `mybangumi.min.css` 文件:

```
<!-- 资源路径请根据实际情况修改 -->

<link rel="stylesheet" href="./mybangumi.min.css">
<script src="./mybangumi.min.js"></script>

```

## 快速开始

直接使用下列函数进行初始化：

```
Bangumi(Object optoins)
```

`options`为配置选项，一个简单的例子：

```
Bangumi({
    container: '', //必填，容器class
    vmid: '', //必填，用户id
})
```

## 参数配置

方法 `Bangumi(Object optoins)` 需传入一个配置对象，该对象具有如下属性：

**container**

类型：string，必填，容器的class。

**vmid**

类型：string，必填，用户的id。

**ps**

类型：int，选填，每页显示数目，默认：15。

**defaultStatus**

类型：int，选填，优先显示何种追番状态的番剧，它有四个可选值：

0：全部

1：想看

2：在看

3：看过

默认：0。

**showScore**

类型：bool，选填，是否显示评分，默认：true。

**showBar**

类型：bool，选填，是否显示导航条，默认：true。

## 注意事项 / 说明

以下内容是使用者需要知道的：

1. 使用前，请在B站用户的隐私设置中公开追番追剧展示；
2. 项目运行前提在不与Bilibli发生冲突下，在（可能）有任何法律纠纷时，项目会立刻下线；
3. 番剧封面图片需要服务器下载到本地，下载动作在第一次请求发生时，图片下载完成后（或已存在图片）请求将被重定向至资源URI；于是，第一次请求大概率会很缓慢，而理论上有过一次请求后，以后再请求同一张图片时速度会改观很多，**但由于服务器宽带限制，仍不要对此抱太大希望**，我正在考虑使用第三方储存解决此问题，在未解决前，请大家将就使用。