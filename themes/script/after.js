/* ================================================ */
/* スクロールに応じて線を表示する */
/* ================================================ */
$('main').scrollgress({
    height: '3px',
    color: '#990000',
});
/* ================================================ */
/* ヘッダー部分 */
/* ================================================ */
$(function () {
    var elemTop = [];
    function PositionCheck() {
        var headerH = $("#header").outerHeight(true);
        $(".scroll-point").each(function (i) {
            elemTop[i] = Math.round(parseInt($(this).offset().top - headerH));
        });
    }
    function ScrollAnime() {
        var scroll = Math.round($(window).scrollTop());
        var NavElem = $("#g-nav li");
        $("#g-nav li").removeClass('current');
        if (scroll >= 0 && scroll < elemTop[1]) {
            $(NavElem[0]).addClass('current');
        } else if (scroll >= elemTop[1] && scroll < elemTop[2]) {
            $(NavElem[1]).addClass('current');
        } else if (scroll >= elemTop[2] && scroll < elemTop[3]) {
            $(NavElem[2]).addClass('current');
        } else if (scroll >= elemTop[3]) {
            $(NavElem[3]).addClass('current');
        }
    }
    $('#g-nav a').click(function () {
        var elmHash = $(this).attr('href');
        var headerH = $("#header").outerHeight(true);
        var pos = Math.round($(elmHash).offset().top - headerH);
        $('body,html').animate({ scrollTop: pos }, 500);
        return false;
    });
    $(window).scroll(function () { PositionCheck(); ScrollAnime(); });
    $(window).on('load', function () { PositionCheck(); ScrollAnime(); });
    $(window).resize(function () { PositionCheck() });
});
/* temp */

$(document).ready(function() {
    // lang属性が"en"の要素をすべて非表示にする
    $("*[language='en']").hide();
});

$(".openbtn").click(function () {//ボタンがクリックされたら
    $(this).toggleClass('active');//ボタン自身に activeクラスを付与し
    $("#hamburgermenu").toggleClass('panelactive');//ナビゲーションにpanelactiveクラスを付与
});

$("#hamburgermenu a").click(function () {//ナビゲーションのリンクがクリックされたら
    $(".openbtn").removeClass('active');//ボタンの activeクラスを除去し
    $("#hamburgermenu").removeClass('panelactive');//ナビゲーションのpanelactiveクラスも除去
});

/* ================================================ */
/* スクロール画面移動 */
/* ================================================ */
$.scrollify({
    section: ".scroll-point",//1ページスクロールさせたいエリアクラス名
    interstitialSection: "#header,#footer",//ヘッダーフッターを認識し、1ページスクロールさせず表示されるように設定
    easing: "swing", // 他にもlinearやeaseOutExpoといったjQueryのeasing指定可能
    scrollSpeed: 300, // スクロール時の速度

    //以下、ページネーション設定
    before: function (i, panels) {
        var ref = panels[i].attr("data-url");
        $(".pagination .active").removeClass("active");
        $(".pagination").find("a[href=\"?" + ref + "\"]").addClass("active");
    },
    afterRender: function () {
        var pagination = "<ul class=\"pagination\">";
        var activeClass = "";
        $(".scroll-point").each(function (i) {//1ページスクロールさせたいエリアクラス名を指定
            activeClass = "";
            if (i === $.scrollify.currentIndex()) {
                activeClass = "active";
            }
            pagination += "<li><a class=\"" + activeClass + "\" href=\"?" + $(this).attr("data-url") + "\"><span class=\"hover-text\">" + $(this).attr("data-url").charAt(0).toUpperCase() + $(this).attr("data-url").slice(1) + "</span></a></li>";
        });
        pagination += "</ul>";

        $("#area-1").append(pagination);//はじめのエリアにページネーションを表示
        $(".pagination a").on("click", $.scrollify.move);
    }

});
/* ================================================ */
/* トップへ戻る */
/* ================================================ */
function PageTopAnime() {
    var scroll = $(window).scrollTop();
    if (scroll >= 200) {
        $('#page-top').removeClass('RightMove');
        $('#page-top').addClass('LeftMove');
    } else {
        if (
            $('#page-top').hasClass('LeftMove')) {
            $('#page-top').removeClass('LeftMove');
            $('#page-top').addClass('RightMove');
        }
    }
}
$(window).scroll(function () { PageTopAnime(); });
$(window).on('load', function () { PageTopAnime(); });

$('#page-top').click(function () {
    $('body,html').animate({
        scrollTop: 0
    }, 1500, "easeInOutQuint");
    return false;
});