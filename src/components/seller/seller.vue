<template>
   <div class="seller">
      <!-- 第一部分 -->
      <div v-if="seller" class="about-seller">
         <p class="title">{{seller.name}}</p>
         <div class="top-about">    
            <p><star :size="24" :score="seller.score"></star> <span>月售{{seller.sellCount}}单</span> </p>
         </div>
         <div class="bottom-about">
            <ul>
               <li>
                  <p>起送价</p>
                  <p><span>{{seller.minPrice}}</span><span>元</span> </p>
               </li>
               <li>
                  <p>商家配送</p>
                  <p><span>{{seller.deliveryPrice}}</span><span>元</span> </p>
               </li>
               <li>
                  <p>平均配送时间</p>
                  <p><span>{{seller.deliveryTime}}</span><span>分钟</span> </p>
               </li>
            </ul>
         </div>
      </div>

      <!-- 活动和公告 -->
      <div class="gonggao-seller">
         <p class="title">公告和活动</p>
         <p>{{seller.bulletin}}</p>
         <ul>
            <li class="gonggao-item" v-for="item in seller.supports" :key="item.type">
               <icon :typenum="item.type"></icon>
               <span>{{item.description}}</span>
            </li>
         </ul>
      </div>

      <!-- 商家实景 -->
      <div class="pic-seller">
         <p class="title">商家实景</p>
         <ul v-if="seller.pics">
            <li v-for="item in seller.pics" :key="item.index">
               <img :src="item" alt="">
            </li>
         </ul>
      </div>

      <!-- 商家信息 -->
      <div class="message-seller">
         <p class="title">商家信息</p>
         <ul v-if="seller">
            <li class="message-item" v-for="item in seller.infos" :key="item.index">
               {{item}}
            </li>
         </ul>
      </div>
   </div>
</template>
<script>
import star from '../star/star';
import icon from '../textIcon/icon';
export default {
   data(){
      return {
         seller:{}
      }
   },
    created(){
       this.$axios.get('/api/seller').then(res=>{
          if(res.data.errno==0){
             this.seller=res.data.data;
          }
          console.log(this.seller);
       })
    },
    components:{
       star,
       icon
    }
}
</script>
<style  scoped>
.seller{ 
   max-height: 500px;
   background-color: rgb(225, 228, 231);
   overflow: scroll;
}
.seller::-webkit-scrollbar{
   display: none;
}
.seller>div{
   padding:0 18px;
   margin-top: 16px;
   background-color: #fff;
   border: 1px solid rgb(7, 17, 27,0.2);
   border-left: 0;
   border-right: 0;
   overflow: hidden;
}
.title{
   font-size: 14px;
   font-weight: 700;
   color: rgb(7, 17, 27);
   margin-top: 18px;
   margin-bottom: 8px;
}
.seller .about-seller{
   margin-top: 0;
   border-top: 0;
}
.top-about{
   padding-bottom: 18px;
   border-bottom: 1px solid rgb(7, 17, 27,0.1);
}
.top-about p{
   font-size: 10px;
   color: rgb(77, 85, 93);
}
.star{
   display: inline-block;
   margin-right: 12px;
}
.bottom-about ul{
   display: flex;
   width: 100%;
   height: 100%;
   padding: 18px 0;
}
.bottom-about li{
   flex: 1;
   text-align: center;
   border-right:1px solid rgb(7, 17, 27,0.1);
}
.bottom-about li:last-of-type{
   border: 0;
}
.bottom-about li p:first-of-type{
   font-size: 10px;
   color: rgb(147, 153, 159);
   line-height: 10px;
   margin-bottom: 4px;
}
.bottom-about li p:last-of-type span{
   font-size: 10px;
   font-weight: 200;
   color: rgb(7, 17, 27);
   line-height: 24px;
}
.bottom-about li p:last-of-type span:first-of-type{
   font-size: 24px;
}
.gonggao-seller p:last-of-type{
   font-size: 12px;
   font-weight: 200;
   color: rgb(240, 20, 20);
   line-height: 24px;
   margin-left: 12px;
   margin-bottom: 16px;
}

.gonggao-item icon{
   margin-right: 6px;
}
.pic-seller ul{
   display: flex;
   flex-wrap: nowrap;
   overflow: scroll;
   margin-bottom: 18px;
}
.pic-seller ul::-webkit-scrollbar{
   /* 隐藏滚动条 */
   display: none;
}
.pic-seller li {
   float: left;
   margin-right: 6px;
}
.pic-seller li img{
   width: 120px;
   height: 90px;
}
.gonggao-item,
.message-item{
   font-size: 12px;
   font-weight: 200;
   color: rgb(7, 17, 27);
   line-height: 16px;
   padding: 16px 12px;
   padding-right: 0;
    border-top: 1px solid rgb(7, 17, 27,0.1);
}
</style>