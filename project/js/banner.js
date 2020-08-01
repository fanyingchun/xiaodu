
console.log("加载成功");
//引入所有的模块
//配置路径
require.config({
  paths: {
    jquery: "jquery-1.11.3",
    "jquery-cookie": "jquery.cookie",
    parabola: "parabola", //抛物线方程不支持AMD规范
    index_banner:"index_banner"


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

require(["index_banner"], function(index_banner){
  index_banner.play();
})


