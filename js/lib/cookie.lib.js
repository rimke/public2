/*
*
*	cookie Beta 1.0.0.1
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
ET.extend({cookie:{
	defTimespan:1000*60*60*24*365
	,initialize:function(){
		this.data={};
	}
	/**
	 * 保存cookie数据
	 * @param {[type]} name     字段名
	 * @param {[type]} value    值
	 * @param {[type]} timespan 存放日间以毫秒为单位，默认为365天
	 */
	,set:function(name,value,timespan){
			timespan=(timespan)?timespan:this.defTimespan;
			var edate = new Date();
			edate.setTime(edate.getTime() + timespan);
			var expires= (timespan)?";expires="+edate.toGMTString():'';
			var ckData = {expires:timespan, edate:edate.getTime(), dataType:typeof(value), data:value, dir:'cookie'}
			,val = ET.object.toString(ckData)
			ckVal =  name + "="+ escape( val )+expires;
			if(val.length < 2048 ){
				document.cookie = ckVal;
			}else{
				ckData.data=null;
				ckData.dir='localStorage';
				val = ET.object.toString(ckData);
				ckVal =  name + "="+ escape( val )+expires;
				document.cookie = ckVal;
				ET.loadLib('localstorage',function(e){e.set(name, value);});
			}			
		}
	,unset:function(name){
			var ckData = this.get(name);
			this.set(name,'', this.defTimespan*-1);
			if( ckData.dir == 'localStorage' ){
				ET.loadLib('localstorage',function(e){e.unset(name); });
			}
		}
	,get:function(name){
			var reVal={'name':name, dataType:null, data:null}
			,m = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"))
			,data = m?unescape(m[2]):null
			,now =new Date();
			if(data!==null){ data = ET.execJS(data); }
			if(data && data.edate && data.edate > now.getTime()){
				ET.extend(reVal, data);
				if( reVal.dir=='localStorage' ){
					localstorage = ET.loadLib('localstorage');
					reVal.data = localstorage.get(name);
					reVal.value = ET.object.toString(reVal.data);
				}
			}
			reVal.value = reVal.data;
			return reVal;
		}
}});