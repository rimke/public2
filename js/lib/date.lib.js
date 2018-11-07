/*
*
*	date 1.0.0.1  日期组件
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
ET.extend({date:{
	initialize:function(){
		if(!ET.string) ET.loadLib('string'); 
		if(!ET.data) ET.loadLib('data'); 
	}
	/**
	 * 根据字符串转化为日期对象
	 * @return {[type]} 成功返回为Date对象，失败返回为null
	 */
	,fromString:function(fmt){
		fmt=/[\s\t]+/gi.test(fmt)?fmt:fmt+' 00:00:00';
		var m=/^[\s\t]*(\d{4}[\\\/\-年]\d{1,2}[\\\/\-月]\d{1,2})日?[\s\t]+(\d{1,2}[:时]\d{1,2}([:分]\d{1,2}秒?)?)[\s\t]*$/gi.exec(fmt);
		if( !m ){return null;}
		var date = m[1], time=m[2];
		date=date.replace(/[^\d]+/gi,'/');
		if(!ET.data.isDate(date)){return null; }
		if(!ET.data.isTime(time)){return null; }
		var dfmt = date.replace(/[^\d]+/gi, '/')+' '+ time;
		return new Date( dfmt );
	}
	/**
	 * 获取日期是当年的第几周
	 * @return {[type]} [description]
	 */
	,whichWeek:function(date){
		var d=new Date(date.getFullYear()+'/1/1')
		, day1=1000*60*60*24 , week1=day1*7
		, time = d.getTime()-d.getDay()*day1
		, ctime = date.getTime() ,ret=1;
		while( time<ctime && ret<100){time+=week1;ret++; }
		return ret-1;
		
	}
	/**
	 * 格式化日期
	 * @param  {[type]} tpl  [description]
	 * @param  {[type]} date [description]
	 * @return {[type]}      [description]
	 */
	,formate:function(tpl, date){
		date=date?date:this;
		if( !(date instanceof Date) ){return ;}
		if(!tpl)return null;
		var o = {   
		"M+" : date.getMonth()+1,                 //月份   
		"d+" : date.getDate(),                    //日   
		"h+" : date.getHours(),                   //小时   
		"m+|i+" : date.getMinutes(),                 //分   
		"s+" : date.getSeconds(),                 //秒   
		"q+" : Math.floor((date.getMonth()+3)/3), //季度   
		"S"  : date.getMilliseconds(),             //毫秒   
		"w+"  : this.whichWeek(date)             //周  
		};   
		if(/(y+)/.test(tpl))   
		tpl=tpl.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));   
		for(var k in o)   
		if( new RegExp("("+ k +")").test(tpl) )
		tpl = tpl.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
		return tpl;				
	}
}});