<template>
    <div class="header">

        <!-- 头部的上部 -->
        <div class="content-wrapper">
            <!-- 左侧图像 -->
            <div class="avatar">
                <img :src="seller.avatar" style="width:64px; height:64px;">
            </div>
            <!-- 右侧内容区域 -->
            <div class="content">
                <!-- 右侧上部分 -->
                <div class="content-top">
                    <img src="./brand@2x.png"><span class="seller-name">{{seller.name}}</span>
                </div>
                <div v-if="seller.supports" class="content-middle">
                    <span>{{seller.description}}/{{seller.deliveryTime}}分钟送达</span>
                </div>
                <div v-if="seller.supports" class="content-bottom">
                    <icon :typenum="seller.supports[0].type"></icon><span>{{seller.supports[0].description}},满50减10</span>
                </div>   
            </div>
            <div v-if="seller.supports" class="support-count">
                <span class="count">{{seller.supports.length}}个</span>
                <i class="icon-keyboard_arrow_right" @click="showDetail"></i>
            </div>
        </div>

        <!-- 头部的下部 -->
        <div class="bulletin-wrapper">
            <img src="./bulletin@2x.png"><span>{{seller.bulletin}}</span><i class="icon-keyboard_arrow_right" @click="showDetail"></i>
        </div>

        <!-- 背景部分 -->
        <div class="background">
            <img :src="seller.avatar" style="width:100%; height:100%;">
        </div>

        <!-- 详情页部分 -->
        <div class="detail" v-show="detailShow">
            <div class="detailBody">
                <div class="detail-title">
                    <span>{{seller.name}}</span>
                    <div class="scorePart">
                        <star :size="48" :score="seller.score"></star>
                    </div>
                </div>
                <div class="detail-message">
                    <div class="discount-title">
                        <span class="border-left"></span><p>优惠信息</p><span class="border-right"></span>
                    </div>
                    <div class="discount-message">
                        <div v-for="itemSupport in seller.supports" :key="itemSupport.type" class="item-discount-message">
                            <icon :typenum="itemSupport.type"></icon>
                            <span>{{itemSupport.description}}</span>
                        </div>
                    </div>
                    <div class="seller-title">
                        <span class="border-left"></span><p>商家公告</p><span class="border-right"></span>
                    </div>
                    <div v-if="seller.supports"  class="seller-message">{{seller.bulletin}}</div>
                </div>
            </div>
            <div v-if="seller.supports" class="detail-close">
                <i class="icon-close" @click="closeDetail"></i>
            </div>
        </div>
    </div>
</template>
<script>
import star from '../star/star';
import icon from '../textIcon/icon';
export default {
    // 接收父组件的传值
    props:{
        seller:{
            type:Object
        }
    },
    data:function(){
        return {
            detailShow:false
        }
    },
    methods:{
       showDetail:function(){
           this.detailShow=true;        
       },
       closeDetail:function(){
            this.detailShow=false;
       }
    },
    components:{
        star,
        icon
    }
}
</script>
<style  scoped>
    .header{
        position: relative;
        overflow: hidden;
        background: rgba(7,17,27,0.2);
    }
    .content-wrapper{
        position: relative;
        font-size: 0;
        overflow: hidden;
        margin: 24px 12px 18px 24px;
    }
    .content-wrapper>div{
        float: left;
    }
    .avatar>img{
        border-radius: 2px;
    }
    .content{ 
        margin-left: 16px;
    }
    .content-top{
        font-size: 0;
        overflow: hidden;
        margin: 2px 0 8px 0;
    }
    .content-top>img{
        width: 30px;
        height: 18px;
        vertical-align: top;
        margin-right: 6px;
    }
    .content-top .seller-name{
        font-size: 16px;
        color: rgb(255,255,255);
        font-weight: bold;
        line-height: 18px;
    }
    .content-middle{
        margin-bottom: 10px;
    }
    .content-middle span{
        font-size: 12px;
        color: rgb(255,255,255);
        font-weight: 100;
        line-height: 12px;
    }
    .content-bottom {
        margin-bottom: 2px;
    }
    .content-bottom span,
    .support-count span{
        font-size: 10px;
        color: rgb(255,255,255);
        font-weight: 100;
        line-height: 12px;
    }
    .support-count{
        position: absolute;
        bottom: 0;
        right: 0;
        padding: 7px 8px;
        border-radius: 12px;
        background-color: rgba(0,0,0,0.2);
    }
    .support-count .icon-keyboard_arrow_right{
        font-size: 10px;
        color: rgb(255,255,255);
        margin-left: 2px;
    }
    .bulletin-wrapper{
        position: relative;
        height: 28px;
        color: rgb(255,255,255);
        background-color: rgba(0,0,0,0.2);
        padding: 0 12px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .bulletin-wrapper img{
        width: 22px;
        height: 12px;
        margin-right: 4px;
        vertical-align: middle;
    }
    .bulletin-wrapper span{
        font-size: 10px;
        font-weight: 100;
        line-height: 28px;
        margin-left: 4px;
    }
    .bulletin-wrapper .icon-keyboard_arrow_right{
        position: absolute;
        right: 6px;
        top: 50%;
        margin-top: -5px;
        font-size: 10px;
        color: rgb(255,255,255);
        margin-left: 2px;
    }
    .background{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        /* 模糊效果 */
        filter: blur(10px);
    }
    .detail{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 556px;
        text-align: center;
        background: rgba(7,17,27,0.5);
        z-index: 10;  
        padding-top: 64px; 
        overflow: scroll;
    }
    .detail::-webkit-scrollbar{
        display: none;
    }
    .detailBody{
        position: relative;
        /* height: 100%; */
        padding-bottom: 64px;
    }
    .score{
        margin-top: 16px;
        margin-bottom: 28px;
    }
    .detail-title{
        font-size: 16px;
        font-weight: 700;
        color: rgb(255,255,255);
        line-height: 16px;
    }
    .scorePart{
        margin-top: 16px;
        margin-bottom: 28px;
    }
    .detail-message{
        position: relative;
        padding:0 36px;
    }
    .item-discount-message{
        font-size: 12px;
        font-weight: 200;
        line-height: 12px;
        margin-bottom: 12px;
        margin-left: 12px;
    }
    .item-discount-message .icon{
        width: 16px;
        height: 16px;
    }
    .discount-title,
    .seller-title{
        font-size: 14px;
        font-weight: 700;
        color: rgb(255,255,255);
        line-height: 14px;
        overflow: hidden;
    }
    .discount-title span,
    .seller-title span{
        float: left;
        width: 120px;
        margin-top: 7px;
        border-top: 1px solid rgb(255,255,255);
    }
    .discount-title p,
    .seller-title p{
        float: left;
        text-align: center;
    }
    .border-left{  
        margin-right: 12px;
    }
    .border-right{
        margin-left: 12px;
    }
    .discount-message,
    .seller-message{
        font-size: 12px;
        font-weight: 200;
        color: rgb(255,255,255);
        text-align: left;
        line-height: 12px;
        margin-top: 24px;
        margin-bottom: 28px;
    }
    .seller-message{
        line-height: 24px;
        margin:24px 12px 0;
    }
    .detail-close{
        position: relative;
        height: 32px;
        margin-bottom: 32px; 
    }
    .icon-close{
        position: absolute;
        left: 50%;
        bottom: 50%;
        transform: translate(-50%,50%);
        font-size: 32px;
        color: rgb(255,255,255);
    }
</style>