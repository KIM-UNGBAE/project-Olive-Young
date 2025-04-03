$(function(){

    // sc-visual
    // main-slide
    const mainSlide = new Swiper('.main-slide',{
        loop:true,
        autoplay:{
            delay:5000,
            disableOnInteraction: true
        },
        on:{
            "init":function(){
                total=this.slides.length;
                $('.sc-visual .main-slide .curr-num').text(1);
                $('.sc-visual .main-slide .total-num').text(total);
            },
            "slideChange":function(){
                idx=this.realIndex+1;
                $('.sc-visual .main-slide .curr-num').text(idx);
            },
        }
    })

    // all-page 열고 닫기
     // all-page 열기
     $('.sc-visual .control-area .btn-plus').click(function(){
        $('body').addClass('scroll-hidden');
        $('.all-page').addClass('on');
    })

    // all-page 닫기
    $('.sc-visual .all-page .btn-close').click(function(){
        $('body').removeClass('scroll-hidden');
        $('.all-page').removeClass('on');
    })


    // sc-menu 
    // #menuList json
    fetch('./assets/data/menu.json')
    .then(res=>res.json())
    .then(json=>{
        data=json.items
        let html=``;
        data.forEach(Element => {
            html+=`<li class="menu-item">
                            <a href="">
                                <div class="img-box">
                                    <img src="${Element.thumb}" alt>
                                </div>
                                <span class="title">${Element.title}</span>
                            </a>
                        </li>`
        });

        $('#menuList').html(html);
    })


    // sc-banner2 slide
    const bannerSlide = new Swiper('.banner-slide',{
        loop:true,
        autoplay:{
            delay: 5000,
            disableOnInteraction: true
        },
        slidesPerView: 1,
        spaceBetween: 30,
        pagination:{
            el:'.sc-banner2 .control-area1 .pagination1',
        }
    })


    // sc-suggestion slide
    const suggestionSlide = new Swiper('.suggestion-slide',{
        slidesPerView: 3.2,
        spaceBetween: 10,
        breakpoints:{
            320: {slidesPerView: 2.2},
        }
    })

    // 탭 클릭 시 중앙 정렬 및 슬라이드 이동(sc-category, sc-event, sc-attention, .sc-popular)
    $('.group-cate a').click(function (e) {
        e.preventDefault();
        let $section = $(this).closest('.sc-category, .sc-event, .sc-attention, .sc-popular');
        let $parent = $section.find('.group-cate');
        let $tab = $(this).parent();
        let index = $tab.index();

        moveTabToCenter($parent, $tab);

        // 탭 활성화 설정
        $(this).addClass('on').parent('li').siblings().find('a').removeClass('on');

        // 해당 콘텐츠 활성화
        let target = $(this).attr('href');
        $(target).addClass('on').siblings().removeClass('on');

        // 슬라이드 이동
        let slideInstance = $section.data('slideInstance');
        if (slideInstance) {
            slideInstance.slideTo(index);
        }
    });

    // Swiper 슬라이드 초기화 (각 섹션별 적용)
    $('.sc-category, .sc-event, .sc-attention, .sc-popular').each(function (i) {
        let $section = $(this);
        let slideNum = i + 1;

        let cateSlide = new Swiper(`.cate-slide${slideNum}`, {
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: true
            },
            slidesPerView: "auto",
            spaceBetween: 8,
        });

        let contSlide = new Swiper(`.cont-slide${slideNum}`, {
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: true
            },
            slidesPerView: "auto",
            spaceBetween: 15,
            navigation: $section.is('.sc-category, .sc-attention, .sc-popular') ? {
                nextEl: `.sc-category .control-area2 .btn-next, .sc-attention .control-area2 .btn-next, .sc-popular .control-area2 .btn-next`,
                prevEl: `.sc-category .control-area2 .btn-prev, .sc-attention .control-area2 .btn-prev, .sc-popular .control-area2 .btn-prev`
            } : false,
            on: {
                "init": function () {
                    let total = this.slides.length;
                    $section.find('.curr-num').text(1);
                    $section.find('.total-num').text(total);
                },
                "slideChange": function () {
                    let idx = this.realIndex;
                    $section.find('.curr-num').text(idx + 1);

                    // 해당하는 탭 활성화
                    let $parent = $section.find('.group-cate');
                    let $tab = $parent.find('li').eq(idx);
                    
                    $parent.find("a").removeClass("on");
                    $tab.find("a").addClass("on");

                    // 탭 자동 이동 (버튼 클릭 시에도 여기서 실행되므로 중복 방지)
                    moveTabToCenter($parent, $tab);

                    // 카테고리 슬라이드 연동
                    cateSlide.slideTo(idx);
                },
            },
        });

        $section.data('slideInstance', contSlide);
    });

    // 탭 중앙 정렬 함수
    function moveTabToCenter($parent, $tab) {
        let tabWidth = $tab.outerWidth();
        let containerWidth = $parent.outerWidth();
        let scrollLeft = $parent.scrollLeft();
        let tabOffset = $tab.offset().left - $parent.offset().left;
        let middle = containerWidth / 2;
        let elementCenter = tabOffset + (tabWidth / 2);
        let centerPosition = scrollLeft + elementCenter - middle;
        let moveOffset = 10;
        
        if (tabOffset < middle) {
            centerPosition += moveOffset;
        } else {
            centerPosition -= moveOffset;
        }

        let maxMove = 200;
        let diff = Math.abs(centerPosition - scrollLeft);
        if (diff > maxMove) {
            centerPosition = scrollLeft + (centerPosition > scrollLeft ? maxMove : -maxMove);
        }

        $parent.stop().animate({ scrollLeft: centerPosition }, 300);
    }


    // sc-saw slide
    const sawSlide = new Swiper('.saw-slide',{
        slidesPerView: "auto",
        spaceBetween: 15,
        pagination:{
            el:'.sc-saw .control-area1 .pagination1',
        }
    })


    // sc-only slide
    const onlySlide = new Swiper('.only-slide',{
        spaceBetween: 15,
        pagination:{
            el:'.sc-only .control-area1 .pagination1',
        }

    })
    

    // sc-about
    // button 클릭 시 about-item 나타나고 button 사라지게
    $('.sc-about .btn-more').click(function(){
        $('.sc-about .about-item').slice(0, 10).removeClass('hidden');
        $(this).hide();
    })


    // sc-new btn-new
    $(".sc-new").each(function () {
        let idx = 0;
        let $scNew = $(this); // 현재 `.sc-new` 섹션만 선택
        let $wraps = $scNew.find(".content-wrap"); // 해당 섹션 내부의 content-wrap 요소들

        $wraps.hide().eq(idx).show(); // 처음에 첫 번째만 보이게

        $scNew.find(".btn-new").on("click", function () {
            $wraps.eq(idx).hide(); // 현재 요소 숨기기
            idx = (idx + 1) % $wraps.length; // 다음 인덱스로 변경 (순환)
            $wraps.eq(idx).show(); // 다음 요소 보이기

            $(this).find(".curr").text(idx + 1); // 현재 버튼 내 curr 숫자 변경
        });
    });
    
    
    // sc-special slide
    const specialSlide = new Swiper('.special-slide',{
        slidesPerView: 3.2,
        spaceBetween: 10,
    })

    
    // sc-live slide
    const liveSlide = new Swiper('.live-slide',{
        slidesPerView: "auto",
        spaceBetween: 10,
    })


})
