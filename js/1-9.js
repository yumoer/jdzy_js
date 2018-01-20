/*
 1. 鼠标移入显示,移出隐藏
 目标: 手机京东, 客户服务, 网站导航, 我的京东, 去购物车结算, 全部商品
 2. 鼠标移动切换二级导航菜单的切换显示和隐藏
 3. 输入搜索关键字, 列表显示匹配的结果
 4. 点击显示或者隐藏更多的分享图标
 5. 鼠标移入移出切换地址的显示隐藏
 6. 点击切换地址tab

 7. 鼠标移入移出切换显示迷你购物车
 8. 点击切换产品选项 (商品详情等显示出来)
 9. 当鼠标悬停在某个小图上,在上方显示对应的中图
 10. 点击向右/左, 移动当前展示商品的小图片
 11. 当鼠标在中图上移动时, 显示对应大图的附近部分区域
 */

$(function () {
    showHide()
    subMenu()
    search()
    share()
    address()
    minicart()
    products()
    mediumImg()
    movePic()
    showBig()
    // 1. 鼠标移入显示,移出隐藏
    // 目标: 手机京东, 客户服务, 网站导航, 我的京东, 去购物车结算, 全部商品
    function showHide() {
        $('[name=show_hide]').hover(function () {
          //获取父级元素，拼接子集元素
          var id = $(this).attr('id');
          $('#'+id+'_items').show();
        },function () {
          var id = $(this).attr('id');
          $('#'+id+'_items').hide();
        })
    }
    //2. 鼠标移动切换二级导航菜单的切换显示和隐藏
    function subMenu() {
        $('#category_items>.cate_item').hover(function () {
            $(this).children('div').show();
        },function () {
            $(this).children('div').hide();
        })
    }

    //3. 输入搜索关键字, 列表显示匹配的结果
    function search() {
        $('#txtSearch').on('focus keyup',function () {
            var val=$.trim($(this).val())
            if(val){
            $('#search_helper').show();
            }
        }).blur(function () {
            $('#search_helper').hide();
        })
    }

    //4. 点击显示或者隐藏更多的分享图标
    function share() {
        var isopen = false;
        $('#shareMore').click(function () {
            if (isopen) {
                $(this).parent().css('width', '155px');
                $(this).children().removeClass('backword');
                $(this).prevAll(':lt(2)').hide();
            } else {
                $(this).parent().css('width', '200px');
                $(this).children().addClass('backword');
                $(this).prevAll(':lt(2)').show();
            }
            isopen = !isopen;
        })
    }

    /*5. 鼠标移入移出切换地址的显示隐藏
     6. 点击切换地址tab*/
    function address() {
        $('#store_select').hover(function () {
            $('#store_content,#store_close').show();
        }, function () {
            $('#store_content,#store_close').hide();
        });
        $('#store_close').click(function () {
            $('#store_content,#store_close').hide();
        });
        $('#store_tabs li').click(function () {
            $(this).addClass('hover').siblings().removeClass('hover');
        })
    }

    //7. 鼠标移入移出切换显示迷你购物车
    function minicart() {
        $('#minicart').hover(function () {
            $(this).addClass('minicart');
            $('#minicart').children().show();
        }, function () {
            $(this).removeClass('minicart');
            $('#minicart').children().hide();
        })
    }

    //8. 点击切换产品选项 (商品详情等显示出来)
    function products() {
        $('#product_detail>ul>li').click(function () {
            $(this).addClass('current').siblings().removeClass('current');
            var index = $(this).index();
            var $divs = $('#product_detail>div:not(:first)');
            $divs.hide();
            $divs.eq(index).show();
        })
    }

    //9. 当鼠标悬停在某个小图上,在上方显示对应的中图
    function mediumImg() {
        $('#icon_list>li').hover(function () {
            //获取小图src（srcS）
            var srcS = $(this).children().attr('src');
            //根据小图src拼装对应的中图src（srcM）
            var srcM = srcS.replace('.jpg', '-m.jpg');
            //修改中图src（srcM）
            $('#mediumImg').attr('src', srcM);
            $(this).children().addClass('hoveredThumb');
        }, function () {
            $(this).children().removeClass('hoveredThumb');
        })
    }
    // 10. 点击向右/左, 移动当前展示商品的小图片
    function movePic() {
        // 两按钮、图片容器、图片总数、显示图片、计数容器、图片宽度、初始化右键
        var $backward = $('#preview>h1>a:first');
        var $forward = $('#preview>h1>a:last');
        var $list = $('#icon_list');
        var img = $list.children().length;
        var show_img = 5;
        var img_count = 0;
        var img_width = 62;
        if(img>show_img){
            $forward.attr('class','forward');
        }
        //获取目标、边界值判断、修改按钮可点击状态、获取点击的class、判断点击的状态
        $forward.click(function () {
            var nowclass = $(this).attr('class');
            if (nowclass !== 'forward_disabled'){
                img_count++;
                if (img_count === img - show_img){
                    $forward.attr('class','forward_disabled')
                }
                $backward.attr('class','backward');
                $list.css('left',-img_count*img_width)
            }
        });
        $backward.click(function () {
            var nowclass = $(this).attr('class');
            if(nowclass !== 'backward_disabled'){
                img_count--;
                if (img_count === 0){
                    $backward.attr('class','backward_disabled')
                }
                $forward.attr('class','forward')
                $list.css('left',-img_count*img_width)
            }
        })
    }
    //11.当鼠标在中图上移动时，显示对应大图的附近部分区域
    function showBig() {
        //获取小黄块、获取透明遮罩层、获取大图、大图容器
        var $mask = $('#mask');
        var $maskTop = $('#maskTop');
        var mediumImg = $('#mediumImg');
        var $largeImgContainer = $('#largeImgContainer');
    $maskTop.hover(function () {
        $mask.show();
        $maskTop.mousemove(function (event) {
            var left=0;
            var top=0;
            //获取当前事件坐标
            var offsetX = event.offsetX;
            var offsetY = event.offsetY;
        })
        $mask.css({
            left:offsetX,
            top:offsetY
        })
    },function () {
        $mask.hide();
    })
    }
})


































})