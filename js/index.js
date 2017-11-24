(function(){
    var indexCtrl = {
        loadHash: true,
        init: function(){
            var $this = this;
            $('.worker .main, .worker .job h2, .worker .job .container, .worker .job .btn, .worker .job .mt, .worker .job .solar_box').addClass('wow fadeInUp');//.attr('data-wow-offset', '50');
            
            // 初始化WOW
            $('.wow').css('visibility', 'hidden');

            this.menuSet();
            this.hashSet();
            this.scrollSet();

            $(window).on('load', function(){
                new WOW().init();
                $this.loadHash = false;
            }).on('scroll', function(){
                $this.scrollSet();
            });
        },
        menuSet: function(){
            // 漢堡
            $('.js-toggle-menu').click(function(e){
                e.preventDefault();
                $('.mobile-header-nav').slideToggle();
                $(this).toggleClass('open');
            });
            // logo
            $('header .logo').click(function(e){
                e.preventDefault();
                $('html, body').stop().animate({ scrollTop: 0 }, 500);
            });
            // menu設置
            $('.pc_nav li, .mobile-nav-wrap li').click(function(e){
                e.preventDefault();
                var menuIndex = $(this).index();
                var final = '';
                switch (menuIndex){
                    case 0:
                        final = 'worker';
                        break;
                    case 1:
                        final = 'learning';
                        break;
                    case 2:
                        final = 'welfare';
                        break;
                }
                $('html, body').stop().animate({ scrollTop: $('.' + final).position().top }, 500);
                if($('.js-toggle-menu').hasClass('open')) $('.js-toggle-menu').click();
            });
            // 立即應徵
            $('.apply_btn').click(function(e){
                e.preventDefault();
                $('.pc_nav li:eq(0)').click();
            });
        },
        hashSet: function(){
            var $this = this;
            var workerHash = (location.hash != '' && location.hash.indexOf('#hash') > -1) ? location.hash.replace('#hash', '') : '1' ;

            // worker tab設置, 讀hash做初始化
            $('.worker .tab li').click(function(e){
                e.preventDefault();
                var index = ($(this).index() + 1);
                $('.worker .tab li').find('a').removeClass('active');
                $('.worker .p1, .worker .p2, .worker .p3, .worker .p4, .worker .p5').hide();
                $(this).find('a').addClass('active');
                $('.worker .p'+index).show();

                if(!$this.loadHash) location.hash = '#hash' + index;
            }).eq((workerHash-1)).click();
        },
        scrollSet: function(){
            var disTop = $(window).scrollTop();
            var menuTop = $('header').position().top;
            var learnTop = $('.learning').position().top - $('.learning').height();
            
            if(disTop > menuTop){
                $('header').css('position', 'fixed');
            }else{
                $('header').css('position', 'absolute');
            }
            
            if(disTop > learnTop){
                $('.apply_btn').addClass('show');
            }else{
                $('.apply_btn').removeClass('show');
            }
        }
    }
    indexCtrl.init();
})();