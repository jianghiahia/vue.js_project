<template>
    <div class="cartcontroll">
        <div class="sub icon-remove_circle_outline" v-show="food.count>0" @click="subFood($event)"></div>
        <div class="count" v-show="food.count>0">{{food.count}}</div>
        <div class="add icon-add_circle"  @click="addFood($event)"></div>
    </div>
</template>
<script>
import Vue from 'vue';
export default {
    props:{
        food:{
            type:Object
        }
    },
    methods:{
        addFood(event){
            // 防止多次被点击
            if(!event._constructed){
                return
            } 
           if(!this.food.count){
            //如果count属性不存在，就设置count属性并赋值为1
               Vue.set(this.food,'count',1);
           }else{
                this.food.count++;
            }
        },
        subFood(event){
            if(!event._constructed){
                return
            }
            this.food.count--;    
        }
    }
}
</script>
<style scoped>
.cartcontroll{
    position: absolute;
    bottom: -2px;
    right: 0;
    font-size: 24px;
    text-align: center;
    color: rgb(0, 160, 220);
    overflow: hidden;
}
.cartcontroll>div{
    float: left;
}
.count{
    width: 24px;
    font-size: 10px;
    color: rgb(147, 153, 159);
    line-height: 24px;
}
</style>