<template>
   <div class="ratings">
      <!-- 评分部分 -->
      <div class="rate">
         <div class="left-rate">
            <span>{{seller.score}}</span>
            <span class="title">综合评分</span>
            <span>高于周边商家{{seller.rankRate}}%</span>
         </div>
         <div class="right-rate">
            <p><span class="title">服务态度</span><star :size="24" :score="seller.serviceScore"></star><span>{{seller.serviceScore}}</span></p>
            <p><span class="title">食物评分</span><star :size="24" :score="seller.foodScore"></star><span>{{seller.foodScore}}</span></p>
            <p><span class="title">送达时间</span><span>{{seller.deliveryTime}}分钟</span></p>
         </div>
      </div>

      <!-- 用户评价部分 -->
      <div class="userRate">
         <div class="all-ratings">
            <tab :ratings="ratings"></tab>
            <div class="controllBtn">
               <span class="icon-check_circle icon" @click="show" :class="open==true?'show':'unshow'"></span>
               <span class="text">只看有内容的评论</span>
            </div>
         </div>
         <div class="users-ratings" v-if="showRatings">
            <ul v-if="arr">
               <li v-for="item in arr" :key="item.rateTime">
                  <div>
                     <img :src="item.avatar" alt="">
                     <p><span>{{item.username}}</span><span><star :size="24" :score="item.score"></star><i v-if="item.deliveryTime!==''">{{item.deliveryTime}}分钟送达</i></span></p>
                     <span>{{gettime(item.rateTime)}}</span>
                  </div>
                  <div>{{item.text}}</div>
               </li>
            </ul>
         </div>
      </div>
   </div>
</template>
<script>
import tab from '../tab/tab';
import star from '../star/star';
export default {
   data(){
      return {
         ratings:[],
         seller:{},
         showRatings:[],
         open:false,
         arr:[],
         time:Number
      }
   },
   created(){
       this.$axios.get('/api/ratings').then(res=>{
          if(res.data.errno==0){
             this.ratings=res.data.data;  
          }
          this.$nextTick(() => {
            this.showRate();
         })
       })
       this.$axios.get('/api/seller').then(res=>{
          if(res.data.errno==0){
             this.seller=res.data.data;
          }
       })  
   },
    components:{
       star,
       tab
    },
    methods:{
        show(){
            this.open=!this.open;
            this.open==true?this.arr=this.showRatings:this.arr=this.ratings;   
        },
         showRate(){
            this.arr=this.ratings;
            this.ratings.forEach(item=>{
               if(item.text!==""){
                  this.showRatings.push(item);
               }          
             }) 
         },
         gettime(time){
            var date = new Date(time)
            var y = date.getFullYear() // 年份
            var m = date.getMonth() + 1 // 月份，注意：js里的月要加1
            if(m<10){
               m="0"+m;
            }
            var d = date.getDate() // 日
            if(d<10){
               d="0"+d;
            }
            var h = date.getHours() // 小时
            if(h<10){
               h="0"+h;
            }
            var min = date.getMinutes() // 分钟
            if(min<10){
               min="0"+min;
            }
            // 返回值，根据自己需求调整，现在已经拿到了年月日时分秒了
             return y + '-' + m + '-' + d + ' ' + h + ':' + min 
         } 
    }
}
</script>
<style  scoped>
.title{
   font-size: 12px;
   color: rgb(7, 17, 27);
   line-height: 18px;
   margin-bottom: 8px;
}
.star{
   display: inline-block;
   margin-right: 12px;
}
.ratings{ 
   max-height: 500px;
   background-color: rgb(225, 228, 231);
   overflow: scroll;
}
.ratings::-webkit-scrollbar{
   display: none;
}
.ratings>div{
   padding:0 18px;
   margin-top: 16px;
   background-color: #fff;
   border: 1px solid rgb(7, 17, 27,0.2);
   border-left: 0;
   border-right: 0;
   overflow: hidden;
}
.ratings .rate{ 
   font-size: 0;
   padding: 18px;
   margin-top: 0;
}
.left-rate{
   float: left;
   display: flex;
   flex-direction: column;
   text-align: center;
   padding-right: 18px;
   border-right: 1px solid  rgb(7, 17, 27,0.2);
}
.left-rate span:first-of-type{
   font-size: 24px;
   color: rgb(255, 153, 0);
   line-height: 28px;
   margin-bottom: 6px;
}
.left-rate span:last-of-type{
   font-size: 10px;
   color:  rgb(7, 17, 27,0.4);
   line-height: 20px;
}
.right-rate{
   float: left;
   display: flex;
   flex-direction: column;
   padding-left: 24px;
}
.right-rate p span:first-of-type{
   display: inline-block;
   margin-right: 12px;
}
.right-rate p span:last-of-type{
   font-size: 12px;
   color:rgb(255, 153, 0);
   line-height: 18px;
}
.right-rate p:last-of-type span:last-of-type{
   font-size: 12px;
   color:  rgb(147, 153, 159);
   line-height: 18px;
}
.userRate{
   font-size: 12px;
}

.all-ratings{
   width: 100%;
    border: 1ps solid rgb(7, 17, 27);
}
.controllBtn{
    padding: 12px 18px;
    border-bottom: 1px solid rgb(7, 17, 27,0.1);
}
.controllBtn>span{
    display: inline-block;
}
.icon{
    font-size: 24px;  
    vertical-align: middle;
    line-height: 24px;
    margin-left: 4px;
}
.unshow{
    color: rgb(147, 153, 159);
}
.show{
    color: rgb(0,160,220);
}
.text{
    font-size: 12px;
    color: rgb(147, 153, 159);
    line-height: 24px;
}
.users-ratings ul li{
   margin-top: 18px;
}
.users-ratings ul li>div:first-of-type{
   margin-bottom: 6px;
}
.users-ratings ul li img{
   width: 28px;
   height: 28px;
   border-radius: 50%;
   margin-right: 12px;
}
.users-ratings ul li p{
   display: inline-block;
}
.users-ratings ul li p span{
   display: block;
   font-size: 10px;
   color: rgb(7, 17, 27);
   line-height: 12px;
}
.users-ratings ul li p span:last-of-type{
   color: rgb(147, 153, 159);
}
.users-ratings ul li p span:first-of-type{
   margin-bottom: 4px;
}
.users-ratings ul li>div>span{
   float: right;
   font-size: 10px;
   font-weight: 200;
   color: rgb(147, 153, 159);
   line-height: 12px;
}
.users-ratings ul li>div:last-of-type{
   font-size: 12px;
   color: rgb(7, 17, 27);
   line-height: 18px;
   margin: 0 40px;
}
</style>