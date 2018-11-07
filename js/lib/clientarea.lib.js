/*
*
*	clientarea Beta 2.0.0.1 可视窗口
*	Release date: 
*	Author		: 半条虫(466814195)
*	Keywords	: Etsoftware 半条虫(466814195) rimke 39doo 39度
*	Description	: 本脚本功能由EtSoftWare团队研发，仅供学习不得用于商业用途。
*	Blog		: http://rimke.blog.163.com/		
*	Website		: http://www.39doo.com/
*	Mail		: rimke@163.com
*	Copyright	: Power By Etsoftware
*
*/

ET.extend({clientarea:{
	initialize:function(ele){
		ET.loadLib('cache');
		ele =ele?ele:window;
		ele=(ele.length)?ele[0]:ele;
		$.extend(ele, this.fn, {getRect:this.getRect});
		$(ele).scroll(function(){ this.scrollListen && this.scrollListen(); })
		.resize(function(){ this.resizeListen && this.resizeListen(); });


		this.inside=function(ele, fun){this._recursiveAdd(ele, 'inside', fun); }
		this.outside=function(ele, fun){this._recursiveAdd(ele, 'outside', fun); }
		this.getCurrentRect=function(){return window.getCurrentRect?window.getCurrentRect():null; }
	}
	/**
	 * 递归添加事件
	 * @param {[type]} ele    [description]
	 * @param {[type]} funkey [description]
	 * @param {[type]} fun    [description]
	 */
	,_recursiveAdd:function(ele, funkey, fun){
		var p = $(ele).parent();
		while( p.length ){
			p=p[0];
			if(p[funkey]){ p[funkey](ele, fun); }
			p = $(p).parent();
		}
		window[funkey] && window[funkey](ele, fun); 
	}
	/**
	 * 获取Element元素尺寸
	 * @param  {[type]} element Html Element对象
	 * @return {[type]}         如果成功返回为{}, 失败返回为null
	 */
	,getRect:function(element){
		if(!element)return null;
		if(!ET.object.isElement(element) ){ return null;}
		var $element = $(element);
		var bdclient={
			height:($element.innerHeight)?$element.innerHeight():element.clientHeight
			,width:($element.innerWidth)?$element.innerWidth():element.clientWidth
		};
		var bdscroll ={
			top:($element.scrollTop)?$element.scrollTop(): element.scrollTop
			,left:($element.scrollLeft)?$element.scrollLeft(): element.scrollLeft
		}
		, ret={
			top: $element.offset().top
			,left: $element.offset().left
			,scrollTop: bdscroll.top
			,scrollLeft: bdscroll.left
			,clientHeight: bdclient.height
			,clientWidth: bdclient.width
		};
		return ret;
	}
	,fn:{
		// 定位回调函数
		sideCall:function(ele, inf, outf){
			if(!inf && !outf)return ele; 
			if(!ET.object.isElement(ele)){ return ele;}
			this._et_ca_data=this._et_ca_data?this._et_ca_data:[];
			this._et_ca_data.push({ele:ele, inf:inf, outf:outf});		
			// this.data.push({ele:ele, inf:inf, outf:outf});		
			this.scrollListen();
		}
		// 在当前显示控件内/显示时调用
		,inside:function(ele, fun){return this.sideCall(ele, fun, null); }
		// 在当前显示控件外/隐藏时调用
		,outside:function(ele, fun){return this.sideCall(ele, null, fun); }
		// 监听窗口尺寸发生改变
		,resizeListen:function(){
			if(!this._et_ca_data){return ;}
			var data = this._et_ca_data;
			for(var i=0; i<data.length; i++){
				var o = data[i];
				o.rect=null;
			}
		}
		//滚动监听
		,scrollListen:function(){
			if(!this._et_ca_data){return ;}
			var cpa = this.getCurrentRect(), data = this._et_ca_data;
			if(cpa==null || data==undefined){return ;}
			for(var i=0; i<data.length; i++){
				var o = data[i], inside=false;
				if(!(o.rect) || (o.t && (new Date()).getTime()- o.t.getTime() > 100) ){
					o.rect ={top:$(o.ele).offset().top ,left:$(o.ele).offset().left
						,width:$(o.ele).width() ,height: $(o.ele).height()
					}
				}
				var y = o.rect.top-cpa.scrollTop-cpa.top
				,x = o.rect.left-cpa.scrollLeft-cpa.left;
				if( 
					y<=cpa.clientHeight
					&& y+o.rect.height>0
					&& x<=cpa.clientWidth
					&& x+o.rect.width>0
					){
						inside=true;
				}
				if( inside ){
					ET.exec(o.inf, {'Ele':o, 'Area':cpa}, o.ele);
					// o.inf && o.inf({'Ele':o, 'Area':cpa});
				}else{
					ET.exec(o.outf, {'Ele':o, 'Area':cpa}, o.ele);
					// o.outf && o.outf({'Ele':o, 'Area':cpa});
				}
			}
					
		}
		/**
		 * 当前页面显示区域
		 * @return json {top:0,left:0}
		 */
		,getCurrentRect:function(){
			if(!ET.object.isElement(this) 
				&& !this.window 
				&& this !== window.window 
				&& this!==document){ return null;}
			var ele= this;
			return this.getRect( (ele==window || ele.window==window.window)?document.documentElement:ele );
		}
	}

}});