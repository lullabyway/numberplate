// 自定义车牌输入模拟键盘组件
import NumberPlate from './NumberPlate.vue'

const numberplate={
    install:function(Vue){
        Vue.component('numberplate',NumberPlate)
    }
}

export default numberplate