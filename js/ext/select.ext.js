/*
*
*	select 扩展 1.0.0.1
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
ET.extend(ET.extension, {select:{
	initialize:function(){
		if(!ET.unit) ET.loadLib('unit');
		if(!ET.event) ET.loadLib('event');
		var _me = this
		,multiple=$(this).attr('multiple');
		multiple=multiple?true:false;
		this.cid();
		if(!this.CVV && !multiple){
			this.CVV = this.createVirtualView();
			$(this).before(this.CVV).hide();
		}
		// 处理原select控件事件
		$(this).change(function(event) {
			var opt=this.options[this.selectedIndex];
			$(_me.CVV).find('>input').val( $(opt).html() );
		});
	}
	/**
	 * 创建虚拟控件
	 */
	,createVirtualView:function(){
		var _me=this, div = ET.ce('div', {'for':this.id, 'class':'ET_STYLE_SELECT_VV'})
		,w=$(this).width() ,h=$(this).height()
		,ipt=ET.ce('input', {'style':'width:'+ ET.unit.pxorem((w&&w>50?w:50)+'px')
			+';height:'+ ET.unit.pxorem((h&&h>22?h:22)+'px')
			,'value': $(this.options[this.selectedIndex]).html()})
		,hdivlst = ET.ce('div', {'class':'list', 'style':'z-index:'+document.all.length});
		$(div).append([ipt, hdivlst]);
		$(ipt).click(function(e){
			ET.event.preventDefault(e);
			_me.iniVVOption(null);
			$(hdivlst).show();
		})
		.keyup(function(e) {_me.iniVVOption(this.value); })
		.blur(function(e) { setTimeout(function(){autohide();}, 300) });

		function autohide(){
			if( $(hdivlst).is(':visible')){$(hdivlst).hide();}
		}
		return div;
	}
	/**
	 * 初始化虚拟控件下拉列表
	 * @param  {[type]} keyword 关键词筛选
	 * @return {[type]}          [description]
	 */
	,iniVVOption:function(keyword){
		var _me=this, opts=$(this).find('option')
		,ipt=$(this.CVV).find('>input')
		,lst=$(this.CVV).find('>div')
		,ul=ET.ce('ul');
		lst.empty();		
		opts.each(function(){
			var html=$(this).html();
			if(keyword && html.indexOf(keyword)<0){return ; }			
			var li = ET.ce('li', {'innerHTML':html , 'value':this.value });
			$(ul).append(li);
		});
		$(ul).find('>li').click(function(){			
			ipt.val( $(this).html() );
			$(_me).val($(this).attr('value')).change();
			$(lst).hide();
		});
		lst.append(ul);
		if(keyword===null) ipt.val( $(this.options[this.selectedIndex]).html() );
		return lst;
	}
}});