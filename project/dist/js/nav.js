define(["jquery"], function($){
  function download(){
    // console.log("我是下载");
    $.ajax({
      url: "../data/nav-data.json",
      success: function(arr){
        console.log(arr)
        for(let i = 0; i < arr.length; i++){
          //返回值就是我创建的这个节点
          var node = $(`<div class = 'list-item'>
          <h4 class="title">${arr[i].title}</h4>
         
          <ul class = 'childlist'>

          </ul>
        </div>`);
          node.appendTo($("#list-nav"));

          // 取出商品列表
          var hots = arr[i].hots;
          console.log(hots)
          for(let k = 0; k < hots.length; k++){
            $(`<li>
            <img src="${hots[k].img}" alt="">
            <h6>${hots[k].title}</h6>
            <span>￥${hots[k].price}</span></li>
          `).appendTo(node.find(".childlist"));
          }
        }
      },
      error: function(msg){
        console.log(msg);
      }
    })

  }
  /*划入显示,移出隐藏*/
  //实现事件委托
  
  function showlist(){
    $("#list-nav").on("mouseenter",".list-item",function(){
      console.log($(this))  
      $(this).find(".childlist").show();
      
  }),
  $("#list-nav").on("mouseleave",".list-item",function(){  
    $(this).find(".childlist").hide();
  
})
}

  return {
    download: download,
    showlist:showlist,
 


  }
})
