<template>
    <div class="colorPicker">
        <input type="text" class="timeDisplay" placeholder="#FFFFFF" :value="value" @input="inputValue($event)" @click="colorPicker = !colorPicker">
        <div class="time" v-if="colorPicker">
            <div style="display:flex">
                <chrome-picker v-model="color" @input="setTimeValue()"></chrome-picker>
            </div>
            <div style="width:100%">
                <button class="setButton" @click="colorPicker = false;setTimeValue()">Set</button>
            </div>
        </div>
    </div>
</template>
<style>
.setButton{
    width: 100%;
    background: #9292fe;
    color: white;
    padding: 3px;
}
.centerBox{
    text-align: center
}
.timeIcon{
    max-height: 40px;
    border: solid 1px #DDD;
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
    padding: 3px;
}
.timeDisplay{
    font-size: 16px;
    width: 96px;
    height: 40px;
    border: solid 1px #DDD;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    padding: 5px;
    text-align: center;
}
.digitBox{
    background: white;
    border: solid 1px #DDD;
    width: 40px;
    font-size: 16px;
    padding: 2px;
    text-align: center;
}
.box{
    text-align: center;
}
.time{
    background: white;
    z-index: 99;
    position: absolute;
    right: 10px;
    top: -97px;
    -webkit-box-shadow: 1px 2px 15px 0px rgba(179,173,179,1);
    -moz-box-shadow: 1px 2px 15px 0px rgba(179,173,179,1);
    box-shadow: 1px 2px 15px 0px rgba(179,173,179,1);
    border: solid 1px #DDD;
    border-radius: 4px;
}
.colorPicker{
    display: flex;
    position: relative;
}
</style>
<script>
import { Chrome } from 'vue-color';

export default {
    components:{
        'chrome-picker': Chrome,
    },
    props: {
        header: {
            type: Boolean,
            default: true
        },
        value: {
            type: String,
            default: "#f44336"
        }
    },
    data: () => ({
        colorPicker: false,
        color: {hex: '#f44336'},
    }),
    methods:{
        setTime(){
            try{
                this.dTime = this.value.slice(3,5)
                this.dHour = this.value.slice(0,2)
            }catch(e){
                // this.value = this.dHour + ":" + this.dTime
            }
        },
        inputValue(e){
            var data = e.target.value
            if (data.charAt(0) !== '#'){
                data = '#'+data
            }
            if (data.length > 7){
                data = data.slice(0,7)
            }
            this.color.hex = data
            this.$emit('input',data)
        },
        setTimeValue(){
            this.$emit('input',this.color.hex)
        }
    }
}
</script>
