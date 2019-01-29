# numberplate
手机端模拟键盘输入车牌

## 使用

在main.js中导入

import numberplate from 'NumberPlate'

Vue.use(numberplate)

在需要使用的页面使用 ``` <numberplate @numPlate="nums"></numberplate>``` 标签

## Event

|事件名 | 说明 | 参数|
|--| -- | --|
|numPlate | 输入完成时触发 | 车牌号|
