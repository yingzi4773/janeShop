/**
 * Created by lenovo on 2017/6/19.
 */
$(function(){
    //搜索框文字效果
    $("#inputSearch").focus(function(){
        $(this).addClass("focus");
        if($(this).val()==this.defaultValue){
            $(this).val("");
        }
    }).blur(function(){
        $(this).removeClass("focus");
        if($(this).val()==""){
            $(this).val(this.defaultValue);
        }
    }).keyup(function(e){
        if(e.which==13)
            alert("回车提交表单");
    })
    //网页换肤效果
    var $li= $("#skin li");
    $li.click(function(){
        switchSkin(this.id);
    });
    var cookie_skin=$.cookie("MyCssSkin");
    if(cookie_skin){
        switchSkin(cookie_skin);
    }
    //导航效果
    var $navLi=$(".mainNav li");
    $navLi.hover(function(){
        $(this).find(".jnNav").show();
    },function(){
        $(this).find(".jnNav").hide();
    });
    //hot热销效果,方到jquery中加载是因为考虑到页面优化，能加快html的加载和css的渲染
    $(".jnCatainfo .promoted").append('<del class="hot"></del>');
    //右侧上部的广告轮播效果
    var index=0;//图片的索引
    var $imgrolls = $("#jnImageroll div a");
    $("#jnImageroll div a").mouseover(function(){
        index=$imgrolls.index(this);
        showImg(index);
    }).eq(0).mouseover();
    //滑入停止动画，画出开始动画
    var adTimer=null;
    $("#jnImageroll").hover(function(){
        if(adTimer){
            clearInterval(adTimer);
        }
    },function(){
        adTimer=setInterval(function(){
            showImg(index);
            index++;
            if(index==$imgrolls.length){
                index=0;
            }
        },5000);
    }).trigger("mouseleave");
    //右侧最新动态模块内容添加超链接提示
    var x=10;
    var y=20;
    $("a.tooltip").mouseover(function(e){
        this.myTitle=this.title;
        this.title="";
        var tooltip="<div id='tooltip'>"+this.myTitle+"</div>";
        $("body").append(tooltip);
        $("#tooltip")
            .css({
                "top":(e.pageY+y)+"px",
                "left":(e.pageX+x)+"px"
            }).show("fast");
    }).mouseout(function(){
        this.title=this.myTitle;
        $("#tooltip").remove();
    }).mousemove(function(e){
        $("#tooltip")
            .css({
                "top":(e.pageY+y)+"px",
                "left":(e.pageX+x)+"px"
            });
    });
    //右侧下部品牌活动横向滚动效果
    $("#jnBrandTab li a").click(function(){
        $(this).parent().addClass("chos")
            .siblings().removeClass("chos");
        var idx=$("#jnBrandTab li a").index(this);
        showBrandList(idx);
        return false;
    }).eq(0).click();
    //右侧下部光标滑过产品列表的效果
    $("#jnBrandList li").each(function(index){

        var $img = $(this).find("img");
        var img_w = $img.width();
        var img_h = $img.height();
        var spanHtml = '<span style="position:absolute;top:0;left:5px;width:'+img_w+'px;height:'+img_h+'px;" class="imageMask"></span>';
        // $(spanHtml).appendTo(this);
        $(this).append(spanHtml);
        console.log(img_w+"   "+img_h);
    });
    $("#jnBrandList").delegate(".imageMask","mouseenter mouseleave", function(){
        $(this).toggleClass("imageOver");
    });

    //详情页的js
    //下面小图片切换大图片，单击“观看清晰图片”的大图更新
    $("#jnProitem ul.imgList li a").bind("click",function(){
        var imgSrc=$(this).find("img").attr("src");
        var index=imgSrc.lastIndexOf(".");
        var unit=imgSrc.substring(index);
        imgSrc=imgSrc.substring(0,index);
        var imgSrc_big=imgSrc+"_big"+unit;
        $("#thickImg").attr("href",imgSrc_big);
    });
    //产品属性介绍之类的选项卡
    var $div_li=$(".tab_menu ul li a");
    $div_li.click(function(){
        $(this).parent().addClass("chos")
            .siblings().removeClass("chos");
        var index=$div_li.index(this);
        $(".tab_box div").eq(index).show()
            .siblings().hide();
    }).eq(0).click();
    //右侧产品颜色切换

    $(".color_change ul li img").click(function(){
        var imgSrc=$(this).attr("src");
        var i=imgSrc.lastIndexOf(".");
        var unit=imgSrc.substring(i);
        imgSrc=imgSrc.substring(0,i);
        var imgSrc_big=imgSrc+"_ong_big"+unit;
        var imgSrc_small=imgSrc+"_one_small"+unit;
        $("#bigImg").attr("src",imgSrc_small);
        $("thickImg").attr("href",imgSrc_big);
        var newImgSrc=imgSrc.replace("images/pro_img/","");
        $("#jnProitem .imgList li").hide();
        $("#jnProitem .imgList").find(".imgList_"+newImgSrc).show();
        var alt=$(this).attr("alt");
        $(".color_change strong").text(alt);
        //不动手单击缩略图，放大镜效果还是之前的图片
        $("#jnProitem .imgList").find(".imgList_"+newImgSrc).eq(0).find("a").click();
    });
    //右侧产品尺寸切换
    $(".pro_size ul li").click(function(){
        $(this).addClass("cur")
            .siblings().removeClass("cur");
        var size=$(this).text();
        $(".pro_size strong").text(size);
    });
    //右侧产品数量和价格联动
    var $span=$(".pro_price strong");
    var proprice=$span.text();
    $("#num_sort").change(function(){
        var num=$(this).val();
        var price=num*proprice;
        $span.text(price);
    }).change();
    //右侧评分效果，星星评分
    $(".pro_rating ul li a").click(function(){
        // var title=$(this).attr("title");
        // alert("您给次商品的评分是："+title);
        console.log($(".pro_rating ul li a").index(this));
        var cl=$(this).parent().attr("class");
        $(this).parent().parent().removeClass().addClass("rating "+cl+"star");
        $(this).blur();
        return false;
    });
    //购买
    var $product = $(".jnProDetail");
    $("#cart a").click(function (e) {
        var pro_name = $product.find("h4:first").text();
        var pro_size = $product.find(".pro_size strong").text();
        var pro_color =  $(".color_change strong").text();
        var pro_num = $product.find("#num_sort").val();
        var pro_price = $product.find(".pro_price strong").text();
        var dialog = "感谢您的购买。<div style='font-size:12px;font-weight:400;'>您购买的产品是："+pro_name+"；"+
            "尺寸是："+pro_size+"；"+
            "颜色是："+pro_color+"；"+
            "数量是："+pro_num+"；"+
            "总价是："+pro_price +"元。</div>";
        $("#jnDialogContent").html(dialog);
        $('#basic-dialog-ok').modal();
        return false;//避免页面跳转
    });
});
//切换皮肤颜色
function switchSkin(skinName){
    $("#"+skinName).addClass("selected").siblings().removeClass("selected");
    $("#cssfile").attr("href","styles/skin/"+skinName+".css");
    $.cookie("MyCssSkin",skinName,{path:'/',expires:10});
}
//图片轮播的显示图片函数
function showImg(index){
    var $rollobj=$("#jnImageroll");
    var $rolllist=$rollobj.find("div a");
    var newhref=$rolllist.eq(index).attr("href");
    $("#JS_imgWrap").attr("href",newhref)
        .find("img").eq(index).stop(true,true).fadeIn()
        .siblings().fadeOut();
    $rolllist.removeClass("chos").css("opacity","0.7")
        .eq(index).addClass("chos").css("opacity","1");
}
//右侧下部品牌活动横向滚动效果的函数
function showBrandList(idx){
    var $roolobj=$("#jnBrandList");
    var roolWidth=$roolobj.find("li").outerWidth();
    roolWidth=roolWidth*4;
    $roolobj.stop(true,false).animate({left:-roolWidth*idx},1000);
}