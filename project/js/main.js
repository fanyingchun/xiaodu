
console.log("加载成功");
//引入所有的模块
//配置路径
require.config({
  paths: {
    jquery: "jquery-1.11.3",
    "jquery-cookie": "jquery.cookie",
    parabola: "parabola", //抛物线方程不支持AMD规范
    nav : "nav",
    good_list:"good_list"
  


  },
  shim: {
    //设置依赖关系
    "jquery-cookie": ["jquery"],
    //某一个模块，不遵从AMD
    parabola: {
      exports: "_",
    },
  },
  
});

//调用模块
require(["nav"], function(nav){
  nav.download();
  nav.showlist();

})

require(["good_list"], function(good_list){
  good_list.download();

})


