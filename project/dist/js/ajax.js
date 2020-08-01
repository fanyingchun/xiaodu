    export {
        $ajax,
        $get,
        $post
    }

    /**
     * @param {object} requestObject
     * method
     * url
     * data
     * success
     * error
     */
    function $ajax(){
        //a1是Ajax(...arguments)的一个实例
        var a1 = new Ajax(...arguments);
        a1.init();
        a1.ajax();
    }


    //采用get方式提交
    function $get(){  
        //将对象中的数据和提交方式get进行合并
        //...是展开运算符，将对象中的数据展开
        var argus = Object.assign({"method": "get"}, ...arguments);   
        // Ajax(argus)是一个构造函数，a1是他的一个实例
        var a1 = new Ajax(argus);
        a1.init();
        a1.ajax();
    }

    //采用post方式提交
    function $post(){
        //将对象中的数据和提交方式post进行合并
        var argus = Object.assign({"method": "post"}, ...arguments);
        var a1 = new Ajax(argus);
        //声明一个ajax对象（兼容问题）
        a1.init();
        //open/send/等待数据响应
        a1.ajax();
    }


    //ES6语法：语法糖（构造函数）
    class Ajax{
        //设置属性
        constructor({method = 'get', url, data, success, error}){
            this.method = method;
            this.url = url;
            this.data = data;
            this.success = success;
            this.error = error;
        }


    //声明一个ajax对象（兼容问题）
    init(){
        var xhr = null;
        try{
            xhr = new XMLHttpRequest();
        }catch(error){
            console.log(error);
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        return xhr;
    }


    ajax(){
        //1、生成ajax对象
        var xhr = this.init();

        //2、3、判断是否有数据存在(open/send)
        var querystring = "";
        if(this.data){
            //转成querystring
            querystring = this.querystring(this.data);
        }
        if(this.method == "get"){
            xhr.open(this.method, this.url + "?" + querystring, true);
            xhr.send();
        }else{
            xhr.open(this.method, this.url, true);
            //设置请求访问头
            xhr.setRequestHeader('content-type', "application/x-www-form-urlencoded");
            xhr.send(querystring);
        }
        
        //4.等待数据相应
        xhr.onreadystatechange = () => {
            if(xhr.readyState == 4){
                // if(xhr.status == 200){
                    //你向ajax后台的程序发送xmlhttp请求的时候,
                    // 后台程序接到请求会进行处理,处理结束后,可以返回一串数据给前台,这个就是responseText.
                //     success && success(xhr.responseText);
                // }else{
                //     error && error("error:" + xhr.status);
                // }

                xhr.status == 200 ? this.success && this.success(xhr.responseText) : this.error && this.error("error:" + xhr.status);
                
            }
        }
    }
    //将拼接的过程写成一个函数，向函数dataObj()里面传递一个形参
    querystring(dataObj){
        var str = '';
        for(var attr in dataObj){
            str += `${attr}=${dataObj[attr]}&`;
        }
        //最后拼接的一个没有&
        return str.substring(0, str.length - 1);

    }

}
console.log("引入ajax")