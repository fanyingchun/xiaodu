define(["jquery"], function($){
  function download(){
    console.log("我是下载");
    $.ajax({
      url: "../data/show-data.json",
      success: function(arr){
        console.log(arr)
        for(let i = 0; i < arr.length; i++){
          //返回值就是我创建的这个节点
          var node = $(`<ul class="show">
          <li>
              <img src="${arr[i].img}" alt="">
              <span>${arr[i].title}</span>
              <br/>
              <span>￥${arr[i].price}</span>
          </li>
      </ul>`);
          node.appendTo($("#good_list"));

        }
      },
      error: function(msg){
        console.log(msg);
      }
    })

  }


  return {
    download: download,

  }
})
