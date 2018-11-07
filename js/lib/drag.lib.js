/*
*
*	drag Beta 1.0.0.1
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
ET.extend({drag:{
	initialize:function(){
		if(!ET.object) ET.loadLib('object');
		if(!ET.event) ET.loadLib('event');
		if(!ET.unit) ET.loadLib('unit');
		if( ET.object.isElement(this) ){
			this.element(this);
		}
	}
	/**
	 * 拖动目元素
	 * @param  {[type]} ele    响应元素，即用于控制动作的目标元素
	 * @param  {[type]} target 被控制元素，可以ele同一个
	 * @param  {[type]} direction 方向限制，默认为0不限制， 1只限向上拖动，2只限向右拖动，4只限向下拖动，8只限向下拖动
	 * @return {[type]}        [description]
	 */
	,element:function(ele, target, direction){
		if(!ele)return null;
		var doc = window.document;
		ele.target=target?target:ele;
		ele.direction=direction?direction:0;			
		function mousedown(e){
			ET.event.preventDefault(e);
			if(e.button>1)return ;
			this.position = $(this).css('position').toLowerCase();
			var ele=this, touch=false, target=$(ele.target), mxy=getMousePos(e.touches?e.touches[0]:e);	
			if(e.touches){e=e.touches[0];touch=true;}			
			ele.by={x:mxy.x-(target.offset().left),y:mxy.y-(target.offset().top)};			
			$(ele).css('cursor','move');			
			var tpos = {
				top:(target.css('top').replace('px',''))*1+(target.css('margin-top').replace('px',''))*1,
				left:(target.css('left').replace('px',''))*1+(target.css('margin-left').replace('px',''))*1
					};		
			target.css({
				'top':ET.unit.pxorem(tpos.top+'px')
				,'left':ET.unit.pxorem(tpos.left+'px')
				,'margin':ET.unit.pxorem('0px')
			});
			if(touch){				
				doc.addEventListener('touchmove',function(e){wd_mousemove(e, ele);}, false);
				doc.addEventListener('touchend',function(e){wd_mouseup(e, ele);}, false);
				// $(doc).bind('touchmove',function(e){wd_mousemove(e, ele);});
				// $(doc).bind('touchend',function(e){wd_mouseup(e, ele);});
			}else{
				$(doc).bind('mousemove',function(e){wd_mousemove(e, ele);});
				$(doc).bind('mouseup',function(e){wd_mouseup(e, ele);});
			}
			doc.onselectstart=new Function("event.returnValue=false"); 
		}
		function wd_mousemove(e, ele){
			if(ele.by==undefined) return ;
			ET.event.preventDefault(e);
			var mxy=getMousePos( e.touches?e.touches[0]:e )
			, left = mxy.x-ele.by.x
			, top = mxy.y-ele.by.y
			, tgt = ele.target
			, position = $(ele.target).css('position');			
			if( position=='fixed' ){
				left-= $(document).scrollLeft();
				top-= $(document).scrollTop();
			}else if( position=='absolute' ){
			}else{
				if(!ele.vTarget){
					ele.vTarget = ET.ce('div', {'style':'position:absolute;border: '+ET.unit.pxorem('1px')+' dashed yellow;'});
					$(ele.vTarget).css({
						'width': ET.unit.pxorem($(ele.target).width()+'px')
						,'height': ET.unit.pxorem($(ele.target).height()+'px')
					});
					$(ele.target).after(ele.vTarget);
				}
				tgt=ele.vTarget;
			}
			if(ele.direction==0 || ele.direction&1 && top<ele.by.y || ele.direction&4 && top>ele.by.y ){
				$(tgt).css('top', ET.unit.pxorem(top+"px"));
			}
			if(ele.direction==0 || ele.direction&2 && left<ele.by.x || ele.direction&8 && left>ele.by.x ){
				$(tgt).css('left', ET.unit.pxorem(left+"px"));
			}	
		}
		function wd_mouseup(e, ele){
			e=e?e:event;
			if(e.touches){
				if(doc.removeEventListener )
					doc.removeEventListener('touchmove',wd_mousemove,false);
				else
					doc.detachEvent("touchmove", wd_mouseup);
			}else
				$(doc).unbind('mousemove');
			$(ele).css('cursor','');	
			if(ele.vTarget){$(ele.vTarget).remove(); ele.vTarget=undefined; }
			ele.by=undefined;
			doc.onselectstart='';
		}
		function getMousePos(e){			
			e = e || window.event; 
			var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft; 
			var scrollY = document.documentElement.scrollTop || document.body.scrollTop; 
			var x = e.pageX || e.clientX + scrollX; 
			var y = e.pageY || e.clientY + scrollY; 
			return { 'x': x, 'y': y }; 

		}
		ele.onmousedown=ele.ontouchstart=mousedown;		
	}

}});