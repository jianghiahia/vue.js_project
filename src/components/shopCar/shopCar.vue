<template>
    <div class="shopCar" >
        <div class="content" @click="showDetail">
            <div class="left-content">
                <div class="logo">
                    <span :class="totalCount>0?'blue':'gray'" class="icon-shopping_cart shopIcon "></span>
                    <span v-if="totalCount>0" class="count">{{totalCount}}</span>
                </div>
                <div v-if="totalCount" class="price">￥{{totalPrice}}</div>
                <div v-else class="price">￥0</div>
                <div class="desc">另需配送费￥{{deliveryPrice}} 元</div>
            </div>
            <div class="right-content">
                <div v-if="totalPrice<minPrice&&totalPrice!=0">还剩￥{{minPrice-totalPrice}} 元起送</div>
                <div class="pay" v-else-if="totalPrice>=minPrice">立即结算</div>
                <div v-else>￥{{minPrice}}   元起送</div>
            </div>
        </div>
        <div class="detail-shop" v-show="listShow" ref="listContent">
                <div class="detail-content">
                    <p><span>购物车</span><span @click="cls">清空</span></p>
                    <ul class="shopList">
                        <li v-for="item in selectedFood" :key="item.name" class="li-item">
                            <span>{{item.name}}</span>
                            <span class="item-price">￥{{item.price*item.count}}</span><cartcontroll :food="item"></cartcontroll>
                        </li>
                    </ul>
                </div>
            </div>
    </div>
</template>
<script>
import BScroll from 'better-scroll';
import cartcontroll from '../cartcontroll/cartcontroll';
export default {
    props:{
        deliveryPrice:Number,
        minPrice:Number,
        selectedFood:{
            type:Array,
            default(){
                return []
            }
        }
        
    },
    data(){
        return {
            fold:true
        }
        
    },
    components:{
        cartcontroll
    },
    computed:{
        totalPrice(){
            let total=0;
            this.selectedFood.forEach((food)=>{
                total+=food.price*food.count;
            })
            return total;
        },
        totalCount(){
            let count=0;
            this.selectedFood.forEach((food)=>{
                count+=food.count;
            })
            return count;
        },
        listShow(){
            if(!this.totalCount){
                this.fold=true;
                return false;
            }
            let show=!this.fold;
            if(show){
                this.$nextTick(()=>{
                    if(!this.scroll){
                        this.scroll=new BScroll(this.$refs.listContent,{
                            click:true
                        })
                    }else{
                        this.scroll.refresh();
                    }
                    
                })
            }
            return show;
        }
    },
    methods:{
        showDetail(){
            if(!this.totalCount){
                return;
            }
            this.fold=!this.fold;
            return this.fold;
        },
        cls(){
            this.selectedFood.forEach((item=>{
                item.count=0;
            }))
        }
    }
}
</script>
<style scoped>
.shopCar{
    position: fixed;
    bottom: 0;
    left: 0;
    height: 48px;
    width: 100%;
    z-index: 100;
    background-color: #141d27;
}
.content{
    display: flex;
    width: 100%;
    height: 100%;
}
.left-content{
    flex: 1;
    height: 48px;
    font-size: 0;
}
.left-content>div{
    display: inline-block;
}
.logo{
    position: relative;
    width: 46px;
    height: 46px;
    padding: 6px;
    text-align: center;
    border-radius: 50%;
    margin-top: -10px;
    margin-left: 18px;
    background-color: #141d27;
}
.shopIcon{
    display: block;
    width: 100%;
    height: 100%;
    font-size: 24px;
    color: rgb(255, 255, 255,0.4);
    line-height: 46px;
    border-radius: 50%; 
}
.gray{
     background-color: rgb(255, 255, 255,0.2);
}
.blue{
    color: rgb(255, 255, 255);
    background-color: rgb(53, 140, 199);
}
.count{
    position: absolute;
    top: 0;
    right: 0;
    transform: translateX(10%);
    font-size: 9px;
    font-weight: 700;
    color: rgb(255, 255, 255);
    line-height: 9px;
    padding:3px 6px;
    background-color: rgb(240,20,20);
    border-radius: 6px;
    box-shadow: 0px 4px 8px 0px rgba(0,0,0,0.4);
}
.price{
    font-size: 16px;
    color: rgb(255, 255, 255,0.4);
    font-weight: 700;
    line-height: 24px;
    padding-right: 12px;
    border-right: 1px solid  rgb(255, 255, 255,0.1);
    margin-left: 15px;
}
.desc{
    font-size: 12px;
    color: rgb(255, 255, 255,0.4);
    line-height: 24px; 
    margin-left: 12px;
}
.right-content{
    width: 105px;
    height: 100%;
    font-size: 12px;
    color: rgb(255, 255, 255,0.4);
    text-align: center;
    font-weight: 700;
    line-height: 48px;
    background-color: rgb(255, 255, 255,0.2);
}
.pay{
    background-color: rgb(6, 158, 69);
}
.detail-shop{
    position: absolute;
    width: 100%;
    height: 630px;
    bottom: 40px;
    box-sizing: border-box;
    background-color: rgba(7,17,27,0.6);
    z-index: -1;  
}
.detail-content{
    position: absolute;
    width: 100%;
    bottom: 8px;
    background-color: #FFFFFF;
}
.detail-content p{
    width: 100%;
    height: 40px;
    background-color: #f3f5f7;
    border-bottom: 1px solid rgba(7,17,27,0.1);
    overflow: hidden;
}
.detail-content>p span{
    float: left;
    font-size: 14px;
    font-weight: 200;
    color: rgb(7, 17, 27); 
    line-height: 40px; 
    margin-left: 18px;
}
.detail-content p span:last-of-type{
    float: right;
    font-size: 12px;
    color: rgb(0, 160, 220); 
    margin-right: 18px;
}
.shopList{
    max-height: 305px;
    overflow: scroll;
}
.shopList::-webkit-scrollbar{
    display: none;
}
.li-item{
    position: relative;
    height: 48px;
    font-size: 14px;
    color: rgb(7, 17, 27); 
    line-height: 48px;
    padding: 18px 12px;
    border-bottom: 1px solid rgba(7,17,27,0.1);
}
.li-item .cartcontroll{
    bottom: 30px;
    right: 18px;
}
.item-price{
    position: absolute;
    bottom: 20px;
    right: 100px;
    font-size: 14px;
    font-weight: 700;
    color: rgb(240, 20, 20); 
    line-height: 44px;
}
</style>