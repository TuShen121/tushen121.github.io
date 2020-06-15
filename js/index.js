
var sortData =["设计","学习","编程"];
var webData =[
         [
            {webName:"腾讯",
                webAddress:"http://www.qq.com",
                webImg:"./image/webimg/aiqiyi.jpg"
            },
             {webName:"腾讯",
                 webAddress:"http://www.qq.com",
                 webImg:"./image/webimg/qq.jpg"
             },
             {webName:"腾讯",
                 webAddress:"http://www.qq.com",
                 webImg:"./image/webimg/aiqiyi.jpg"
             },
             {webName:"百度腾讯",
                 webAddress:"http://www.baidu.com",
                 webImg:"./image/webimg/qq.jpg"
             },
             {webName:"百度腾讯",
                 webAddress:"http://www.baidu.com",
                 webImg:"./image/webimg/qq.jpg"
             },
             {webName:"百度腾讯",
                 webAddress:"http://www.baidu.com",
                 webImg:"./image/webimg/qq.jpg"
             },
             {webName:"百度腾讯",
                 webAddress:"http://www.baidu.com",
                 webImg:"./image/webimg/qq.jpg"
             },

        ],
         [
             {webName:"百度",
                 webAddress:"http://www.baidu.com",
                 webImg:"./image/webimg/baidu.jpg"
             },
             {webName:"腾百度讯",
                 webAddress:"http://www.baidu.com",
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
                 webAddress:"http://www.baidu.com",
                 webImg:"./image/webimg/aiqiyi.jpg"
             },
             {webName:"百度腾讯",
                 webAddress:"http://www.baidu.com",
                 webImg:"./image/webimg/qq.jpg"
             },
             {webName:"百度腾讯",
                 webAddress:"http://www.baidu.com",
                 webImg:"./image/webimg/qq.jpg"
             },

         ]
    ];




var app = new Vue({
    el: '#app',
    data: {
        sortIndex:0,
        webDataIndex:0,
        message: 'Hello Vue!',
        editEnanle:false,// 显示或隐藏编辑、删除、添加图标、‘取消编辑’文字
        addSortCase:false,//添加分类弹出框
        editWebDataCase:false,//编辑选项弹出框
        addWebDataCase:false,//添加选项弹出框
        sortDatas:sortData,//类别数据
        AllwebDatas:webData,//所有类别的网址数据
    },
    methods: {
        // 显示或隐藏编辑、删除、添加图标、‘取消编辑’文字
        togleEditEnable: function (event) {
            this.editEnanle=this.editEnanle?false:true
        },
        sortClick(index)
        {
            this.webDatas=this.AllwebDatas[index];
            this.sortIndex=index;
            console.log(this.webDatas)
        },
        searchEngine()
        {
           // alert($("#searchEngineInput").val())
            window.location.href="http://www.baidu.com/s?wd="+$("#searchEngineInput").val();
        },
        showAddSortCase()
        {
            this.addSortCase=true;//显示添加分类框

        },
        hiddenAddSortCase()
        {
            this.addSortCase=false;
        },
        showAddWebDataCase()
        {
            this.addWebDataCase=true;//显示添加网站

        },
        hiddenAddWebDataCase()
        {
            this.addWebDataCase=false;
        },
        showEditWebDataCase(index,event)
        {
            this.webDataIndex=index;//获取点击的是第几个
            this.editWebDataCase=true;//显示编辑框

            // 网站数据变量的内容设置到编辑框
            $("#editInputWebName").val(this.AllwebDatas[this.sortIndex][this.webDataIndex].webName)
             $("#editInputWebAddress").val(this.AllwebDatas[this.sortIndex][this.webDataIndex].webAddress)
           // event.preventDefault();//阻止事件猫盘
        },
        hiddenEditWebDataCase()
        {
            this.editWebDataCase=false;
        },
        removeWebData(index,event)
        {
            this.webDataIndex=index;//获取点击的是第几个
            this.AllwebDatas[this.sortIndex].splice(this.webDataIndex,1);//删除选项


            // event.preventDefault();//阻止事件猫盘
        },
        editWebData(index,event)
        {
            // 编辑框的内容设置到网站数据
            this.AllwebDatas[this.sortIndex][this.webDataIndex].webName=$("#editInputWebName").val()
            this.AllwebDatas[this.sortIndex][this.webDataIndex].webAddress=$("#editInputWebAddress").val()

            this.editWebDataCase=false;//隐藏编辑框

        },
        addWebData()
        {
            // alert($("#inputWebName").val()+$("#inputWebAddress").val())
            this.AllwebDatas[this.sortIndex].push({
                    webName:$("#addInputWebName").val(),
                    webAddress:$("#addInputWebAddress").val(),
                    webImg:"./image/webimg/aiqiyi.jpg"
                }
            )
            this.addWebDataCase=false;
        },
        addSort()
        {
            // alert($("#inputWebName").val()+$("#inputWebAddress").val()).
            //添加分类名称
            //alert($("#SortAddInput").val())
            this.sortDatas.push($("#SortAddInput").val())
            //向新的分类里填充点数据
            this.AllwebDatas.push(
                [
                    {webName:"百度",
                        webAddress:"http://www.baidu.com",
                        webImg:"./image/webimg/baidu.jpg"
                    },
                    {webName:"腾百度讯",
                        webAddress:"http://www.baidu.com",
                        webImg:"./image/webimg/aiqiyi.jpg"
                    },
                    {webName:"百度腾讯",
                        webAddress:"http://www.baidu.com",
                        webImg:"./image/webimg/baidu.jpg"
                    },

                ]
            )
            this.addSortCase=false;//隐藏添加分类框
        }


    }
})
