<template>
    <div class="tab">
        <div class="btn">
            <button disabled="disabled" class="all">全部{{ratings.length}}</button>
            <button disabled="disabled"  class="agree">满意{{this.agree}}</button>
            <button disabled="disabled" class="disagree">不满意{{this.disagree}}</button>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        ratings:{
            type:Array
        }
    },
    computed:{
        agree(){
            let count=0;
            this.ratings.forEach(item=>{   
                item.score>=3?count++:count;   
            })
            return count;
        },
        disagree(){
            let count=0;
            this.ratings.forEach(item=>{   
                item.score<3?count++:count;   
            })
            return count;
        }
    }
}
</script>
<style scoped>
.btn{
    font-size: 12px;
    color: rgb(77, 85, 93);
    line-height: 16px;
    border-bottom: 1px solid rgb(7, 17, 27,0.1);
    padding: 18px 0;
    margin-left: 18px;
}
.btn>button{
    border: none;
    outline: none;
    padding: 8px 12px;
    border-radius: 2px;
    margin-left: 8px;
}
.all{
    color: rgb(255, 255, 255);
    background-color: rgb(0,160,220);
}
.agree{
    background-color: rgb(0,160,220,0.2);   
}
.disagree{
    background-color: rgb(77, 85, 93,0.2);
}
</style>
