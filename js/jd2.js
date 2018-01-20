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
    /* 11. 当鼠标在中图上移动时, 显示对应大图的附近部分区域*/
    function showBig () {
        //小黄块
        var $mask = $('#mask')
        //中图
        var $mediumImg = $('#mediumImg');
        //透明遮罩层
        var $maskTop = $('#maskTop');
        //大图 大图容器
        var $largeImgContainer = $('#largeImgContainer');
        var $largeImg = $('#largeImg');
        //获取小黄块的宽高
        var maskWidth = $mask.width();
        var maskHeight = $mask.height();
        var mediumWidth = $mediumImg.width();
        var mediumHeight = $mediumImg.height();

        $maskTop.hover(function () {
            $mask.show()
            $largeImgContainer.show()
            $largeImg.show()
            //获取中图路径
            var srcM = $mediumImg.attr('src');

            //拼装大图路径 并且赋值
            var srcL = srcM.replace('m.jpg','l.jpg')
            $largeImg.attr('src',srcL);
            //获取大图的宽高  因为大图容器的宽高分别为大图的二分之一
            var largeWidth = $largeImg.width();
            var largeHeight = $largeImg.height();
            $largeImgContainer.width(largeWidth/2)
            $largeImgContainer.height(largeHeight/2)
            //绑定滑动事件 时时的去获取坐标赋值给小黄块
            $maskTop.mousemove(function (event) {
                //最核心目的 算出小黄块的left top值
                var left = 0;
                var top = 0;
                //获取坐标
                var offsetLeft = event.offsetX;
                var offsetTop = event.offsetY;
                //计算出小黄块的坐标 并且修正位置
                left = offsetLeft - maskWidth/2;
                top = offsetTop - maskHeight/2;

                //做边界值判断
                if(left<0){
                    left = 0;
                    //小黄块横向坐标的最大值为  中图的宽度减去小黄块的快读
                }else if (left > mediumWidth - maskWidth){
                    left = mediumWidth - maskWidth
                }
                if (top < 0){
                    top = 0;
                }else if(top > mediumHeight - maskHeight){
                    top = mediumHeight - maskHeight;
                }
                $mask.css({
                    left:left,
                    top:top
                })
                //根据中图的坐标计算出 大图的对应位置
                left = -largeWidth/mediumWidth*left;
                top = -largeHeight/mediumHeight*top
                //赋值
                $largeImg.css({
                    left:left,
                    top:top
                })
            })
        },function () {
            $mask.hide()
            $largeImgContainer.hide()
            $largeImg.hide()
        })
    }
    /* 10. 点击向右/左, 移动当前展示商品的小图片*/
    function movePic () {
        var $preview = $('#preview');
        //获取两个按钮
        var $backward = $preview.children('h1').children('a:eq(0)');
        var $forward = $preview.children('h1').children('a:eq(1)');
        //获取图片容器
        var $icon_list = $('#icon_list');
        //显示图片的张数
        var showImg = 5;
        //图片总张数
        var pic = $icon_list.children().length;
        //记录左侧有几张图片
        var imgCount = 0;
        //定义单个li宽度
        var itemsWidth = 62;
        if(pic>showImg){
            $forward.attr('class','forward')
        }
        $forward.click(function () {
            //判断当前按钮是否在可点击状态
            var nowClass = $(this).attr('class');
            if(nowClass !== 'forward_disabled'){
                //这一次点击成功后 给计数变量+1  原因 是因为点击的右侧按钮
                imgCount++;
                $icon_list.css('left',-itemsWidth*imgCount);
                //计数变量等于图片总数减去显示图片张数的时候      右侧按钮不能点击
                if (imgCount === pic-showImg){
                    $forward.attr('class','forward_disabled')
                }
                //判断左侧是否有图片 更新左侧按钮的状态
                if (imgCount > 0){
                    $backward.attr('class','backward');
                }
            }
        });
        $backward.click(function () {
            var nowClass = $(this).attr('class');
            if (nowClass !=='backward_disabled'){
                imgCount--;
                $icon_list.css('left',-itemsWidth*imgCount);
                //当计数变量为0时 说明左侧没有图片了  更新左侧按钮的状态为不可点击
                if (imgCount === 0){
                    $backward.attr('class','backward_disabled')
                }
                if (imgCount < pic-showImg){
                    $forward.attr('class','forward')
                }
            }
        })
    }
    // 9. 当鼠标悬停在某个小图上,在上方显示对应的中图
    function mediumImg () {
        $('#icon_list>li').hover(function () {
            //获取小图的src
            var src = $(this).children().attr('src');
            //拼装成中图所对应的src
            // img\products\product-s2-m.jpg
            // img\products\product-s2.jpg
            var srcMedium = src.replace('.jpg','-m.jpg')
            //把新的src赋值给中图的src属性
            $('#mediumImg').attr('src',srcMedium);
            //移入移出是添加或删除对应的高亮class
            $(this).children().addClass('hoveredThumb');

        },function () {
            $(this).children().removeClass('hoveredThumb')
        })
    }
    /*8. 点击切换产品选项 (商品详情等显示出来)*/
    function products () {
        $('.main_tabs>li').click(function () {
            $(this).addClass('current');
            $(this).siblings().removeClass('current');

            var $div = $('#product_detail').children('div:not(:first)');
            var index = $(this).index();
            $div.hide();
            $div.eq(index).show();
        })
    }
    /* 7. 鼠标移入移出切换显示迷你购物车*/
    function minicart () {
        $('#minicart').hover(function () {
            $(this).addClass('minicart');
            $(this).children('div').show();
        },function () {
            $(this).removeClass('minicart');
            $(this).children('div').hide();
        })
    }
    /* 5. 鼠标移入移出切换地址的显示隐藏
     6. 点击切换地址tab*/
    function address () {
        $('#store_select').hover(function () {
            $('#store_content,#store_close').show()
        },function () {
            $('#store_content,#store_close').hide()
        })
        $('#store_close').click(function () {
            $('#store_content,#store_close').hide()
        })
        $('#store_tabs>li').click(function () {
            //给当前点击的元素添加class
            $(this).addClass('hover');
            //给其余的兄弟元素清除class
            $(this).siblings().removeClass('hover')
        })
    }
/* 4. 点击显示或者隐藏更多的分享图标*/
    function share() {
        //定义标识 记录打开的状态 默认变量isopen是关闭的
        var isOpen = false
        //给父元素的id=shareMore绑定click事件
        $('#shareMore').click(function () {
            //isOpen状态为true 所以执行收起的逻辑
            if (isOpen){
                // 给父元素的id=dd，修改它的css样式：宽度=155px
                $('#dd').css('width','155px');
                //从父元素的id=shareMore的后代b元素中删除'backword'类
                $(this).prevAll(':lt(2)').hide();
                //查找父元素id=shareMore的前两个同辈元素使其隐藏
                $(this).children().removeClass('backword');
                //isOpen状态为false 所以执行展开的逻辑
            }else {
                //给父元素的id=dd，修改它的css样式：宽度=200px
                $('#dd').css('width','200px')
                //从父元素的id=shareMore的后代b元素中添加'backword'类
                $(this).prevAll(':lt(2)').show()
                //查找父元素id=shareMore的前两个同辈元素使其显示出来
                $(this).children().addClass('backword');
            }
            //打开和关闭互换切换
            isOpen = !isOpen
        })
    }
/*3. 输入搜索关键字, 列表显示匹配的结果*/
        //当元素获得焦点时，触发 focus 事件。
        //当按钮被松开时，发生 keyup 事件。它发生在当前获得焦点的元素上。
        //当元素失去焦点时触发 blur 事件。
    function search() {
        //在子元素id=txtSerarch，用on绑定focus和keyup两个事件
        $('#txtSearch').on('focus keyup',function () {
            //获取输入框中的值并去掉空格只显示文本
            var val = $.trim($(this).val());
            //判断父元素id=search_helper，当输入搜索关键字，列表显示匹配的结果
            if (val){
                //判断父元素id=search_helper，当没有输入搜索关键字，列表不显示
            $('#search_helper').show()
            }
        }).blur(function () {
            $('#search_helper').hide()
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
    function showHide () {
        //在属性name=show_hide中，使鼠标移动到元素上要触发的函数
        $('[name=show_hide]').hover(function () {
            //获取当前li的id,返回文档中的div元素的id属性值
            var id = $(this).attr('id');
            //拼接选择器字符串,显示替换的id属性值，使其鼠标移出隐藏
            $('#'+id+'_items').show();
        },function () {
            ////获取当前li的id,返回文档中的div元素的id属性值
            var id = $(this).attr('id');
            //拼接选择器字符串,显示替换的id属性值，使其鼠标移出隐藏
            $('#'+id+'_items').hide();
        })
    }
})




