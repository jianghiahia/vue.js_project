<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <!-- 导航 -->
      <div class="tab-item">
        <router-link to='/goods'>商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to='/ratings'>评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to='/seller'>商家</router-link>
      </div>
    </div>
    <router-view>
      <!-- 内容 -->
    </router-view>
  </div>
</template>

<script>
import header from "./components/header/header";
export default {
  name: 'App',
  components:{
    "v-header":header
  },
  data: function() {
      return {
          seller: {}
      }
  },
  mounted() {
      // 挂载结束的钩子
      // 获取了seller中的数据
      this.$axios.get('/api/seller').then(res => {
          // res.data是响应到客户端的数据，是个对象
          if (res.data.errno === 0) {
              this.seller = res.data.data;
          }         
      })
  }
}
</script>

<style scoped>
    .border-1px:after{
      content: ' ';
      position: absolute;
      display: block;
      width: 100%;
      left: 0;
      bottom: 0;
      border-top: 1px solid rgb(77,85,93);
      transform: scaleY(0.5);
    }
    .tab{
      position: relative;
      display: flex;
      width: 100%;
      height: 40px;
      line-height: 40px;
    }
    
    .tab-item{
      flex: 1;
      font-size: 14px;
      text-align: center;
    }
    .active{
      color: rgb(240,20,20);
    }
</style>
