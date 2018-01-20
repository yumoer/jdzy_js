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

    // 11. 当鼠标在中图上移动时, 显示对应大图的附近部分区域
    function showBig() {
        //获取小黄块、获取透明遮罩层、获取大图、大图容器
    var $mask = $('#mask');
    var maskwidth = $mask.width();
    var maskheight = $mask.height();
    var $maskTop = $('#maskTop');
    var mImgwidth = $maskTop.width();
    var mImgheight = $maskTop.height();
    var $largeImgContainer = $('#largeImgContainer');
    var $largeImg = $('#largeImg');
    $maskTop.hover(function () {
        $mask.show();
        $largeImgContainer.show();
        $largeImg.show();
        //获取中图src
        var srcM = $('#mediumImg').attr('src');
        //拼接中图src(获取大图src)
        var srcL = srcM.replace('m.jpg','l.jpg');
        //修改大图src
        $largeImg.attr('src',srcL);
        //获取大图宽高
        var lImgwidth = $largeImg.width();
        var lImgheight = $largeImg.height();
        //设置大图容器宽高
        $largeImgContainer.css({
            width:lImgwidth/2,
            height:lImgheight/2
        })
        $maskTop.mousemove(function (event) {
            var left = 0;
            var top = 0;
            var offsetX = event.offsetX;
            var offsetY = event.offsetY;
            left = offsetX - (maskwidth/2);
            top = offsetY - (maskheight/2);
            //横向判断
            if (left < 0){
                left = 0
            }else if(left > mImgwidth - maskwidth) {
                left = mImgwidth - maskwidth
            }
            //纵向判断
            if (top < 0){
                top = 0
            }else if(top > mImgheight - maskheight) {
                top = mImgheight - maskheight
            }
            //最终目标  修改小黄块位置
            $mask.css({
                left:left,
                top:top
            })
            left = -(left/mImgwidth)*lImgwidth;
            top = -(top/mImgheight)*lImgheight;
            //最终目标  修改大图位置
            $largeImg.css({
                left:left,
                top:top
            })
        })
    },function () {
        $mask.hide();
        $largeImgContainer.hide();
        $largeImg.hide();
    })
    }

    // 10. 点击向右/左, 移动当前展示商品的小图片
    function movePic() {
//  获取两个按钮
        var $backward = $('#preview>h1>a:first');
        var $forward = $('#preview>h1>a:last');
//    获取图片容器
        var $list = $('#icon_list');
//    获取图片总数
        var img = $list.children().length;
//    定义显示图片的张数 5
        var show_img = 5;
//    计数变量  记录左侧有几张图片
        var img_count = 0;
//    定义图片宽度
        var img_width = 62;
//    初始化右侧按钮 是否可点击
        if(img > show_img){
            $forward.attr('class','forward');
        }
//    右侧按钮逻辑
        $forward.click(function () {
            //获取当前按钮的class
            var nowclass = $(this).attr('class');
            //判断按钮是否可以点击
            if (nowclass !== 'forward_disabled'){
                img_count++;
                //边界值判断
                if(img_count === img - show_img){
                    $forward.attr('class','forward_disabled')
                }
                //修改左侧按钮点击的状态
                $backward.attr('class','backward')
                //最终目标
                $list.css('left',-img_count*img_width)
            }
        })
        $backward.click(function () {
            //获取当前按钮的class
            var nowclass = $(this).attr('class');
            //判断按钮是否可以点击
            if(nowclass !== 'backward_disabled'){
                img_count--;
                //边界值判断
                if(img_count === 0){
                    $backward.attr('class','backward_disabled');
                }
                //修改右侧按钮点击的状态
                $forward.attr('class','forward')
                //最终目标
                $list.css('left',-img_count*img_width)
            }
        })
    }

    // 9. 当鼠标悬停在某个小图上,在上方显示对应的中图
    /*function mediumImg() {
        $('#icon_list li').hover(function () {
            //中图标签
            var $mediumImg = $('#mediumImg');
            $(this).children().addClass('hoveredThumb');
            //想办法得到中图的src
            //小图的src
            var srcS = $(this).children().attr('src');
            //拼接中图src
            //img/products/product-s1-m.jpg
            //img\products\product-s1.jpg
            var srcM = srcS.replace('.jpg', '-m.jpg');
            $mediumImg.attr('src', srcM);
        }, function () {
            $(this).children().removeClass('hoveredThumb');
        })
    }*/
    function mediumImg() {
        $('#icon_list>li').hover(function () {
            $(this).children().addClass('hoveredThumb');
            //获取小图src（srcS）
            var srcS=$(this).children().attr('src');
            //根据小图src拼装对应的中图src（srcM）
            var srcM=srcS.replace('.jpg','-m.jpg');
            //修改中图src（srcM）
            $('#mediumImg').attr('src',srcM)
        },function () {
            $(this).children().removeClass('hoveredThumb');
        })
    }
    // 8. 点击切换产品选项 (商品详情等显示出来)
    /*function products() {
        //修改按钮的高亮（选中状态）样式
        $('#product_detail .main_tabs li').click(function () {
            $(this).siblings().removeClass('current');
            $(this).addClass('current');
            //获取当前index，显示对应的内容区域
            var index = $(this).index();
            var $divs = $('#product_detail>div:not(:first)');
            $divs.hide();
            $divs[index].style.display = 'block';
        })
    }*/

    function products() {
        $('#product_detail>ul>li').click(function () {
            $(this).addClass('current').siblings().removeClass('current');
            var index = $(this).index();
            var $divs = $('#product_detail>div:not(:first)');
            $divs.hide();
            $divs.eq(index).show();
        })
    }

    // 7. 鼠标移入移出切换显示迷你购物车
    /*function minicart() {
        $('#minicart').hover(function () {
            $(this).addClass('minicart');
            $(this).children('div').show();
        }, function () {
            $(this).removeClass('minicart');
            $(this).children('div').hide();
        })
    }*/
    function minicart() {
        $('#minicart').hover(function () {
            $(this).addClass('minicart');
            $(this).children('div').show();
        },function () {
            $(this).removeClass('minicart');
            $(this).children('div').hide();
        })
    }

    //5. 鼠标移入移出切换地址的显示隐藏
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
    // 6. 点击切换地址tab

    /*function address() {
        $('#store_select').hover(function () {
            $('#store_content,#store_close').show();
        }, function () {
            $('#store_content,#store_close').hide();
        })
        $('#store_tabs li').click(function () {
            $(this).siblings().removeClass('hover');
            $(this).addClass('hover');
        });
        $('#store_close').click(function () {
            $('#store_content,#store_close').hide();
        })
    }*/
    /* 4. 点击显示或者隐藏更多的分享图标(父元素的width,子元素的backward，两个图标的显示)*/
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
    /*function share() {
        var isopen= false;
        $('#shareMore').click(function () {
           if(isopen){
               $(this).parent().css('width','155px')
               $(this).children().removeClass('backword')
               $(this).prevAll(':lt(2)').hide();
           }else{
               $(this).parent().css('width','200px')
               $(this).children().addClass('backword')
               $(this).prevAll(':lt(2)').show();
           }
        isopen=!isopen;
    })
    }*/



    /*3. 输入搜索关键字, 列表显示匹配的结果*/
    //当元素获得焦点时，触发 focus 事件。
    //当按钮被松开时，发生 keyup 事件。它发生在当前获得焦点的元素上。
    //当元素失去焦点时触发 blur 事件。
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
    /* 2. 鼠标移动切换二级导航菜单的切换显示和隐藏*/
    function subMenu() {
        //在class=.cate_item中，使鼠标移动到元素上要触发的函数
        $('#category_items>.cate_item').hover(function () {
            //鼠标移入显示它的子代div元素(二级导航)
            $(this).children('div').show()
        },function () {
            //鼠标移出隐藏它的子代div元素(二级导航)
            $(this).children('div').hide()
        })
    }
    /* 1. 鼠标移入显示,移出隐藏
     目标: 手机京东, 客户服务, 网站导航, 我的京东, 去购物车结算, 全部商品*/
    function showHide() {
        $('[name=show_hide]').hover(function () {
            //获取父元素id，拼接子元素id
            var id = $(this).attr('id');
            $('#'+id+'_items').show();
        },function () {
            var id = $(this).attr('id');
            $('#'+id+'_items').hide() ;
        })
    }
})


