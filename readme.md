## MyBangumi

获取自己在B站的追番数据

**原理**

通过反向代理官方接口，使用CORS解决跨域问题。

## 安装

**在使用前，请在B站用户的隐私设置中公开追番追剧展示**

安装

```
git clone https://github.com/ibearye/mybangumi.git
```

或者 Download Zip

## 引入

引入 `bilibangumi.min.js` 和 `bilibangumi.min.css` 文件:

```
<!-- 资源路径请根据实际情况修改 -->
<script src="./bilibangumi.min.js"></script>
```

## 快速使用

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

**\*\*container\*\***

类型：string，必填，容器的class。

**\*\*vmid\*\***

类型：string，必填，用户的id。

**\*\*ps\*\***

类型：int，选填，每页显示数目，默认：15。

**\*\*defaultStatus\*\***

类型：int，选填，优先显示何种追番状态的番剧，它有四个可选值：

0：全部

1：想看

2：在看

3：看过

默认：0。

**\*\*showScore\*\***

类型：bool，选填，是否显示评分，默认：true。

**\*\*showBar\*\***

类型：bool，选填，是否显示导航条，默认：true