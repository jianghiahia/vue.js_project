// 创建评级组件
<template>
    <div class="star" :class="starType">
        <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item" :key="itemClass.id"></span>
    </div>
</template>
<script>
const length=5;
const On="on";
const Half="half";
const Off="off";
export default {
    // 传参
    props:{
        size:{
            type:Number
        },
        score:{
            type:Number
        }
    },
    computed:{
        // 设置类
        starType(){
            return 'star-'+this.size
        },
        itemClasses(){
            let result=[]; //最终的数组
            let num=Math.floor(this.score*2)/2;
            let yushu=num%1!==0; //yushu为1表示有余数
            let zhengshu=Math.floor(num);
            for(var i=0;i<zhengshu;i++){
                result.push(On);
            }
            if(yushu){
                result.push(Half);
            }
            while(result.length<length){
                result.push(Off);
            }            
            return result;
        }
    }
}
</script>
<style scoped>
    .star span {
        display: inline-block;
        margin-right: 10px;
        background-repeat: no-repeat;
        background-size: contain;
    }
    .star span:last-of-type {
        margin-right: 0;
    }
    /* 设置对应尺寸的星星图案大小 */
    /* 24下的星星格式 */
    .star-24 span{   
        width: 10px;
        height: 10px;
    }
    .star-24 .on{
        background-image: url('./star24_on@2x.png');
    }
    .star-24 .half{
        background-image: url('./star24_half@2x.png');
    }
    .star-24 .off{
        background-image: url('./star24_off@2x.png');
    }
    /* 48下的星星格式 */
    .star-48 span{
        width: 15px;
        height: 15px;
        background-repeat: no-repeat;
    }
    .star-48 .on{
        background-image: url('./star24_on@3x.png');
    }
    .star-48 .half{
        background-image: url('./star24_half@3x.png');
    }
    .star-48 .off{
        background-image: url('./star24_off@3x.png');
    }
</style>