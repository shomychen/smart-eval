<template>
  <div class="container" @click="clickHandle('test click', $event)">

    <div class="userinfo" @click="bindViewTap">
      <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover"/>
      <div class="userinfo-nickname">
        <card :text="userInfo.nickName"></card>
      </div>
    </div>
    <ul>
      <li v-for="(item, index) in list" :key="index">
      T.{{item.title}}
    </li>
    </ul>
    <div class="usermotto">
      <div class="user-motto">
        <card :text="motto"></card>
      </div>
    </div>

    <form class="form-container">
      <input type="text" class="form-control" v-model="motto" placeholder="v-model"/>
      <input type="text" class="form-control" v-model.lazy="motto" placeholder="v-model.lazy"/>
    </form>
    <a href="/pages/counter/main" class="counter">去往Vuex示例页面</a>
  </div>
</template>

<script>
  import card from '@/components/card';

  export default {
    data() {
      return {
        motto: 'Hello World',
        userInfo: {},
        siteInfo: {},
        list: [],
      };
    },

    components: {
      card,
    },

    methods: {
      bindViewTap() {
        const url = '../logs/main';
        wx.navigateTo({ url });
      },
      getUserInfo() {
        // 调用登录接口
        wx.login({
          success: () => {
            wx.getUserInfo({
              success: (res) => {
                this.userInfo = res.userInfo;
              },
            });
          },
        });
      },
      clickHandle(msg, ev) {
        console.log('clickHandle:', msg, ev);
      },
      setNewsApi() {
        // 请求方法1：promise模式
        const that = this;
        that.$post('site/home', { type: 'top', key: '12445' }).then((res) => {
          that.siteInfo = res.data;
          that.list = this.siteInfo.list;
        }).catch(() => {
          console.error('网络请求失败');
        });
        // 请求方法2：微信wx.request
        // wx.request({
        //   url: 'http://student.qiuxue001.com/api/site/home',
        //   header: {
        //     'Content-Type': 'application/json',
        //   },
        //   method: 'POST',
        //   // data: { cityname: "上海", key: "1430ec127e097e1113259c5e1be1ba70" },
        //   data: { type: 'top', key: '12445' },
        //   complete: (res) => {
        //     that.newListShow = res.data;
        //     if (res == null || res.data == null) {
        //       console.error('网络请求失败');
        //     }
        //   },
        // });
      },
    },

    created() {
      // 调用应用实例的方法获取全局数据
      this.getUserInfo();
      this.setNewsApi();
    },
  };
</script>

<style scoped>
  .userinfo {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .userinfo-avatar {
    width: 128 rpx;
    height: 128 rpx;
    margin: 20 rpx;
    border-radius: 50%;
  }

  .userinfo-nickname {
    color: #aaa;
  }

  .usermotto {
    margin-top: 150px;
  }

  .form-control {
    display: block;
    padding: 0 12px;
    margin-bottom: 5px;
    border: 1px solid #ccc;
  }

  .counter {
    display: inline-block;
    margin: 10px auto;
    padding: 5px 10px;
    color: blue;
    border: 1px solid blue;
  }
</style>
