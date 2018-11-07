/*
*
*	crontab 1.0.0.1  扩展
*	Release date: 
*	Author		: 半条虫(466814195)
*	Keywords	: Etsoftware 半条虫(466814195) rimke 39doo 39度
*	Description	: 本脚本功能由EtSoftWare团队研发，仅供学习不得用于商业用途。
*	Blog		: http://rimke.blog.163.com/		
*	Website		: http://www.39doo.com/
*	Mail		: rimke@163.com
*	Copyright	: Power By Etsoftware
*
*   扩展属性type
*   	crontab: crontab命令控件
*/
ET.extend(ET.extension, {crontab:{
	initialize:function(){				
		if(!ET.crontab) ET.loadLib('crontab');
		if(!ET.unit) ET.loadLib('unit');
		if(!this.cbv) {
			this.cbv=this.createCrontabView();
			$(this).hide().after( this.cbv );
			$(this).attr('rules', "^([^\\s\\t]+[\\s\\t]*){6}$");
		}
		this.setValue(this.value);
	}
	/**
	 * 创建 crontab 视图
	 * @return {[type]} [description]
	 */
	,createCrontabView:function(){
		var preID = this.id;
		var _me=this, div = ET.ce('div', {'class':'ET_CRONTAB', 'et':'', 'style':'width:'+ ET.unit.pxorem($(this).width() +'px')})
		,minute = ET.ce('input', {'class':'minute', 'name':preID+'[minute]', 'placeholder':'Minutes'})
		,hour = ET.ce('input', {'class':'hour', 'name':preID+'[hour]', 'placeholder':'Hour'})
		,date = ET.ce('input', {'class':'date', 'name':preID+'[date]', 'placeholder':'Date'})
		,month = ET.ce('input', {'class':'month' , 'name':preID+'[month]', 'placeholder':'Month'})
		,day = ET.ce('input', {'class':'day', 'name':preID+'[day]', 'placeholder':'day'})
		,cmd = ET.ce('input', {'class':'cmd', 'name':preID+'[cmd]', 'placeholder':'Command'});

		$(div).append([minute, hour, date, month, day, cmd]);
		var ipt = $(div).find('input');
		// $(reVal).addClass('class_name');
		if(preID){
			$(ipt).attr('for', preID); 
			$(div).attr('for', preID); 
		}
		ipt.blur(function(){
			var idx=$(this).index();
			if(idx <5){
				var ret = ET.crontab.verificationValue(this.value, $(this).index());
				if(ret.errcode > 0){
					alert('Error('+ret.errcode+'):'+ret.data);
					this.value='';
					$(this).focus();
					return ;
				}	
			}
			_me.value = _me.getValue();
		});
		return div;		
	}	
	/**
	 * 设备值
	 * @param {[type]} val [description]
	 */
	,setValue:function(val){
		this.value=val?val:this.value;
		var ret = ET.crontab.decode(this.value);
		if(!ret){ return ;}
		$(this.cbv).find('.minute').val(ret.minute);
		$(this.cbv).find('.hour').val(ret.hour);
		$(this.cbv).find('.date').val(ret.date);
		$(this.cbv).find('.month').val(ret.month);
		$(this.cbv).find('.day').val(ret.day);
		$(this.cbv).find('.cmd').val(ret.cmd);		
	}
	/**
	 * 获取值
	 * @return {[type]} [description]
	 */
	,getValue:function(){
		var minute = $(this.cbv).find('.minute').val()
		,hour = $(this.cbv).find('.hour').val()
		,date = $(this.cbv).find('.date').val()
		,month = $(this.cbv).find('.month').val()
		,day = $(this.cbv).find('.day').val()
		,cmd = $(this.cbv).find('.cmd').val()
		,ret = ET.crontab.encode(minute?minute:'*', hour?hour:'*', date?date:'*', month?month:'*', day?day:'*', cmd);
		return ret; 
	}
}});