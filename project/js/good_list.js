console.log("1111");

define(["jquery"], function($){
  function download(){
    console.log("我是下载");
    $.ajax({
      url: "../data/good-data.json",
      success: function(arr){
        console.log(arr)
        for(let i = 0; i < arr.length; i++){
          //返回值就是我创建的这个节点
          var node = $(`<div class = 'goods_list'>
          <p class="title">${arr[i].title}</p>
          
            <ul class = 'goods_news'>
            
            </ul>
         
        </div>`);
          node.appendTo($("#list"));

          // 取出商品列表
          var hots = arr[i].hots;
          console.log(hots)
          for(let k = 0; k < hots.length; k++){
            $(`
            <a href="./item.html?id=${hots[k].id}">
                <li>
                
                <img src="${hots[k].img}" alt="">
                <h6>${hots[k].title}</h6>
                <span>￥${hots[k].price}</span></li>
            </a>
          `).appendTo(node.find(".goods_news"));
          }
        }
      },
      error: function(msg){
        console.log(msg);
      }
    })

    console.log("ajax引入成功");
  }


  return {
    download: download,
  }
})
