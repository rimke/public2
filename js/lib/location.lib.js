/*
*
*	location Beta 1.0.0.1
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
ET.extend({location:{
	initialize:function(){		
		// if(!ET.object) ET.loadLib('object');
		// this.href=function(){ return location.href;}
	}
	,href:{
		/**
		 * 获取地址栏参数
		 * @return {[type]} [description]
		 */
		getArguments:function(){
			var regstr ="(\\w+)=([^&]+)"
			,mc = location.href.match(new RegExp(regstr, 'gi'))
			,ret={};
			if(!mc)return ret;
			for(var i=0; i<mc.length; i++){
				var m = (new RegExp(regstr, 'gi')).exec(mc[i]);
				ret[m[1]]=decodeURIComponent(m[2]);
			}
			return ret;			
		}
		/**
		 * 设置改变地地栏参数
		 * @param {[type]} conf  参数如 {id:123}
		 * @param {[type]} title 可选，文件标题
		 */
		,setArguments:function(conf, title){
			var state = {url: location.href };
			state.url=state.url.indexOf('?')>-1?state.url:'?';
			for(var k in conf){
				var regstr = '(\\W)('+k+'=[^&]+)', val='';
				if( (new RegExp(regstr, 'gi')).test(state.url) ){				
					val='$1';
				}else{
					regstr = '(.+)'
					val='$1&';
				}
				val+=k+'='+ encodeURIComponent(conf[k]);
				state.url = state.url.replace(new RegExp(regstr,'gi'), val);
			}
			if(window && window.history && window.history.pushState){
	            window.history.pushState(state, null, state.url);
	        }			
		}

	}
}});