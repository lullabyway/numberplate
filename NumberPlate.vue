<template>
    <div id="numberplate">
        <div class="keyboardMask">
            <button id="font" class="flex-btn" @click="btnClickYue" v-bind:class="{isClick: isYue }">{{areaName}}</button>
            <button id='letter' class="flex-btn" @click="btnClickA" v-bind:class="{isClick: isA}">{{areaLetter}}</button>
            <button id='numOne' @click="btnClickNum('one')" v-bind:class="{isNumClick: isNumOne }">{{numOne}}</button>
            <button id='numTwo' @click="btnClickNum('two')" v-bind:class="{isNumClick: isNumTwo }">{{numTwo}}</button>
            <button id='numThree' @click="btnClickNum('three')" v-bind:class="{isNumClick: isNumThree }">{{numThree}}</button>
            <button id='numFour' @click="btnClickNum('four')" v-bind:class="{isNumClick: isNumFour }">{{numFour}}</button>
            <button id='numFive' @click="btnClickNum('five')" v-bind:class="{isNumClick: isNumFive }">{{numFive}}</button>
            <button v-if="checkbox" id='numSix' @click="btnClickNum('six')" v-bind:class="{isNumClick: isNumSix }">{{numSix}}</button>
        </div>
        <div class="new">
            <label class="ze-checkbox">
                <input type="checkbox" v-model="checkbox" @change="carTypeChange" style="width: 25px;height: 25px;">
                <span class="ze-checkbox-text">新能源车</span>
            </label>
        </div>
        <div class="keyboard" v-if="keyboardShow" :class='{animationDown:isDown,animationUp:isUp}'>
            
            <div v-if="keyboard == 'txt'">
                <div class="keyboard-row" v-for="(item,rows) in carTxt">
                    <button class="keyboard-row-item" v-for="(i,index) in item.name" @click="btnWordClick(rows,index,i)">{{i}}</button>
                </div>
                <div class="keyboard-row">
                <!-- <div class="keyboard-row-items"> -->
                    <button class="keyboard-row-item bottom" @click="btnBottomClick('新')">新</button>
                    <button class="keyboard-row-item bottom" @click="btnBottomClick('临')">临</button>
                    <button v-for="j in noneBottomtxt" class="none-botton">{{j}}</button>
                    <button class="keyboard-row-item iconfont icon-wancheng" @click="completeClick"></button>
                    <div class="keyboard-row-item clear iconfont icon-shanchu4" @click="clearClick">
                    </div>
                <!-- </div> -->
                </div>
            </div>
            <div v-if="keyboard == 'num'">
                <div class="keyboard-row" v-for="(item,rows) in carNum">
                    <button :disabled="!isSelectl?isDisable && i<10 :isDisable&& rows!=0 " class="keyboard-row-item" v-for="(i,index) in item.name" @click="btnWordClick(rows,index,i)">{{i}}
                    </button>
                </div>
                <div class="keyboard-row">
                <!-- <div class="keyboard-row-bottom"> -->
                    <button :disabled="isSelectl" v-for="item in carNumBottom" class="keyboard-row-item bottom" @click="btnBottomNumClick(item)">{{item}}</button>
                    <button v-for="j in noneBottom" class="none-botton">{{j}}</button>
                    <button class="keyboard-row-item iconfont icon-wancheng" @click="completeClick"></button>
                    <div class="keyboard-row-item clear iconfont icon-shanchu4" @click="clearClick">  
                    </div>
                <!-- </div> -->
                </div>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    data () {
    　　return {
           numPlate:0,
    　　　　checkbox: false,
    　　　　isDown: false,
    　　　　isUp: false,
    　　　　selected: null,
    　　　　isSelectx: false,
    　　　　isSelectl: false,
    　　　　key: '1',
    　　　　areaName: '',
    　　　　areaLetter: '',
    　　　　numOne: '',
    　　　　numTwo: '',
    　　　　numThree: '',
    　　　　numFour: '',
    　　　　numFive: '',
    　　　　numSix: '',
    　　　　isYue: false,
    　　　　keyboardShow: false,
    　　　　keyboard: false,
    　　　　isA: false,
    　　　　isNumOne: false,
    　　　　isNumTwo: false,
    　　　　isNumThree: false,
    　　　　isNumFour: false,
    　　　　isNumFive: false,
    　　　　isNumSix: false,
    　　　　isDisable: false,
    　　　　carTxt: [
    　　　　　　{ name: ['粤', '京', '冀', '沪', '津', '晋', '蒙', '辽', '吉', '黑'] },
    　　　　　　{ name: ['苏', '浙', '皖', '闽', '赣', '鲁', '豫', '鄂', '湘', '桂'] },
    　　　　　　{ name: ['琼', '渝', '川', '贵', '云', '藏', '陕', '甘', '青', '宁'] }
    　　　　],
    　　　　carNumBottom: ['W', 'X', 'Y', 'Z'],
    　　　　noneBottom: ['', '', '', ''],
    　　　　noneBottomtxt: ['', '', '', '', '', ''],
    　　　　carNum: [
    　　　　　　{ name: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'] },
    　　　　　　{ name: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K'] },
    　　　　　　{ name: ['L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V'] }
    　　　　],
    　　　　addedCarNum: ''
    　　}
    },
    watch: { 
    　　checkbox: function (val, oldval) { //监听是否为新能源
    　　　　this.isNumOne = false
    　　　　this.isNumTwo = false
    　　　　this.isNumThree = false
    　　　　this.isNumFour = false
    　　　　this.isNumFive = false
    　　　　this.isNumSix = false
    　　　　const vm = this
    　　　　if (!val) {
    　　　　// 切换到普通车牌
    　　　　　　if (vm.numFour) {
    　　　　　　　　vm.isNumFive = true
    　　　　　　　　vm.key = 7
    　　　　　　}
    　　　　　　} else {
    　　　　　　// 切换到新能源车牌
    　　　　　　　　if (vm.numFive) {
    　　　　　　　　vm.isNumSix = true
    　　　　　　　　vm.key = 8
    　　　　　　}
    　　　　}
    　　},
    　　numFive: function (val) { //监听是否为普通车牌最后一位
    　　　　if (!this.checkbox && val) {
    　　　　　　 this.isUp = false
    　　　　　　 this.isDown = true
    　　　　　　 this.isNumFive = false
                this.completeClick ()
    　　　　}
    　　},
    　　numSix: function (val) { //监听是否为新能源车牌最后一位
    　　　　if (this.checkbox && val) {
    　　　　　　 this.isUp = false
    　　　　　　 this.isDown = true
    　　　　　　 this.isNumSix = false
                this.completeClick ()
    　　　　}
    　　}
    },
    //methods
    methods: {
    　　// 车牌类型切换
    　　carTypeChange (val) {
    　　　　this.isNumOne = false
    　　　　this.isNumTwo = false
    　　　　this.isNumThree = false
    　　　　this.isNumFour = false
    　　　　this.isNumFive = false
    　　　　this.isNumSix = false
    　　　　if (!val) {
    　　　　// 切换到普通车牌
    　　　　　　if (this.numFour) {
    　　　　　　　　this.isNumFive = true
    　　　　　　　　this.key = 7
    　　　　　　}
    　　　　} else {
    　　　　// 切换到新能源车牌
    　　　　　　if (this.numFive) {
    　　　　　　　　this.isNumSix = true
    　　　　　　　　this.key = 8
    　　　　　　}
    　　　　}
    　　},
    　　// 车牌号第一位输入框选择
    　　btnClickYue () {
    　　　　this.isYue = true
    　　　　this.isA = false
    　　　　this.isUp = true
    　　　　this.isNumOne = false
    　　　　this.isNumTwo = false
    　　　　this.isNumThree = false
    　　　　this.isNumFour = false
    　　　　this.isNumFive = false
    　　　　this.isNumSix = false
    　　　　this.keyboardShow = true
    　　　　this.keyboard = 'txt'
    　　　　this.key = 1
    　　},
    　　// 键盘选择显示
    　　btnWordClick (rows, index, i) {
    　　　　this.selected = i
    　　　　if (this.key === 1) {
    　　　　　　if (this.areaName === '临') {
    　　　　　　　　this.areaLetter = ''
    　　　　　　　　this.numOne = ''
    　　　　　　　　this.numTwo = ''
    　　　　　　　　this.numThree = ''
    　　　　　　　　this.numFour = ''
    　　　　　　　　this.numFive = ''
    　　　　　　　　this.numSix = ''
    　　　　　　}
    　　　　　　this.areaName = i
    　　　　　　this.isSelectl = false
    　　　　　　document.getElementById('letter').click()
    　　　　} else if (this.key === 2) {
    　　　　　　this.areaLetter = i
    　　　　　　document.getElementById('numOne').click()
    　　　　} else if (this.key === 3) {
    　　　　　　this.numOne = i
    　　　　　　document.getElementById('numTwo').click()
    　　　　} else if (this.key === 4) {
    　　　　　　this.numTwo = i
    　　　　　　document.getElementById('numThree').click()
    　　　　} else if (this.key === 5) {
    　　　　　　this.numThree = i
    　　　　　　document.getElementById('numFour').click()
    　　　　} else if (this.key === 6) {
    　　　　　　this.numFour = i
    　　　　　　document.getElementById('numFive').click()
    　　　　} else if (this.key === 7) {
    　　　　　　this.numFive = i
    　　　　　　if (this.checkbox) {
    　　　　　　　　document.getElementById('numSix').click()
    　　　　　　}
    　　　　} else if (this.key === 8) {
    　　　　　　this.numSix = i
    　　　　}
    　　　　if (this.key === 7 || this.key === 8) {
    　　　　　　this.carNumBottom = ['W', 'X', 'Y', 'Z', '港', '澳', '台']
    　　　　　　this.noneBottom = ['']
    　　　　} else if (this.key === 3 || this.key === 4 || this.key === 5 || this.key === 6) {
    　　　　　　this.carNumBottom = ['W', 'X', 'Y', 'Z']
    　　　　　　this.noneBottom = ['', '', '', '']
    　　　　}
    　　},
    　　// 车牌第一位选择‘临’,’新‘后的键盘显示
    　　btnBottomClick (val) {
    　　　　if (val === '新') {
    　　　　　　if (this.areaName === '临') {
    　　　　　　　　this.areaLetter = ''
    　　　　　　　　this.numOne = ''
    　　　　　　　　this.numTwo = ''
    　　　　　　　　this.numThree = ''
    　　　　　　　　this.numFour = ''
    　　　　　　　　this.numFive = ''
    　　　　　　　　this.numSix = ''
    　　　　　　}
    　　　　　　this.areaName = '新'
    　　　　　　this.isSelectx = true
    　　　　　　this.isSelectl = false
    　　　　　　document.getElementById('letter').click()
    　　　　} else if (val === '临') {
    　　　　　　this.areaName = '临'
    　　　　　　this.isSelectl = true
    　　　　　　this.isSelectx = false
    　　　　　　this.isDisable = true
    　　　　　　this.areaLetter = ''
    　　　　　　this.numOne = ''
    　　　　　　this.numTwo = ''
    　　　　　　this.numThree = ''
    　　　　　　this.numFour = ''
    　　　　　　this.numFive = ''
    　　　　　　this.numSix = ''
    　　　　　　document.getElementById('letter').click('isLin')
    　　　　}
    　　},
    　　// 键盘最后一行字母点击事件
    　　btnBottomNumClick (i) {
    　　　　this.selected = i
    　　　　if (this.key === 2) {
    　　　　　　this.areaLetter = i
    　　　　　　document.getElementById('numOne').click()
    　　　　} else if (this.key === 3) {
    　　　　　　this.numOne = i
    　　　　　　document.getElementById('numTwo').click()
    　　　　} else if (this.key === 4) {
    　　　　　　this.numTwo = i
    　　　　　　document.getElementById('numThree').click()
    　　　　} else if (this.key === 5) {
    　　　　　　this.numThree = i
    　　　　　　document.getElementById('numFour').click()
    　　　　} else if (this.key === 6) {
    　　　　　　this.numFour = i
    　　　　　　document.getElementById('numFive').click()
    　　　　} else if (this.key === 7) {
    　　　　　　this.numFive = i
    　　　　　　if (this.checkbox) {
    　　　　　　　　document.getElementById('numSix').click()
    　　　　　　}
    　　　　} else if (this.key === 8) {
    　　　　　　this.numSix = i
    　　　　}
    　　},
    　　// 车牌号第二位输入框选择
    　　btnClickA () {
    　　　　this.isDisable = true
    　　　　this.isA = true
    　　　　this.isYue = false
    　　　　this.isUp = true
    　　　　this.isNumOne = false
    　　　　this.isNumTwo = false
    　　　　this.isNumThree = false
    　　　　this.isNumFour = false
    　　　　this.isNumFive = false
    　　　　this.isNumSix = false
    　　　　this.keyboardShow = true
    　　　　this.keyboard = 'num'
    　　　　this.key = 2
    　　},
    　　// 车牌号后五位或六位输入框选择
    　　btnClickNum (name) {
    　　　　if (this.isSelectl) {
    　　　　　　this.isDisable = true
    　　　　} else {
    　　　　　　this.isDisable = false
    　　　　}
    　　　　this.keyboard = 'num'
    　　　　this.keyboardShow = true
    　　　　this.isYue = false
    　　　　this.isA = false
    　　　　this.isNumOne = false
    　　　　this.isNumTwo = false
    　　　　this.isNumThree = false
    　　　　this.isNumFour = false
    　　　　this.isNumFive = false
    　　　　this.isNumSix = false
    　　　　this.isUp = true
    　　　　if (name === 'one') {
    　　　　　　this.isNumOne = true
    　　　　　　this.key = 3
    　　　　} else if (name === 'two') {
    　　　　　　this.isNumTwo = true
    　　　　　　this.key = 4
    　　　　} else if (name === 'three') {
    　　　　　　this.isNumThree = true
    　　　　　　this.key = 5
    　　　　} else if (name === 'four') {
    　　　　　　this.isNumFour = true
    　　　　　　this.key = 6
    　　　　} else if (name === 'five') {
    　　　　　　this.isNumFive = true
    　　　　　　this.key = 7
    　　　　} else if (name === 'six') {
    　　　　　　this.isNumSix = true
    　　　　　　this.key = 8
    　　　　}
    　　　　if (name === 'five' || name === 'six') {
    　　　　　　this.carNumBottom = ['W', 'X', 'Y', 'Z', '港', '澳', '学']
    　　　　　　this.noneBottom = ['']
    　　　　} else {
    　　　　　　this.carNumBottom = ['W', 'X', 'Y', 'Z']
    　　　　　　this.noneBottom = ['', '', '', '']
    　　　　}
    　　},
    　　// 键盘点击‘完成’
    　　completeClick () {
    　　　　this.isYue = false
    　　　　this.isA = false
    　　　　this.isNumOne = false
    　　　　this.isNumTwo = false
    　　　　this.isNumThree = false
    　　　　this.isNumFour = false
    　　　　this.isNumFive = false
    　　　　this.isNumSix = false
    　　　　this.isUp = false
    　　　　this.isDown = true
    　　　　this.keyboardShow = false
            if(this.numSix!=''){
                this.numPlate=this.areaName+this.areaLetter+this.numOne+this.numTwo+this.numThree+this.numFour+this.numFive+this.numSix
            }else{
                this.numPlate=this.areaName+this.areaLetter+this.numOne+this.numTwo+this.numThree+this.numFour+this.numFive
            }
            this.$emit('numPlate',this.numPlate)
    　　},
    　　// 键盘点击‘删除’
    　　clearClick () {
    　　　　if (this.key === 1) {
    　　　　　　this.areaName = ''
    　　　　} else if (this.key === 2) {
    　　　　　　document.getElementById('font').click()
    　　　　　　this.areaLetter = ''
    　　　　} else if (this.key === 3) {
    　　　　　　document.getElementById('letter').click()
    　　　　　　this.numOne = ''
    　　　　} else if (this.key === 4) {
    　　　　　　document.getElementById('numOne').click()
    　　　　　　this.numTwo = ''
    　　　　} else if (this.key === 5) {
    　　　　　　document.getElementById('numTwo').click()
    　　　　　　this.numThree = ''
    　　　　} else if (this.key === 6) {
    　　　　　　document.getElementById('numThree').click()
    　　　　　　this.numFour = ''
    　　　　} else if (this.key === 7) {
    　　　　　　document.getElementById('numFour').click()
    　　　　　　this.numFive = ''
    　　　　} else if (this.key === 8) {
    　　　　　　document.getElementById('numFive').click()
    　　　　　　this.numSix = ''
    　　　　}
    　　 },
    // 　　addCar () {
    // 　　　var myApp = new Framework7()
    // 　　　　var num
    // 　　　　var str = document.getElementById('picker-str-date').value
    // 　　　　var end = document.getElementById('picker-end-date').value
    // 　　　　var bt = new Date(str.replace(/\-/g, '\/'))
    // 　　　　var et = new Date(end.replace(/\-/g, '\/'))
    // 　　　　if (!this.checkbox) {
    // 　　　　　　num = this.areaName + this.areaLetter + this.numOne + this.numTwo + this.numThree + this.numFour + this.numFive
    // 　　　　} else if (this.checkbox) {
    // 　　　　　　num = this.areaName + this.areaLetter + this.numOne + this.numTwo + this.numThree + this.numFour + this.numFive + this.numSix
    // 　　　　}
    // 　　　　if (num === '') {
    // 　　　　　　this.toastMessage('请输入车牌', 1000)
    // 　　　　} else if (!this.checkbox && (this.areaName === '' || this.areaLetter === '' || this.numOne === '' || this.numTwo === '' || this.numThree === '' || this.numFour === '' || this.numFive === '')) {
    // 　　　　　　this.toastMessage('请输入完整车牌', 1000)
    // 　　　　} else if (this.checkbox && (this.areaName === '' || this.areaLetter === '' || this.numOne === '' || this.numTwo === '' || this.numThree === '' || this.numFour === '' || this.numFive === '' || this.numSix === '')) {
    // 　　　　　　this.toastMessage('请输入完整车牌', 1000)
    // 　　　　} else if (str !== '' && end !== '' && bt >= et) {
    // 　　　　　　this.toastMessage('开始时间必须早于结束时间', 1000)
    // 　　　　}
    //     }
    }　
}
</script>
<style>
#numberplate,
.keyboardMask {
    width: 100%;
}
.keyboardMask,
.flex-btns,
.keyboard-row
 {
    display: flex;
    justify-content: space-around;  
}
.keyboardMask {
    padding: 0 10px
}
.keyboardMask>button {
    width: 44px;
    height: 50px;
    background-color: #fff;
    border: 1px solid #409eff;
    font-size: 14px;
    border-radius: 3px
}
.keyboard-row-item {
    margin-bottom: 8px;
    background-color: #fff;
    font-size: 14px;
    border-radius: 5px;
    border: 1px solid #d5d5d5;
    height: 50px;
    width: 40px;
}
.keyboard {
    width: 100%;
    position: fixed;
    bottom: 0;
    z-index: 999;
    background-color: #eeeeee;
    padding: 10px 5px 0 5px
}
.none-botton {
    border: none;
    height: 50px;
    width: 40px;
    visibility: hidden;
}
.clear {
    text-align: center;
    line-height: 50px;
}
.new {
    text-align: right;
    padding-right: 15px;
    font-size: 14px;
    
}
.ze-checkbox {
    position: relative;
    display: block;
    height: 40px;
    line-height: 40px;
}
.ze-checkbox>input {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 60px
}
.ze-checkbox>span {
    display: inline-block;
    height: 40px;
    line-height: 40px;
}

#numberplate .iconfont {
    color: #000;
    font-size: 20px
}
</style>
