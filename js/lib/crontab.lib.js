/*
*
*	crontab 1.0.0.1  数据验证
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
ET.extend({crontab:{
	initialize:function(){}
	/**
	 * 将数据转换成为标准的crontab格式
	 * 成功返回为字符串，失败返回为null
	 * @param  {[type]} minute [description]
	 * @param  {[type]} hour   [description]
	 * @param  {[type]} date   [description]
	 * @param  {[type]} month  [description]
	 * @param  {[type]} day    [description]
	 * @param  {[type]} cmd    [description]
	 * @return {[type]}        [description]
	 */
	,encode:function(minute, hour, date, month, day, cmd){
		var ret = this.verificationValue(minute, 0);
		if( ret.errcode!=0  ){ return null; }
		ret = this.verificationValue(hour, 1);
		if( ret.errcode!=0  ){ return null; }
		ret = this.verificationValue(date, 2);
		if( ret.errcode!=0  ){ return null; }
		ret = this.verificationValue(month, 3);
		if( ret.errcode!=0  ){ return null; }
		ret = this.verificationValue(day, 4);
		if( ret.errcode!=0  ){ return null; }
		if( !cmd  ){ return null; }
		return minute +'\t'+ hour +'\t'+ date +'\t'+ month +'\t'+ day +'\t'+ cmd;
	}
	/**
	 * 将数据转换成为标准的crontab对象
	 * 成功返回为json, 失败返回为null
	 * @param  {[type]} crontab [description]
	 * @return {[type]}         [description]
	 */
	,decode:function(crontab){
		var m = crontab.split(/[\s\t]+/gi);
		if(m.length !=6){return null; }
		return {minute:m[0], hour:m[1], date:m[2], month:m[3], day:m[4], cmd:m[5]};
	}
	/**
	 * 验证数据是否正确
	 * @param  {[type]} val [description]
	 * @param  {[type]} idx [description]
	 * @return {[type]}     成功返回为true, 失败返回为false
	 */
	,verificationValue:function(val, idx){
		var re = new RegExp('[^\\d\\*\\-\\,\\/]', 'gi');
		if( re.test( val ) ){
			return {errcode:10001, data:'存在非法字符！'};
		}
		var ret = val.indexOf('-');
		if( ret >-1 ){
			if(ret==0){return {errcode:10002, data:'不能以‘-’开头！'}; }
			if( /\d+\-[^\d]+/gi.test(val) ){return {errcode:10003, data:'‘-’右边必需为数字！'}; }
			if( /[^\d]+\-\d+/gi.test(val) ){return {errcode:10004, data:'‘-’左边必需为数字！'}; }
		}
		ret = val.indexOf('/');
		if( ret >-1 ){
			if(ret==0){return {errcode:10005, data:'不能以‘/’开头！'}; }
			if( /(^.*\/$)|(^\/.*$)/gi.test(val) ){return {errcode:10006, data:'‘/’左右两边必填'}; }
		}
		return {errcode:0, data:'成功'};
	}
}});