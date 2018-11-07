/*
*
*	input 扩展 1.0.0.1
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
ET.extend(ET.extension, {form:{
	initialize:function(){		
		if(!ET.messagebox) ET.loadLib('messagebox');

		!$(this).hasClass('ET_STYLE_FORM') && $(this).addClass('ET_STYLE_FORM');
		this.cid();
		this.fes = $(this).find('input, select, textarea, button');
		ET( this.fes );
		
		$(this).submit(function(e){
			var ret = this.verification();
			if(ret.errcode !=0 ){
				ET.messagebox.show('Err('+ ret.errcode +'):'+ ret.data, null, null, this);
				return false;
			}
			return true;
		});
	}
	/**
	 * 获取以get方式的url地址
	 * @return {[type]} [description]
	 */
	,getUrl:function(){
		var data= this.getData()
		,url = $(this).attr('action');
		url=url?url:'';
		url+= (url.indexOf('?')<0)?'?':'&';
		for(var k in data){
			url+= k+'='+data[k]+'&';
		}
		url = url.substr(0, url.length-1);
		return url;
	}
	/**
	 * 通过ajax 提交表单
	 * @param  {[type]} fun     可选，回调函数
	 * @param  {[type]} data 	可选，附加参数
	 * @return {[type]}         成功返回回应内容，失败返回null
	 */
	,post:function(fun, data){return this.ajax(fun, data, 'post'); }
	,get:function(fun, data){return this.ajax(fun, data, 'get'); }	
	,ajax:function(fun, data, type){
		var fdata = this.getData()
		,url = $(this).attr('action')
		,reVal = null;
		if(data) fdata = $.extend(fdata, data);
		type = type?type:$(this).attr('method');
 		$.ajax({
			type:type
			,url:url
			,data:fdata
			,async:fun?true:false
			,success:function(e){reVal = e; }
			,error:function(XMLHttpRequest, textStatus, errorThrown){					
				console.log('File failed to load '+url);					
				console.log(XMLHttpRequest);
				fun && fun(null);
			}
			,complete:function(){fun && fun(reVal); }
		});
		return reVal;
	}	
	//验证数据是否,符合rules属性指定的规则。供form提交时验证
	,verification:function(){
		var ret={errcode:0, data:'ok'};
		$(this).find('input, select, textarea').each(function(){			
			if( ret.errcode==0 &&  typeof this.verification =='function' ){
				try{
					ret = this.verification();
					if(ret.errcode!=0){ 
						// ret.data +=" for ["+(this.placeholder?this.placeholder:this.title?this.title:this.alt?this.alt:this.id)+']'; 
					}
				}catch(err){
					console.log([this,err]);
				}
			}
		});
		return ret;
	}
	/**
	 * 获取数据
	 * @return {[type]} [description]
	 */
	,getData:function(){
		var reVal = {};
		$(this).find('input, select, textarea, button').each(function(){
			if(this.name && /^[^\s\t]*$/gi.test(this.name)){
				var val = ''
				,keys = this.name.match(/\w+/gi)
				,type = $(this).attr('type')?$(this).attr('type'):'';
				type = type.toUpperCase();
				if( this.tagName == 'INPUT' && ( type=='CHECKBOX' || type=='RADIO') ){
					if( this.checked ) val = this.value;
				}else{
					val = this.value;
				}
				var tmp = reVal;
				for(var i=0; i<keys.length-1; i++){
					if( !tmp[keys[i]] ) tmp[keys[i]]={};
					tmp = tmp[keys[i]];
				}
				tmp[keys[keys.length-1]] = val;
			}
		});
		return reVal;
	}
	/**
	 * 向表单填充数据
	 * @param {[type]} data [description]
	 */
	,setData:function(data){
		var pre= (arguments.length>1)?arguments[1]:''		
		pre = pre?pre+"_":'';
		for(var key in data){
			var val = data[key];
			if(  typeof(val) =='object' ){
				this.setData(val, pre+key);
			}else{
				var eid= pre+key+',[id^='+pre+key+'_]';
				var obj = $(this).find('#'+eid);				
				if(obj.length){
					var tagName = obj[0].tagName.toLowerCase();
					if(tagName=='input'){
						ET.loadLib('date');
						var type = obj.attr('type')?obj.attr('type').toLowerCase():'text';
						if( type=='date' ){
							obj.val( ET.date.formate('yyyy-MM-dd', ET.date.fromString(val)) );
						}else if( type=='time' ){
							obj.val( ET.date.formate('hh:ii', ET.date.fromString(val)) );
						}else if( type=='week' ){
							obj.val( ET.date.formate('yyyy-Ww', ET.date.fromString(val)) );
						}else if( type=='month' ){
							obj.val( ET.date.formate('yyyy-MM', ET.date.fromString(val)) );
						}else if( type=='datetime-local' ){
							obj.val( ET.date.formate('yyyy-MM-ddThh:ii:ss', ET.date.fromString(val)) );
						}else if( type=='radio' || type=='checkbox' ){
							obj.each(function(){ if(this.value==val){ this.checked=true; } });
						}else{
							obj.val( val );
						}
					}else if( tagName=='textarea' ){
							obj.val( val );
					}else if( tagName=='img' ){ obj.attr("src", val);
					}else if( tagName=='select' ){
						if( ET.object.getType(val)=="array" && obj.attr('multiple')!=undefined ){
							obj.find('option').each(function(){
								for(var i=0;i<val.length;i++){
									var ival = val[i];
									if(this.value==ival){
										this.selected=true ;
										break;
									}
								}
							});
						}else{
							obj.val( val );
						}						
						obj.change();
					}else{
						obj.html( val );
					}
					obj.change();
				}
			}
		}
	}
}});