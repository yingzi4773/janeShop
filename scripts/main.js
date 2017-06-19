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