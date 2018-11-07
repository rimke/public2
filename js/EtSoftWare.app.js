( function( global, factory ) {
    "use strict";
    ET.loadLib('unit');
    ET.loadLib('event');
    ET.loadLib('location');
    if( typeof($)=='undefined' ){
        console.log('jQuery frame not detected!');
        return ;
    };
    factory( global, $ );
} )(typeof window !== "undefined" ? window : this, function( window, $ ) {
    var header = null ,iptKeywords = null ,haSearch = null ,hdivSearch = null ,logo = null
    ,hspnmenu = null ,hnav = null ,hdivMask = null ,hfrm = null ,section = null, docTouch=[]
    ;
    /**
     * 开始触摸屏幕
     * @param  {[type]} e [description]
     * @return {[type]}   [description]
     */
    function docTouchstart(e){e=e||event; docTouch[0]=e.touches; }
    function docTouchmove(e){e=e||event; docTouch[1]=e.touches; 
        if( hdivMask.is(':visible') ) ET.event.preventDefault(e);
    }
    /**
     * 结束触摸屏幕
     * @param  {[type]} e [description]
     * @return {[type]}   [description]
     */
    function docTouchend(e){
        // console.log(docTouch.length);
        if(docTouch.length<2){return ;}
        if( docTouch[0][0].pageX-docTouch[1][0].pageX>80){
            hideMenu();
        }
    }
    /**
     * 显示菜单
     * @return {[type]} [description]
     */
    function showMenu(){
        $(window).scrollTop(0); 
        $('body').css(ET.css.autoCompatible('transform', 'translateX(80%)')); 
        hdivMask.show(); 
        $(hnav.find("a")[0]).focus(); 
    }
    /**
     * 隐藏菜单
     * @return {[type]} [description]
     */
    function hideMenu(){$('body').css(ET.css.autoCompatible('transform', '')); hdivMask.hide(); }
    /**
     * 显示搜索
     * @return {[type]} [description]
     */
    function showSearch(){
        hdivSearch.css('width', '90%');
        haSearch.addClass('search'); 
        logo.hide();
        hnav.hide();
        iptKeywords.show().focus().blur(function(){
            setTimeout(function(){ hideSearch(); }, 80);
        });
    }
    /**
     * 隐藏搜索
     * @return {[type]} [description]
     */
    function hideSearch(){
        haSearch.removeClass('search');
        iptKeywords.hide();
        hdivSearch.css('width', 'auto');
        logo.show();
        hnav.show();
    }

    /**
     * 下拉刷新
     */
    function PulldownToRefresh(){
        section.on('touchstart', function(e){
            var touch = event.targetTouches[0];
            this.position={x:touch.pageX ,y:touch.pageY }
        }).on('touchmove', function(e){
            var touch = event.targetTouches[0];
            this.position2={x:touch.pageX ,y:touch.pageY }
            //判断方向
            //if( !this.direction ){
                var x = this.position2.x - this.position.x
                ,y = this.position2.y - this.position.y;
                px =(x<0)?x*-1:x; py =(y<0)?y*-1:y;
                this.direction = (px>py)?(x>0)?'+x':'-x':(y>0)?'+y':'-y';
            //}
              
            if(this.direction=='+y' && section.scrollTop()==0){
                ET.event.preventDefault(e);
                if(!this.loadui){
                    this.loadui = ET.ce('div', {'style':'text-align:center;'});
                    $(this.loadui).append(ET.ce('span', {'class':'ico glyphicon glyphicon-arrow-down'}))
                    .append(ET.ce('span', {'class':'msg'}));
                    section.prepend(this.loadui);
                }
                $(this.loadui).css('height',(this.position2.y-this.position.y)+'px');
                if( section.scrollTop()==0 && 
                    this.position2.y-this.position.y>50
                    ){
                    $(this.loadui).find('span.ico').removeClass('glyphicon-arrow-down').addClass('glyphicon-arrow-up');
                    $(this.loadui).find('span.msg').html('LOOSEN REFRESH');
                    this.reload=true;
                }else{
                    this.reload=false;
                    $(this.loadui).find('span.ico').removeClass('glyphicon-arrow-up').addClass('glyphicon-arrow-down');
                    $(this.loadui).find('span.msg').html('PULL DOWN REFRESH');
                }
            }
        }).on('touchend', function(e){
            this.direction = null;            
            if( this.reload ){
                if(this.loadui){
                    $(this.loadui).css('height','auto').html('Loading...');
                }
                location.reload();
            }else{
                if(this.loadui){
                    $(this.loadui).remove();
                    this.loadui = null;
                }
            }
            
        });
    }
    /**
     * 初始化form
     * @return {[type]} [description]
     */
    function iniForm(){
        if( !hfrm.attr('action') || hfrm.attr('action')=='' ){
            var url = location.href
            re = '('+iptKeywords.attr('name')+'=[^&]+)|';
            re += '(page=\\d+)|';
            re += '(#|\\&$)';
            re = new RegExp(re, 'gi');
            url= url.replace(re, '');
            re = "(\\w+)=(\\w+)";
            var mc = url.match(new RegExp(re, 'gi'));                
            if(mc){
                for(var i=0; i<mc.length; i++){
                    var m = (new RegExp(re,'gi')).exec(mc[i])
                    ipt = ET.ce('input', {'type':'hidden', 'name':m[1]});
                    ipt.value=m[2];
                    hfrm.prepend(ipt);
                }
            }
            hfrm.attr('action', url);
        }
        haSearch.click(function(){
            if ($(this).hasClass('search')){
                $(this).removeClass('search');
                hideSearch();
                (iptKeywords.val().length>0 ) && hfrm.submit();
            }else{
                $(this).addClass('search');
                showSearch();
            }
        });        
    }    
    function ajax(url, tit, fun){
        // ET.event.stopPropagation();        
        ET.event.preventDefault();
        if(url.indexOf('file:///')==0){
            var style={'width': '100%','height': '100%','border': '0rem','background': 'transparent'}
            ,ifm=ET.ce('iframe',{'src':url});
            $(ifm).css( style);
            section.html(ifm).css({'overflow':'hidden'});
            var uconf ={'u':url,'t':window.document.title };
            ET.location.href.setArguments( uconf, tit );
            return ;
        }
        var val=ET.getFile(url);
        if( val ){
            var lh=location.origin+location.pathname;
            fun && (val=fun(val));
            section.html(val);
            ET( $('[et]') );
            var uconf ={'u':url,'t':tit };
            ET.location.href.setArguments( uconf, tit );
            
            if(document.title!==undefined){
                var doct=document.title
                ,m=/.*?(\s*Power\s*by.*)/gi.exec(doct);
                document.title=m?tit+m[1]:tit;
            }            
        }else{
            ET.messagebox.show('Sorry, the request resource does not exist!');
        }   
    }
    function addcsshead(h, css){
        var ncss='', restr="[\\t ]*(.*\\{[^\\}]*\\})"
        ,mc = css.match(new RegExp(restr, 'g'));
        if(!mc)return css;
        for(var i=0; i<mc.length; i++){
            var m = mc[i], p = (new RegExp(restr, 'g')).exec(m);
            // ncss+=h+p[1]+'\n';
            ncss+=ET.unit.pxorem(h+p[1])+'\n';
        }
        return ncss;
    }
    function ieSupperCss3(){
        if (!/*@cc_on!@*/0) return;
        var url='';
        $('link').each(function(){if (this.href.toLowerCase().indexOf('etsoftware.app.css')>-1){url=this.href; } });
        url=url?url: ET.cssPath+'Etsoftware.app.css' ;
        var css = ET.getFile(url);
        if(!css){return ; }
        css=ET.unit.pxorem(css);
        var restr="[\\t\\s]*\\@media[\\t\\s]*\\(([^\\)]+)\\)[\\t\\s]*\\{(([\\r\\n\\s\\t]*.*\\{.*\\})*)[\\r\\n\\t\\s]*\\}"
        ,mc = css.match(new RegExp(restr, 'gi'));
        if(!mc){return ; }
        var ncss={};
        for(var i=0, l=mc.length; i<l;i++){
            var m =mc[i] ,p=(new RegExp(restr, 'gi')).exec(m)
            ,mn=p[1].replace(/[^\w]+/gi, "");
            ncss[mn]=addcsshead('.'+mn+' ', p[2]);
        }
         css = css.replace(new RegExp(restr, 'gi'), '');
        var lnk=ET.css.write(css);
        var strcss='';
        for(var k in ncss){strcss +=ncss[k]; }
        lnk=ET.css.write(strcss);
        // console.log(lnk.innerHTML);
        // console.log(css);

        if(!ET.albumized) ET.loadLib('albumized');
        ET.albumized.sm(function(){
            $('body').removeClass('maxwidth990px').addClass('minwidth991px');
        },function(){
            $('body').removeClass('minwidth991px').addClass('maxwidth990px');
        });
        
    }
    var APP={
        init:function(){
            var _me=this;
            section =   $('body>section');
            header =   $('body>.header');
            logo =   header.find(".logo");
            hdivSearch =   header.find(".search");
            hfrm =   hdivSearch.find(">form");
            iptKeywords =   hfrm.find('input');
            haSearch =   hfrm.find("a");
            hspnmenu =   header.find(".menu");
            hnav =   header.find("nav");
            hdivMask =   header.find("div.mask");
            hnav.find('li').hover(
                function(){$(this).addClass('active'); }
                ,function(){$(this).removeClass('active'); }
            );
            var rt=hnav.attr('requesttype'),cb=hnav.attr('callback');
            if(rt && rt.toLowerCase()=='ajax'){
                var cbfun=cb?function(data){ return ET.exec(cb, data, hnav[0]); }:null;
                hnav.find('a').click(function(e){
                    ET.event.stopPropagation(e);
                    ET.event.preventDefault(e);
                    var url=$(this).attr('href')
                    ,tit=$(this).html();
                    tit=tit.replace(/(\<.*?\>)|[\s\r\n]+/gi, '');
                    if(/^(([\s\t]*#[\s\t]*)|[\s\t]*|(javascript:.*))$/gi.test(url))return ;
                    url=this.href;
                    ET.messagebox.mask(section[0], null, {
                        'onload':function(){
                            hideMenu();  
                            ajax(url, tit, cbfun); 
                        }
                    });
                });
                var uconf = ET.location.href.getArguments();
                if(uconf){
                    if(uconf.u){ajax(uconf.u, uconf.t, cbfun); }
                }
            }
            setTimeout(function(){section.css({'top':ET.unit.pxorem(header.outerHeight()+'px')}); }, 10);
            hspnmenu.click(function(){showMenu(); });
            hdivMask.click(function(){ hideMenu(); });        
            $(document).keyup(function(){
                var w = $(window).width();
                if(w<991){
                    if( event.keyCode==39 ){ // ->
                        showMenu();
                    }else if( event.keyCode==37 ){ // <-
                        hideMenu();
                    }
                }
            });
            PulldownToRefresh();
            iniForm();            
            ieSupperCss3();
            $(document).on("touchstart", function(e) {docTouchstart(e);})
            .on("touchmove", function(e) {docTouchmove(e);})
            .on("touchend", function(e) {docTouchend(e); });
            !ET.clientarea  && ET.loadLib('clientarea');
            ET.clientarea.initialize( section );
            if(window._et_ca_data){
                section[0]._et_ca_data = window._et_ca_data;
                section[0].resizeListen();
            }
        }
        ,show:function(e){$(section).empty().append(e).scrollTop(0).scrollLeft(0); }
        ,setSection:function(url, tit, fun){
            ET.event.stopPropagation();
            ET.event.preventDefault();
            ajax(url, tit, fun);
        }
    }
    window.etapp=window.etApp=window.EtApp=window.ETAPP=APP;
    $(function(){ APP.init(); });
});