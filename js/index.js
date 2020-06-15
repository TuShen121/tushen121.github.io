
var sortData =["设计","学习","编程"];
var webData =[
         [
            {webName:"腾讯",
                webAddress:"http://www.qq.com",
                webImg:"./image/webimg/qq.jpg"
            },
             {webName:"爱奇艺",
                 webAddress:"http://www.aiqiyi.com",
                 webImg:"./image/webimg/aiqiyi.jpg"
             },
             {webName:"百度",
                 webAddress:"http://www.baidu.com",
                 webImg:"./image/webimg/baidu.jpg"
             },
             {webName:"B站",
                 webAddress:"http://www.bilibili.com",
                 webImg:"./image/webimg/bilibili.jpg"
             },
             {webName:"淘宝",
                 webAddress:"http://www.淘宝.com",
                 webImg:"./image/webimg/taobao.jpg"
             },
             {webName:"腾讯视频",
                 webAddress:"http://v.qq.com",
                 webImg:"./image/webimg/vqq.jpg"
             },
             {webName:"优酷",
                 webAddress:"http://www.youku.com",
                 webImg:"./image/webimg/youku.jpg"
             },

        ],
         [
             {webName:"百度",
                 webAddress:"http://www.baidu.com",
                 webImg:"./image/webimg/baidu.jpg"
             },
             {webName:"腾百度讯",
                 webAddress:"http://www.aiqiyi.com",
                 webImg:"./image/webimg/aiqiyi.jpg"
             },
             {webName:"百度腾讯",
                 webAddress:"http://www.baidu.com",
                 webImg:"./image/webimg/baidu.jpg"
             },

         ],
         [
             {webName:"斗鱼",
                 webAddress:"http://www.douyu.com",
                 webImg:"./image/webimg/douyu.jpg"
             },
             {webName:"腾百度讯",
                 webAddress:"http://www.aiqiyi.com",
                 webImg:"./image/webimg/aiqiyi.jpg"
             },
             {webName:"百度腾讯",
                 webAddress:"http://www.baidu.com",
                 webImg:"./image/webimg/baidu.jpg"
             },
             {webName:"百度腾讯",
                 webAddress:"http://www.baidu.com",
                 webImg:"./image/webimg/baidu.jpg"
             },

         ]
    ];




var app = new Vue({
    el: '#app',
    data: {
        sortIndex:0,//用于存放当前点击的是哪个类别的下表
        webDataIndex:0,//用于存放当前点击的时哪个网站的下表
        editSortIndex:0,//编辑分类的时候保存当前点击的时第几个分类。避免冲突

        editEnanle:false,// 显示或隐藏编辑、删除、添加图标、‘取消编辑’文字
        addSortCase:false,//添加分类弹出框
        editWebDataCase:false,//编辑选项弹出框
        addWebDataCase:false,//添加选项弹出框
        editSortCase:false,//编辑分类弹出框

        sortDatas: sortData,//类别数据
        AllwebDatas: webData,//所有类别的网址数据
    },
    //页面加载时调用的函数
    mounted:function(){
        //如果在本地存有数据的话，就把本地数据给vue变量
        if (localStorage.getItem("sortData")!=null && localStorage.getItem("webData")!=null) {
            //检查存储的数据是否有误
                try{
                    // vue变量等于本地变量，存放时先变成字符串存放，读取时先解析
                    this.sortDatas=JSON.parse(localStorage.getItem("sortData"))//读取本地数据赋值给vue变量
                    this.AllwebDatas=JSON.parse(localStorage.getItem("webData"))
                }catch (e) {
                    //发生错误，或者新电脑没有本地数据时，设置为出厂数据
                    this.sortDatas=sortData//类别数据
                    this.AllwebDatas=webData//所有类别的网址数据
                    alert("数据出错，已经恢复出厂设置");
                }
        }
        //如果没有本地数据就恢复出厂变量
        else{
            this.sortDatas=sortData//类别数据
            this.AllwebDatas=webData//所有类别的网址数据
        }

    },
    methods: {

        // 显示或隐藏编辑、删除、添加图标、‘取消编辑’文字
        togleEditEnable: function (event) {
            this.editEnanle=this.editEnanle?false:true
        },
        editClick()
        {
            this.togleEditEnable()// 显示或隐藏编辑、删除、添加图标、‘取消编辑’文字
        },
        // 获取网站图标，判断有没有存图标，没有的话就显示第一个字，当做图标
        getWebImg(index)
        {
            var src=this.AllwebDatas[this.sortIndex][index];
            //判断图片是否存在
            $.ajax({
                url:src.webImg,
                async:false,//让ajax同步执行
                success:function(result){
                    src= src.webImg;//返回图片地址
                },error:function(xhr) {
                    src= src.webName.charAt(0)//返回网站第一个字
                }
            });
            return src;
        },
        // 当分类标签被点击时，保存当前点击标签的下表，并把网站数据切换到对应标签的数据
        sortClick(index)
        {
            this.webDatas=this.AllwebDatas[index];//切换到当前标签对应的网站数据
            this.sortIndex=index;//保存当前点击标签的下表
           // console.log(this.webDatas)
        },
        //搜索引擎
        searchEngine()
        {
           // alert($("#searchEngineInput").val())
            window.location.href="http://www.baidu.com/s?wd="+$("#searchEngineInput").val();
        },
        //显示添加分类标签的alert
        showAddSortCase()
        {
            this.addSortCase=true;//显示添加分类框

        },
        //隐藏添加分类标签的alert
        hiddenAddSortCase()
        {
            this.addSortCase=false;
        },
        //显示添加网站数据的alert
        showAddWebDataCase()
        {
            this.addWebDataCase=true;//显示添加网站

        },
        //隐藏添加网站数据的alert
        hiddenAddWebDataCase()
        {
            this.addWebDataCase=false;
        },
        //显示编辑网站的alert
        showEditWebDataCase(index,event)
        {
            this.webDataIndex=index;//获取点击的是第几个
            this.editWebDataCase=true;//显示编辑框

            // 网站数据变量的内容设置到编辑框
            $("#editInputWebName").val(this.AllwebDatas[this.sortIndex][this.webDataIndex].webName)
             $("#editInputWebAddress").val(this.AllwebDatas[this.sortIndex][this.webDataIndex].webAddress)

        },
        //隐藏编辑网站的alert
        hiddenEditWebDataCase()
        {
            this.editWebDataCase=false;
        },
        //删除网站数据
        removeWebData(index,event)
        {
            this.webDataIndex=index;//获取点击的是第几个
            this.AllwebDatas[this.sortIndex].splice(this.webDataIndex,1);//删除选项

        },
        //网站数据编辑框中的确认按钮点击时，将编辑框中的数据放到vue变量中
        editWebData(index,event)
        {
            // 编辑框的内容设置到网站数据
            this.AllwebDatas[this.sortIndex][this.webDataIndex].webName=$("#editInputWebName").val()
            this.AllwebDatas[this.sortIndex][this.webDataIndex].webAddress=$("#editInputWebAddress").val()

            this.editWebDataCase=false;//隐藏编辑框

        },
        //添加网站数据
        addWebData()
        {
            //获取网址名，例如 http://www.qq.com获取qq，用了识别网站图标
            var D1=$("#addInputWebAddress").val().indexOf('.');
            var D2=$("#addInputWebAddress").val().indexOf('.',D1+1);
            var data=$("#addInputWebAddress").val().slice(D1+1,D2)

            // 添加一个网站
            this.AllwebDatas[this.sortIndex].push({
                    webName:$("#addInputWebName").val(),
                    webAddress:$("#addInputWebAddress").val(),
                    webImg:"./image/webimg/"+data+".jpg"
                }
            )
            this.addWebDataCase=false;//隐藏弹出框
        },
        // 添加分类标签时，给标签随便添加点数据
        addSort()
        {
            // alert($("#inputWebName").val()+$("#inputWebAddress").val()).
            //添加分类名称
            //alert($("#SortAddInput").val())
            this.sortDatas.push($("#SortAddInput").val())
            //向新的分类里填充点数据
            this.AllwebDatas.push(
                [
                    {webName:"优酷",
                        webAddress:"http://www.youku.com",
                        webImg:"./image/webimg/youku.jpg"
                    },
                    {webName:"B站",
                        webAddress:"http://www.bilibili.com",
                        webImg:"./image/webimg/bilibili.jpg"
                    },
                    {webName:"爱奇艺",
                        webAddress:"http://www.aiqiyi.com",
                        webImg:"./image/webimg/aiqiyi.jpg"
                    },

                ]
            )
            this.addSortCase=false;//隐藏添加分类框
        },
        // 显示编辑分类标签的alert
        showEditSortCase(index){
            this.editSortIndex=index;//标记当前要编辑哪个分类
            $("#SortEditInput").val(this.sortDatas[index]);//分类名称放到input里
            this.editSortCase=true;//编辑分类弹出框
        },
        // 隐藏编辑分类标签的alert
        hiddenEditSortCase()
        {
            this.editSortCase=false;//隐藏分类弹出框
        },
        // 删除分类标签
        removeSort(index){
            this.sortDatas.splice(index,1);//删除分类
            this.AllwebDatas.splice(index,1);//删除网址数据
        },
        // 分类标签中的确认按钮点击时，将数据存到vue
        editSort(){

            this.sortDatas[this.editSortIndex]=$("#SortEditInput").val();
            this.editSortCase=false;//隐藏分类弹出框
        },
        // 导航条中的取消编辑按钮点击时，读取本地保存的数据到vue
        cancelEditClick()
        {

            this.togleEditEnable()// 显示或隐藏编辑、删除、添加图标、‘取消编辑’文字
            //读取保存的数据，
            try{
                this.sortDatas=JSON.parse(localStorage.getItem("sortData"))//读取本地数据赋值给vue变量
                this.AllwebDatas=JSON.parse(localStorage.getItem("webData"))
            }catch (e) {
                // 读取出错时
                this.sortDatas=sortData//类别数据
                this.AllwebDatas=webData//所有类别的网址数据
                alert("数据出错，已经恢复出厂设置");
            }
        },
        // 保存按钮点击时，将数据保存到本地
        saveClick()
        {
            //将变量数据保存到本地
            localStorage.setItem("sortData",JSON.stringify(this.sortDatas))
            localStorage.setItem("webData",JSON.stringify(this.AllwebDatas))

            this.togleEditEnable()// 显示或隐藏编辑、删除、添加图标、‘取消编辑’文字
        //恢复出厂设置按钮点击时，将全局变量保存到本地
        },resetProduct(){
            this.sortDatas=sortData//类别数据
            this.AllwebDatas=webData//所有类别的网址数据
            this.saveClick()
        }


    }
})
