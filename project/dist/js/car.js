define(["jquery", "jquery-cookie","item"], function ($,item) {
        
           
            //加载右侧的购物车列表
            //cookie 只存储id和num，商品数据服务器上
            //再去下载数据，从数据中筛选已经加入购物车的数据。
            function sc_msg(){
                $.ajax({
                    url: "../data/good-data.json",
                    dataType: 'json',
                    success: function(arr){
                        // console.log(arr)
                        var cookieStr = $.cookie("goods");
                        if(cookieStr){
                            var cookieArr = JSON.parse(cookieStr);
                            var newArr = []; //存符合条件数据
                            //把当前被点击的商品  和   从后台取到的数据作比对
                            for(var i = 0; i < arr.length; i++){
                                var hot = arr[i].hots
                                for(var k = 0; k< hot.length; k++){
                                    for(var j = 0; j < cookieArr.length; j++){
                                        if(hot[k].id == cookieArr[j].id){
                                            hot[k].num = cookieArr[j].num;
                                            newArr.push(hot[k]);
                                            break;
                                        }
                                    }
                                }
                            }
                             console.log(newArr);  //购物车显示的数据
                             var sum = 0;
                            var str = ``;
                            for(var i = 0; i < newArr.length; i++){
                                str += `<li id="${newArr[i].id}">
                                        <div class="sc_goodsBox">
                                            <input type="checkbox" class="boxBtn">
                                        </div>
                                        <div class="sc_goodsPic">
                                            <img src="${newArr[i].img}" alt="">
                                        </div>
                                        <div class="sc_goodsTitle">
                                            <p>${newArr[i].title}</p>
                                        </div>
                                        <div class="sc_goodsPrice">
                                            <p>￥：${newArr[i].price}</p>
                                        </div>
                                        <div class="sc_goodsSum">
                                            <p>￥：${newArr[i].price * newArr[i].num} </p>
                                        </div>
                                        <div class="delete_goodsBtn">删除</div>
                                        <div class="sc_goodsNum">
                                            <button>+</button>
                                            <button>-</button>
                                            <span >${newArr[i].num}</span>
                                        </div>
                                    </li>
                                    `
                                    sum += newArr[i].price * newArr[i].num;
                            }
                            console.log(sum);//这里也能输出
                            $(".sc_right .submit_btn .allSum .money").html(sum);
                            $(".sc_right ul").html(str);
                        }
                    },
                    error: function(msg){
                        console.log(msg);
                    }
                })
            }


            //给右侧购物车的按钮添加删除功能
            $(".sc_right ul").on("click", ".delete_goodsBtn", function(){
                //在页面上删除
                // closest() 方法返回被选元素的第一个祖先元素。
                var id = $(this).closest("li").remove().attr("id");
                console.log(id);
                //在cookie中删除这个数据
                var cookieArr = JSON.parse($.cookie("goods"));
                cookieArr = cookieArr.filter(item => item.id != id);
                //？？？
                cookieArr.length ? $.cookie("goods", JSON.stringify(cookieArr), {expires: 7}) : $.cookie("goods", null);
                sc_num();
            })

            //给右侧购物车的+和-按钮添加点击
            $(".sc_right ul").on("click", ".sc_goodsNum button", function(){
                var id = $(this).closest("li").attr("id");
                //找到cookie中的商品
                var cookieArr = JSON.parse($.cookie("goods"));
                var res = cookieArr.find(item => item.id == id);
            
                if(this.innerHTML == "+"){
                    res.num++;
                }else{
                    res.num == 1 ? alert("数量为1，不能减少") : res.num--;
                }
                $(this).siblings("span").html(`${res.num}`);

                $.cookie("goods", JSON.stringify(cookieArr), {
                    expires: 7
                })

              
                sc_msg();
            })




            //复选框的函数

            function checkbox() {
                
                //全选按钮
                $('#boxAll').click(function () {
                    var $checkboxs = $('.sc_right ul').find('input[type="checkbox"]');
                    if ($(this).is(':checked')) {
                        $checkboxs.prop("checked", true);
                        // $checkboxs.next('label').addClass('mark');
                    } else {
                        $checkboxs.prop("checked", false);
                        // $checkboxs.next('label').removeClass('mark');
                    }
                    totalMoney();
                });
        
                // 判断单个复选框有一个未选中，全选按钮取消选中，若全都选中，则全选打对勾 
                $(".sc_right ul").each(function () {
                    $(".sc_right ul").on("click", ".boxBtn", function () {
                        var $btnAll = $('.sc_right ul').find('input[type="checkbox"]')
                        if ($(this).is(':checked')) {
                            // $(this).next('label').addClass('mark');
                            var num = 0;
                            var len = $btnAll.length;
                            $btnAll.each(function () {
                                if ($(this).is(':checked')) {
                                    num++;
                                }
                            });
                            if (num == len) {
                                $(this).parents('.sc_right ul').prev().find('.sc_goodsBox').prop("checked", true);
                                // $(this).parents('.sc_right ul').prev().find('.sc_goodsBox').next('label').addClass('mark');
                            }
        
                        } else {
                            //否则，店铺全选取消
                            // $(this).next('label').removeClass('mark')
                            $(this).parents('.sc_right ul').prev().find('.sc_goodsBox').prop("checked", false);
                            // $(this).parents('.sc_right ul').prev().find('.sc_goodsBox').next('label').removeClass('mark');
                        }
                        totalMoney();
        
                    });
                })
        
            }
            function totalMoney() {
                var total_money = 0;
                // $(".sc_right ul").on("click", ".boxBtn",function(){
                var $btnAll = $('.sc_right ul').find('input[type="checkbox"]');
                $btnAll.each(function () {
                    if ($(this).is(':checked')) {
                        var goods = parseInt($(this).parent().parent().find('.totalPrice').html());
                        total_money += goods;
                    }
                    // });
                    $('.allSum .money').html('￥' + total_money);
                });
            }
        






        
            //清空购物车按钮
            $("#clearCar").click(function(){
                //清空购物车
                //1、清空cookie
                $.cookie("goods", null);
                //2、清空页面
                // $(".sc_right ul").html("");
                $(".sc_right ul").empty();
                sc_num();
            })

            return {
                sc_msg: sc_msg,
                checkbox:checkbox,
               
            };

        
    });
