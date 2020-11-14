<template>
    <div class="goods">
        <div class="memu-wrapper" ref="memuWrapper">
            <ul>
                <li @click="selectMemu(index,$event)" class="memu-li" v-for="(item,index) in goods" :key="item.name" :class="{'current':currentIndex===index}">
                    <p>
                        <icon v-if="item.type>0" :typenum="item.type"></icon>
                        <span>{{item.name}}</span>
                    </p>
                </li>
            </ul>
        </div>
        <div v-if="goods" class="foods-wrapper" ref="foodsWrapper">
            <div>
                <ul v-for="item in goods" :key="item.name" class="food-list-hook">
                    <li class="item-name">{{item.name}}</li>
                    <li class="itemFoods" v-for="food in item.foods" :key="food.name">
                        <div class="foods-left">
                            <img :src="food.icon" alt="" class="foodPic">
                        </div>
                        <div class="foods-right">
                            <p class="foods-name">{{food.name}}</p>
                            <p class="foods-about">{{food.description}}</p>
                            <p class="foods-about"><span>月售{{food.sellCount}}份</span> <span>好评率{{food.rating}}%</span></p>
                            <p class="price"><span class="nowPrice">￥{{food.price}}</span> <span class="oldPrice" v-show="food.oldPrice">￥{{food.oldPrice}}</span><cartcontroll class="cartcontroll" :food="food"></cartcontroll></p>
                        </div> 
                    </li>
                </ul>
            </div>       
        </div>
         <shopCar :selectedFood="selectedFood" class="shopCar" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopCar>
    </div>
</template>
<script>
import icon from '../textIcon/icon';
import BScroll from 'better-scroll';
import shopCar from '../shopCar/shopCar';
import cartcontroll from '../cartcontroll/cartcontroll';
export default {
    data(){
        return {
            goods: [],
            listHeight:[],
            scrollY:0,
            seller:{}
        }
    },
    created(){
        this.$axios.get('/api/goods').then(res => {
          // res.data是响应到客户端的数据，是个对象
          if (res.data.errno === 0) {
              this.goods = res.data.data;
              this.$nextTick(() => { 
                this.initScroll();
                this.getHeight();
              })            
          }        
      })
      this.$axios.get('/api/seller').then(res=>{
          if(res.data.errno==0){
             this.seller=res.data.data;
          }          
       })
    },
    methods:{
        initScroll(){
            this.memuScroll=new BScroll(this.$refs.memuWrapper,{
                click:true
            });
            this.foodsScroll=new BScroll(this.$refs.foodsWrapper,{
                probeType:3,
                click:true
            });
            this.foodsScroll.on('scroll',(pos)=>{
                this.scrollY=Math.abs(Math.round(pos.y));
            })
        },
        getHeight(){
            // 获取元素
            let foodlist =this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
            let height=0;
            this.listHeight.push(height);
            for(let i=0;i<foodlist.length;i++){
                let item=foodlist[i];
                height+=item.clientHeight;
                this.listHeight.push(height);
            }  
        },
        selectMemu(index,event){
            // 如果是自带的点击事件就return，阻止执行
            if(!event._constructed){
                return
            }
            let foodlist =this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
            let el=foodlist[index];
            this.foodsScroll.scrollToElement(el,300);
        }

    },
    computed:{
        currentIndex(){
            for(let i=0;i<this.listHeight.length;i++){
                let height1=this.listHeight[i];
                let height2=this.listHeight[i+1];
                if(!height2 || (this.scrollY>=height1 && this.scrollY<height2)){
                    return i;
                }
            }       
            return 0;
        },
        selectedFood(){
            let foods=[];
            this.goods.forEach((good)=>{
                good.foods.forEach((food)=>{
                    if(food.count){
                        foods.push(food);
                    }
                });
            });
            return foods;
        }
    },
    components:{
        icon,
        shopCar,
        cartcontroll
    }  
}
</script>
<style  scoped>

.goods{
    display: flex;
    height: 446px;
    overflow: hidden;
}
.memu-wrapper{
    width: 80px;
}
.memu-li{
    font-size: 12px;
    color: rgb(147, 153, 159);
    font-weight: 200;
    line-height: 14px;  
    padding: 20px 12px 0;
    background-color: #f3f5f7;
}
.memu-li p{
    padding-bottom: 20px;
    border-bottom: 1px solid rgb(1, 17, 27,0.1) ;
}
.current{
    background-color: #fff;
    color: #000;
    font-weight: 700;
}
.foods-wrapper{
    flex: 1;
    overflow: hidden;
}
.itemFoods{
    display: flex;
    padding: 18px;
}
.foods-left{
    display: inline-block;
    width: 60px;
    height: 60px;
    margin-right: 10px;
}
.foodPic{
    width: 100%;
    height: 100%;
    border-radius: 5px;
}
.foods-right{
    flex: 1;
}
.item-name{
    font-size: 12px;
    color: rgb(147, 153, 159);
    line-height: 26px;
    background-color: #f3f5f7;
    padding-left: 14px;
    border-left: 2px solid #d9dde1;
}
.foods-name{
    font-size: 14px;
    color: rgb(1, 17, 27);
    line-height: 14px;
    margin-top: 2px;
}
.foods-about{
    font-size: 10px;
    color: rgb(147, 153, 159);
    line-height: 14px;
    margin-top: 8px;
}
.nowPrice{
    font-size: 14px;
    color: rgb(187, 47, 47);
    font-weight: 700;
    line-height: 24px;
    margin-right: 8px;
}
.oldPrice{
    font-size: 10px;
    color: rgb(147, 153, 159);
    font-weight: 700;
    line-height: 24px; 
    text-decoration: line-through; 
}
.cartcontroll{
    display: inline-block;
}
.price{
    position: relative;
}
</style>