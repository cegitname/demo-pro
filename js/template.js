const compiler = require('vue-template-compiler')
// 插值
const template = `<input v-model="name"></input>`

// 编译
const res = compiler.compile(template)
/*
with(this){return _c('input',
  {
    directives:[{name:"model",rawName:"v-model",value:(name),expression:"name"}],
    domProps:{"value":(name)},
    on:{"input":function($event){
          if($event.target.composing)
          return;name=$event.target.value
        }
       }
  })
} 
*/


