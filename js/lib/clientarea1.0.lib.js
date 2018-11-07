/*
*
*	clientarea Beta 1.0.0.1 可视窗口
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

({
	initialize:function(ele){
		// if(!ET.clientarea) ET.loadLib('clientarea');		
		var _me=this; this.data=this.data?this.data:[];
		this.srcEle =ele?ele:window;
		$(this.srcEle).scroll(function(){ _me.scroll(); });

	}
	,scroll:function(){
		var cpa = this.getArea();
		if(cpa==null){return ;}
		for(var i=0; i<this.data.length; i++){
			var o = this.data[i];
			if(!(o.rect) || (o.t && (new Date()).getTime()- o.t.getTime() > 100) ){
				o.rect ={top:$(o.ele).offset().top ,left:$(o.ele).offset().left
					,width:$(o.ele).width() ,height: $(o.ele).height()
				}
				var pe=(this.srcEle==window)?document.documentElement:this.srcEle;
				if( $(pe).find( o.ele ) ){
					o.rect.top-=$(pe).offset().top;
					o.rect.left-=$(pe).offset().left;
				}
			}
			if(o.ele.id=='hdivMap' ){
				console.log("o.rect.top >= cpa.scrollTop="+o.rect.top +'>='+ cpa.scrollTop +'='+(o.rect.top - cpa.scrollTop));
			}
			if( 
				(
					( o.rect.top >= cpa.scrollTop && o.rect.top < cpa.top + cpa.scrollTop + cpa.clientHeight )
					&&
					( o.rect.left >= cpa.scrollLeft && o.rect.left < cpa.left + cpa.scrollLeft + cpa.clientWidth )
				)||(
					o.rect.top <= cpa.scrollTop && o.rect.top+o.rect.height >= cpa.scrollTop 
					&& 
					(
						( o.rect.left >= cpa.scrollLeft && o.rect.left < cpa.scrollLeft + cpa.clientWidth )
						|| o.rect.left <= cpa.scrollLeft && o.rect.left+o.rect.width >= cpa.scrollLeft 
					)
				)
			){
				ET.exec(o.inf, {'Ele':o, 'Area':cpa}, o.ele);
				// o.inf && o.inf({'Ele':o, 'Area':cpa});
			}else{
				ET.exec(o.outf, {'Ele':o, 'Area':cpa}, o.ele);
				// o.outf && o.outf({'Ele':o, 'Area':cpa});
			}
		}
	}

	,call:function(ele, inf, outf){
		if(!inf && !outf)return ele; 
		if(!ET.object.isElement(ele)){ return ele;}
		this.data.push({ele:ele, inf:inf, outf:outf});		
		this.scroll();
	}
	,inside:function(ele, fun){return this.call(ele, fun, null); }
	,outside:function(ele, fun){return this.call(ele, null, fun); }
	
	/**
	 * 当前页面显示区域
	 * @return json {top:0,left:0}
	 */
	,getArea:function(ele){
		ele=$(ele?$(ele):this.srcEle);
		if(ele.length<1){ return null; }
		ele=ele[0];
		var iele = (ele==window)?document.documentElement:ele;		
		// if(ET.cache.get('currentPageArea')){return ET.cache.get('currentPageArea'); }
		var bdclient={
			height:(ele.innerHeight)?ele.innerHeight:iele.clientHeight
			,width:(ele.innerWidth)?ele.innerWidth:iele.clientWidth
		};
		var bdscroll ={
			top:(ele.scrollTop)?ele.scrollTop: iele.scrollTop
			,left:(ele.scrollLeft)?ele.scrollLeft: iele.scrollLeft
		}
		, ret={
			top: $(iele).offset().top
			,left: $(iele).offset().left
			,scrollTop: bdscroll.top
			,scrollLeft: bdscroll.left
			,clientHeight: bdclient.height
			,clientWidth: bdclient.width
		}, _me = this;

		ET.cache.set('currentPageArea', ret);
		// $(ele).scroll(function(){ ET.cache.set('currentPageArea', null); });			
		return ret;
	}	
	

})