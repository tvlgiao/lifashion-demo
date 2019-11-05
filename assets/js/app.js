//var isMobile = /iPhone|iPod|iPad|Phone|Mobile|Android|hpwos/i.test(navigator.userAgent);
//var isPhone = /iPhone|iPod|Phone|Android/i.test(navigator.userAgent);
/* SHARED VARS */
var touch = false;

function showSidebar() {
    $('[data-icon-menu]').on('click', function(e) {
        e.preventDefault();	
        $('[data-header-sidebar]').addClass('show');
        $('[data-close-sidebar]').addClass('active');
    });
    $('[data-close-sidebar]').on('click', function(e) {	
        e.preventDefault();	
        $('[data-header-sidebar]').removeClass('show');
        $('[data-close-sidebar]').removeClass('active');
    });
}

function filter() {
    // Filter More Click
    $('[data-menu-more]').on('click', function(e) {
        e.preventDefault();
        if ($(this).hasClass('less')) {
            $(this).addClass("more").removeClass('less').html('More ...');
            $('.more-item').removeClass('show').addClass('hide');
        } else {
            $(this).addClass("less").removeClass('more').html('Close (X)');
            $('.more-item').removeClass('hide').addClass('show');
        }
    });
    // Filter Click
    $('[data-style]').on( 'click', function(e)  {
        e.preventDefault();
        $('[data-style]').removeClass("active");
        $(this).addClass("active");						
        var selected = '.'+$(this).data( "style" );

        $('.demo-preview-item').addClass("hide").removeClass("fadeIn animated");
        $(selected).removeClass("hide wow").addClass("fadeIn animated");
        $(selected).removeAttr("style");
    });
}

function stickyHeader() {
    if ($(window).scrollTop() > 60) {
        if (!$('[data-header]').hasClass('affix')) {
            $('[data-header]').addClass('affix');
        }
    } else {
        if ($('[data-header]').hasClass('affix')) {
            $('[data-header]').removeClass('affix');
        }
    }
}

function countInfo() {
    var initCount = function(){
        var info = $('[data-info]'),
            windownTop = $(window).scrollTop(),
            windownHeight = $(window).height();
        if(windownTop + windownHeight >= info.offset().top && windownTop <= info.offset().top + info.height()) {
            info.each(function() {
                if(!$(this).hasClass('active-count')){
                    $(this).addClass('active-count');
                    var number = $(this).data('number');
                    var suffix = $(this).data('info');
                    var timer = $(this).data('item-timer');
                    countDown($(this), 0, number, suffix, timer);
                }
            });
        }
    }
    var countDown = function($this, first, number, suffix, timer){
        if(first <= number ){
            $this.html(first.toLocaleString()+'+');
            setTimeout (function() { countDown($this, first+suffix, number, suffix, timer); }, timer);
        } else {
            return false;
        }
    }
    initCount();
}

function countHome() {
    var initCount = function(){
        var info = $('[data-item-number]'),
            windownTop = $(window).scrollTop(),
            windownHeight = $(window).height();
        if(windownTop + windownHeight >= info.offset().top && windownTop <= info.offset().top + info.height()) {
            info.each(function() {
                if(!$(this).hasClass('active-count')){
                    $(this).addClass('active-count');
                    var number = $(this).data('item-number');
                    var suffix = $(this).data('item-suffix');
                    var timer = $(this).data('item-timer');
                    countDown($(this), 0, number, suffix, timer);
                }
            });
        }
    }
    var countDown = function($this, first, number, suffix, timer){
        if(first <= number ){
            $this.html(first.toLocaleString());
            setTimeout (function() { countDown($this, first+suffix, number, suffix, timer); }, timer);
        } else {
            return false;
        }
    }
    initCount();
}

function video() {
    var video = $('[data-video]'),
        windownTop = $(window).scrollTop(),
        windownHeight = $(window).height();
    if(windownTop + windownHeight >= video.offset().top && windownTop <= video.offset().top + video.height()) {
        video[0].play();
        if (!video.hasClass('played')) {
            video.addClass('played');
        }
    } else {
        if (video.hasClass('played')) {
            video.removeClass('played');
            video[0].pause();
        }
    }
}

function animateClick(){
	$('[data-menu-animate]').on( 'click', function(e)  {
        e.preventDefault();
        var data = $(this).data('menu-animate');
		$('html, body').animate({
            scrollTop: $('#'+data).offset().top - 100
        }, 1000);
	});	
}

function sliderTheme(){
    $('[data-slider-theme]').each(function() {
        var time = $(this).data('slider-theme');
        $(this).slick({
            lazyLoad: 'ondemand',
            pauseOnHover: false,
            autoplay: true,
            speed: 1000,
            autoplaySpeed: time,
            prevArrow: '<button class="slick-prev"><img src="assets/icon/icon-left.svg" alt="Previous"></button>',
            nextArrow: '<button class="slick-next"><img src="assets/icon/icon-right.svg" alt="Next"></button>',
            slidesToShow: 1,
            slidesToScroll: 1
        }); 
    });
}

function handleScrollTop() {
    var toTop = function(a){
        var b = $('[data-scroll-to-top]');
        if (a == "on") {
            b.addClass("on fadeInRight ").removeClass("off fadeOutRight"); 
        } else {
            b.addClass("off fadeOutRight animated").removeClass("on fadeInRight"); 
        }
    }
    $(window).on('scroll', function() {
        var b = $(this).scrollTop();
        var c = $(this).height();
        if (b > 0) { 
            var d = b + c / 2;
        } 
        else { 
            var d = 1 ;
        }    
        if (d < 1e3 && d < c) { 
            toTop("off");
        }
        else {
            toTop("on"); 
        }
    });  
    $('[data-scroll-to-top]').on( 'click', function(e)  {
        e.preventDefault();
        $('body,html').animate({scrollTop:0},800,'swing');
    });
}

$(document).on('ready', function() {
    $.support.touch = 'ontouchend' in document;

    if ($.support.touch) {
        touch = true;
        $('body').addClass('touch');
    } else {
        $('body').addClass('notouch');
    }

    if(window !== window.parent){
        var userAgent = window.navigator.userAgent;
        if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)) {
            window.open('https://themeforshop.github.io/everything-demo/', '_parent');
        }
    }

    wow = new WOW({
        boxClass: 'wow',
        animateClass: 'animated',
        offset: 100,
        mobile: true,
        live: true
    });
    wow.init();

    // countHome();

    showSidebar();

    animateClick();

    handleScrollTop();
});

$(window).on('scroll', function() {
    // countHome();
    countInfo();
});