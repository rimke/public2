/*
*
*	Custom controls Beta 1.0.0.1
*	根据参数自动生成控件。
*	Release date: 2018-06-07
*	Author		: 半条虫(466814195)
*	Keywords	: Etsoftware 半条虫(466814195) rimke 39doo 39度
*	Description	: 本脚本功能由EtSoftWare团队研发，仅供学习不得用于商业用途。
*	Blog		: http://rimke.blog.163.com/		
*	Website		: http://www.39doo.com/
*	Mail		: rimke@163.com
*	Copyright	: Power By Etsoftware
*
*/
ET.extend({customControls:{
	initialize:function(){
		if(!ET.object) ET.loadLib('object');
	}
	/**
	 * 创建控件
	 * 根据参数生成特定控件
	 * @param  {[type]} data 控件参数
	 * {
	 * 	type:'date|datetime|image|number|radio|checkbox|editor|textarea' //控件类型
	 * 	,name:'' //控件name
	 * 	,minlength:0 //控件内容最小长度
	 * 	,maxlength:99 //控件内容最大长度
	 * 	,placeholder:'' //控件提示内容
	 * 	,value:'' //控件默认内容
	 * 	,options:'' //选项（可供选择） [{value:0, text:''},.....] 
	 * }
	 * @return {[type]}      返回为一个HTML控件
	 */
	,create:function(data){
		if( data==null || data==undefined ){return null;
		}else if( ET.object.getType(data)=='array' ){
			var aryEle=[];
			for(var i=0; i<data.length; i++){
				var ele = this.create(data[i]);
				if(!ele){continue;}
				aryEle.push( ele );
			}
			return aryEle;
		}
		var t = data.type?data.type:'text'
		,ele=null;
		t=t.toLowerCase();
		if(t=='date'){
			// ele = this.createDateElement(data);
		}else if(t=='datetime'){
			// ele = this.createDatetimeElement(data);
		}else if(t=='image'){
			// ele = this.createImageElement(data);
		}else if(t=='number'){
			ele = this.createNumberElement(data);
		}else if(t=='radio'){
			ele = this.createRadioElement(data);
		}else if(t=='checkbox'){
			ele = this.createCheckboxElement(data);
		}else if(t=='editor'){
			ele = this.createEditorElement(data);
		}else if(t=='textarea'){
			ele = this.createTextareaElement(data);
		}else{
			ele = this.createTextElement(data);
		}
		return ele;
	}
	,createElement:function(tagName, data){
		var ele = ET.ce(tagName?tagName:'input', {
			'et':''
			,'name':data.name
			,'minlength':data.minlength?data.minlength:0
			,'placeholder':data.placeholder?data.placeholder:''
		});
		if(data.maxlength){$(ele).attr('maxlength', data.maxlength); }
		return ele;
	}
	,createTextElement:function(data){
		var ele = this.createElement('input', data);
		$(ele).attr({'type':data.type });		
		ele.value=data.value?ET.object.toString(data.value):'';
		return ele;
	}
	,createEditorElement:function(data){
		var ele = this.createElement('textarea', data);
		$(ele).attr({'advanced':'advanced'});
		ele.value=data.value?ET.object.toString(data.value):'';
		return ele;
	}
	,createTextareaElement:function(data){
		var ele = this.createElement('textarea', data);
		ele.value=data.value?ET.object.toString(data.value):'';
		return ele;
	}
	,createRadioElement:function(data){
		if( ET.object.getType(data.options) == "string" ){
			var options = data.options.split(';');
			return this.createCheckboxElement(options);
		}
		var eles=[];
		for(var i=0; i<data.options.length; i++){
			var opt = data.options[i]
			if( ET.object.getType(opt) == "string" ){
				var d = opt.split('|'); 
				if(d.length>1){ opt={'value':d[0], 'text':d[1]}; }
			}
			if(opt.value==undefined || opt.text==undefined){ continue ;}
			var lbl = ET.ce('label')
			,ele = this.createElement('input', data);
			$(ele).attr({'type':data.type, 'value':opt.value});
			if(data.value == opt.value){$(ele).attr({'checked':'checked'}); }
			ET(ele);			
			ele.id=ele.id+(i?'_'+(i-1):'');
			$(lbl).append([ele, opt.text]);
			eles.push(lbl);
		}
		return eles;
	}

}});