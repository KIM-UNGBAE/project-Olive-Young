$(function(){

    // gnb nav
    $('.gnb .nav-item .nav').click(function(e) {
        e.preventDefault();
        $('.gnb .nav-item .nav').removeClass('on');
        $(this).addClass('on');
    });

    // header.on scroll
    lastScroll = 0;

    $(window).scroll(function(){
        curr = $(this).scrollTop();

        if (curr > 60) {
            $('.header').addClass('hide');
        } else {
            $('.header').removeClass('hide');
        }

        // tab-bar, fixed-btn
        if(curr < lastScroll){
            $('.tab-bar').addClass('active');
            $('.fixed-btn').addClass('active1');
        }else{
            $('.tab-bar').removeClass('active');
            $('.fixed-btn').removeClass('active1');
        }
        
        // fixed-btn
        if (curr === 0) {
            $('.fixed-btn').addClass('active2');
        } else {
            $('.fixed-btn').removeClass('active2');
        }

        lastScroll = curr;
    })

    // sc-banner1 btn-close
    $('.sc-banner1 .btn-close').click(function(){
        $('.sc-banner1').addClass('active');
        $('.container').addClass('active');
    })


    // footer
    // group-info btn-info::after
    $('.footer .group-info .btn-info').click(function(){
        $(this).toggleClass('on');
        $('.footer .group-info .info-area').toggleClass('on');
    })


    // fixed-btn btn-top 클릭 시 위로 올라가기
    $('.fixed-btn .btn-top').click(function(){
        window.scrollTo({top: 0, behavior:"smooth"});
    })


    // popup-banner (페이지 로드 시 표시 & 스크롤 막기)
    $('.popup-banner').show();
    $('body').addClass('scroll-hidden');

    // 팝업 닫기 (오늘 하루 보지 않기, 닫기 버튼)
    $('.btn-stop, .btn-close').click(function(){
        $('.popup-banner').hide();
        $('body').removeClass('scroll-hidden');
    })


    // body 클릭 시 popup-banner 닫기
    $(document).click(function(e){
        if ($('body').hasClass('scroll-hidden')) {
            if($('body').has(e.target).length === 0){
                $('body').removeClass('scroll-hidden');
                $('.popup-banner').removeClass('on');
                $(".popup-banner").hide();
            }
        }
    })


})