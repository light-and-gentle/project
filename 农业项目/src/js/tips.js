/**
 * Created by mt on 2017-4-20.
 */
//提示框
var tipBox = $('.tip-box');
var tipText =$('.tip-text',tipBox);
function tips(classNames,message){
    $('.tip-box').css({"transition":'none',"top":0});
    setTimeout(function () {
        tools.addClass(tipBox,classNames);
        $('.tip-box').css({"transition":'.3s',"top":0});
    },0);
    $('.tip-box .tip-text').text(message);
    clearTimeout(tipBox.timer);
    tipBox.timer = setTimeout(function () {
        tipBox.style.top = '-34px';
        tools.removeClass(tipBox,classNames)
    },2000);

}
