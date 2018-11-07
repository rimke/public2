/*
*
*	Geolocation Beta 1.0.0.1 地理位置
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
ET.extend({geolocation:{
	initialize:function(){
		if(!ET.console) ET.loadLib('console');
	}
	/**
	 * 在请求出错时调用。描述错误类型的字符串以及一个异常对象（如果有的话）
	 * @param  {[type]} e [description]
	 * @return {[type]}   [description]
	 */
	,error:function(e){ console.log('%c Err('+e.code+'):'+e.message, 'background:red; color: white'); }
	/**
	 * 获取当前位置
	 * @param  {[type]} onSuccess 成功得到位置信息时的回调函数，使用Position 对象作为唯一的参数。 
	 * @param  {[type]} onError   获取位置信息失败时的回调函数，使用 PositionError 对象作为唯一的参数，这是一个可选项。
	 * @param  {[type]} options   一个可选的 PositionOptions 对象。
	 */
	,getCurrentPosition:function(onSuccess, onError, options){
		var _me=this;
		onError=onError?onError:this.error;
		options =options?options:{enableHighAccuracy: true, timeout: 5000, maximumAge: 0 };
		if( window.navigator && navigator.geolocation ){
			navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
		}else if( typeof(onError)=='function' ){
			onError({'code':10001, 'message':'Current environment does not support!'});
		}
	}
	/**
	 * 用于注册监听器，在设备的地理位置发生改变的时候自动被调用。也可以选择特定的错误处理函数。
	 * @param  {[type]} onSuccess 成功时候的回调函数， 同时传入一个 Position 对象当作参数
	 * @param  {[type]} onError   失败时候的回调函数，可选， 会传入一个 PositionError 对象当作参数。
	 * @param  {[type]} options   一个可选的 PositionOptions 对象。
	 * @return {[type]}           该方法会返回一个 ID，如要取消监听可以通过  Geolocation.clearWatch() 传入该 ID 实现取消的目的。
	 */
	,watchPosition:function(onSuccess, onError, options){		
		onError=onError?onError:this.error;
		options =options?options:{enableHighAccuracy: true, timeout: 5000, maximumAge: 0 };
		if( window.navigator && navigator.geolocation ){
			return navigator.geolocation.watchPosition(onSuccess, onError, options);
		}else if( typeof(onError)=='function' ){
			onError({'code':10001, 'message':'Current environment does not support!'});
		}
		return 0;
	}
	/**
	 * 注册的 位置/错误 监听器。
	 * @param  {[type]} id 希望移除的监听器所对应的 Geolocation.watchPosition() 返回的 ID 数字。
	 * @return {[type]}    [description]
	 */
	,clearWatch:function(id){
		if(id<1){return false}
		if( window.navigator && navigator.geolocation ){
			navigator.geolocation.clearWatch(id);			
		}else{
			// onError({'code':10001, 'message':'Current environment does not support!'});
			// return 0;
		}
	}

}});