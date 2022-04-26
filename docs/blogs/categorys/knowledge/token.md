---
title: 利用localStorage存储token值并放到请求头headers实例
date: 2022-3-22
subSidebar: "auto"
isShowbgImage: false
categories:
  - 知识拓展
tags: 
  - 基础概念
  - 前端
---
:::tip
利用localStorage存储token值并放到请求头headers实例
:::

## 利用localStorage存取token实例
```js
handleLogin() {
  this.$axios({
    method: 'post',
    url: '/api/v1/login',
    headers: {
        'Content-Type': "application/json;charset=UTF-8",
    },
    data: {
      name: this.loginForm.username,
      password: this.loginForm.password
    }
  })
  .then(res=>{                    //请求成功后执行函数
    if(res.data.code === 0){
      //利用localstorage存储到本地
      localStorage.setItem("token",res.data.data.token)
      this.$router.push('/me')	//登录验证成功路由实现跳转
      console.log("登录成功")
    }else{
      console.log("登录失败")
    }
  })
  .catch(err=>{                   //请求错误后执行函
    console.log("请求错误")
  })
}
```

## 取出token值并请求用户名js代码
```js
export default {
data: function () {
        return {
          name:'',
          token:''
        }
},

created(){
  //页面加载时就从本地通过localstorage获取存储的token值
    this.token =  localStorage.getItem('token')
},
  mounted() {
    this.$axios({
      method: 'get',
      url: '/api/v1/user',
      headers: {
          'Content-Type': "application/json;charset=UTF-8",
          //把token放到请求头才能请求，这里的'Bearer '表示是后台希望更加的安全，依据后台给的信息看到底是加还是不加
          'Authorization': 'Bearer ' + this.token,
      }
    })
    .then(res=>{                    //请求成功后执行函数
    if(res.data.code === 0){
      //请求成功之后给用户名赋值
      this.name=res.data.data.username
      console.log("登录成功")
    }else{
      console.log("登录失败")
    }
  })
  .catch(err=>{                   //请求错误后执行函
    console.log("请求错误")
  })
    },
}

```