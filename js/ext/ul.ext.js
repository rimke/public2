/*
*
*	a 扩展 1.0.0.1 
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
ET.extend(ET.extension, {ul:{
	initialize:function(){
		if(!ET.object) ET.loadLib('object');
		if(!ET.string) ET.loadLib('string');

		this.cid();
		this.data = $(this).attr('data');
		this.data = this.data?[this.data]:[];
		this.advanced = $(this).attr('advanced')?true:false;
		this.setData( this.data );
	}
	/**
	 * 获取数据
	 */
	,getData:function(){
		var _me = this;
		this.data=[];
		$(this).find('>li').each(function(){
			if( $(this).hasClass('advanced') ){ return; }
			_me.data.push($(this).text());
		});
		return this.data;
	}
	/**
	 * 初始化数据
	 * @param {[type]} data [description]
	 */
	,setData:function(data){
		if(ET.object.getType(data)!="array"){
			return this.setData([data]);
		}
		this.data=data;
		this.iniLI( this.data );

		
	}
	,iniLI:function(data, forobj){
		var _me=this;
		forobj=forobj?forobj:this;
		$(forobj).empty();
		for(var k in data){
			var li = this.fn.cli( data[k] );
			if(li==null){continue;}
			$(forobj).append(li);
		}
		if(this.advanced){
			var li = this.fn.cli('+');
			$(li).addClass('advanced add').click(function(){
				var li = _me.fn.cli('');
				$(li).attr({'contenteditable':'true'});
				$(this).before(li);
				$(li).focus();

			});
			$(forobj).append(li);
		}
	}
	,fn:{
		/**
		 * 创建li
		 * @return {[type]} [description]
		 */
		cli:function(html, data){
			var li=ET.ce('li', {'innerHTML':html});
			data && (li.data=data);
			$(li).dblclick(function(event) {
				$(this).attr({'contenteditable':'true'}).focus();;
			}).blur(function(){
				$(this).removeAttr('contenteditable');
			});
			return li;
		}
	}
	
}});