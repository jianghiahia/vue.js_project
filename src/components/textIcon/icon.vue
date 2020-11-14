<template>
     <span class="icon" :class="classMap[typenum]"></span>
</template>
<script>
export default {
    props:{
        typenum:{
            type: Number
        }
    },
     data:function(){
        return {
            classMap:[]
        }
    },
    created(){
        // 对应的类型对应的活动图标
        this.classMap=['decrease','discount','guarantee','special','invoice'];
    }
}
</script>
<style scoped>
    .icon{
        float: left;
        width: 12px;
        height: 12px;
        background-repeat: no-repeat;
        background-size: contain;
        margin-right: 4px;
        vertical-align: top;
    }
    .decrease{
        background-image: url('./decrease_2@3x.png');
    }
    .discount{
        background-image: url('./discount_2@2x.png');
    }
    .guarantee{
        background-image: url('./guarantee_2@2x.png');
    }
    .special{
        background-image: url('./special_2@2x.png');
    }
    .invoice{
        background-image: url('./invoice_2@2x.png');
    }
</style>