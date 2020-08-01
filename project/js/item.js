console.log("引入item.js")
define(["jquery", "jquery-cookie"], function ($) {
    // 放大镜函数
    function scale() {
        $(".pages_littlebox").on("mouseenter", "#small", function () {
            $("#shadow,#big").css("display", "block")
        }).on("mouseleave", "#small", function () {
            $("#shadow,#big").css("display", "none");
        }).mousemove(function (ev) {
            var l = ev.pageX - $(this).offset().left - 100;
            var t = ev.pageY - $(this).offset().top - 190;
            //做一个简单的限制出界
            l = range(l, 0, 200);
            t = range(t, 0, 200);

            $("#shadow").css({
                left: l,
                top: t
            });
            //大图片，按照对应倍数的反方向移动
            $("#big img").css({
                left: -2 * l,
                top: -2 * t
            })
        })
    }

    function range(iCur, iMin, iMax) {
        if (iCur < iMin) {
            return iMin;
        } else if (iCur > iMax) {
            return iMax;
        } else {
            return iCur;
        }
    }



    // 获取id
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }

    // 加载假数据
    function download() {
        console.log("引入假数据")
        var id = getUrlParam('id');
        $.ajax({
            url: "../data/good-data.json",
            dataType: 'json',
            success: function (res) {
                console.log(res)
                for (let i = 0; i < res.length; i++) {
                    var arr = res[i].hots
                    console.log(arr)
                    for (let j = 0; j < arr.length; j++) {
                        var str = ""

                        if (id == arr[j].id) {
                            var str = `
                                    <div id="small">
                                        <img src="${arr[j].img}" alt="商品图片">
                                        <div id="shadow"></div>
                                    </div>
                                    <div id="big">
                                        <img src="${arr[j].img}" alt="">
                                    </div>
                                    <div class="data">
                                        
                                        <h3 class="title">标题：${arr[j].title}</h3>
                                        
                                        <h4 class="price">价格：￥${arr[j].price}</h4>
                                    </div>
                                    <div class="price_sum">
                                       
                                        <button id="${arr[j].id}" class="sc_btn">加入购物车</button>
                                     
                                        <button>立即购买</button>
                                    </div>
                                `;
                        }
                        $('.pages_littlebox').append(str);
                    
                    }
                }

            },
        });
        console.log("假数据引入成功")
    }
   




    //2.给购物车按钮添加点击  事件委托
            //当点击.sc_btn的时候委托.goods_box ul去做一些事情
            $(".pages_littlebox").on("click", ".sc_btn", function(){
                //当前加入购物车按钮所在商品的id  id num;
                // alert(this.id);  存储在cookie
                //把当前点击的商品的id记下来
                var id = this.id;
                console.log('点击当前按钮的'+ id);

                //（1、）判断是否是第一次添加（这里只需要看一看数据是否存在。不需要json格式的转换）
                //判断取出来的.cookie("goods"是否为空，如果为空就是true，否则就是false
                var first = ($.cookie("goods") == null ? true : false);
                //如果false是true ，  也就是空的话，  在后台数据中取出来商品id和商品数量
                if(first){
                    //如果是第一次添加。就存在arr里面， arr是从后台返回的数据
                    var arr = [{id:id, num:1}];
                    //别忘啦还要再一次存进cookie中，将arr转成json格式
                    $.cookie("goods", JSON.stringify(arr), {
                        expires: 7
                    })
                }else{
                    //（2、）判断之前是否添加过
                    //取出商品信息之后，转成json格式
                    var cookieArr = JSON.parse($.cookie("goods"));
                    //function（item） {
                        // item.id == id
                        //     }
                    //findIndex遍历数组找到符合条件的下标
                    var index = cookieArr.findIndex(item => item.id == id);
                    //如果之前添加过，num++
                    if(index >= 0){
                        cookieArr[index].num++;
                    }else{
                        //没有的话，就把id和num放在cookieARR上
                        cookieArr.push({id:id, num:1});
                    }
                    //存在cookie中
                    $.cookie("goods", JSON.stringify(cookieArr), {
                        expires: 7
                    })
                }

                sc_num();
                // sc_msg();
                // ballMove(this);
            })


            //计算购物车中商品总数
            function sc_num(){
                var cookieStr = $.cookie("goods");
                if(!cookieStr){
                    $(".sc_right .sc_num").html(0);
                }else{
                    var cookieArr = JSON.parse(cookieStr);
                    var sum = 0;
                    for(var i = 0; i < cookieArr.length; i++){
                        sum += cookieArr[i].num;
                    }
                    $(".sc_right .sc_num").html(sum);
                }
            }


    return {
        scale: scale,
        download: download,
        sc_num:sc_num,
      
    
    };
});