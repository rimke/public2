/*
*
*	map Beta 1.0.0.1
*	Release date: 
*	Author		: 半条虫(466814195)
*	Keywords	: Etsoftware 半条虫(466814195) rimke 39doo 39度
*	Description	: 本脚本功能由EtSoftWare团队研发，仅供学习不得用于商业用途。
*	Blog		: http://rimke.blog.163.com/		
*	Website		: http://www.39doo.com/
*	Mail		: rimke@163.com
*	Copyright	: Power By Etsoftware
* eg:
*  <div et="map" longitude="0" latitude="0" Flag="true" maptype="baidu" onload="地图加载完成后执行"></div>
*/
ET.extend({map:{
	version:'2.0.0.0' // 版本号
	,longitude:null // GPS经度
	,latitude:null	//	GPS韦度
	,maptype:'baidu'	// 默认地图为百度	
	,readystate:false
	,onload:null // 地图加载完成后执行
	,flags:[] //地图上已经做标志点
	,_event:[]
	,initialize:function(obj){
		if(!ET.object) ET.loadLib('object');
		if(!ET.object.isElement(this)){ return ; };	
		//获取属性值
		if( !!$(this).attr('longitude') ){this.longitude = $(this).attr('longitude').replace(/[^\d\.]+/gi, '')*1; }
		if( !!$(this).attr('latitude') ){this.latitude = $(this).attr('latitude').replace(/[^\d\.]+/gi, '')*1; }
		if( !!$(this).attr('maptype') ){this.maptype = $(this).attr('maptype'); }
		if( !!$(this).attr('onload') ){
			// ET.addEvents('onload', new Function($(this).attr('onload')), this);
			this.onload=new Function($(this).attr('onload'));
		}
		var Flag = $(this).attr('Flag');
		Flag = (Flag==undefined)?false:Flag;
		if( !ET.object.isBoolean(Flag) ){
			if(Flag==1 || Flag=='true' || Flag=='Flag'){ Flag=true; }
			else{Flag=false; }
		}
		if( Flag ){
			var point={longitude:this.longitude ,latitude:this.latitude}
			,html='';
			if( ET.object.isElement(this) ){
				html=$(this).html();
				$(this).empty();
			}
			if( !/^[ \t\r\n]*$/gi.test(html) ){point.html = html; }
			this.addFlag(point);
		}		
		$(this).attr('data-lazyload', '');

		// this.callback = this.dataLazyload;
		var cbfun=this.callback;
		this.callback = function(){
			this.dataLazyload();
			cbfun && cbfun();
		}

		if( this.data_lazyload ){  this.data_lazyload(); }else{
			// this.callback();
		}
	}
	/**
	 * 自动调用相关函数
	 * @param  {[type]} fkey 函数名
	 * @param  {[type]} data 参数
	 * @return {[type]}      [description]
	 */
	,_autoCallSelf:function(fkey, data){
		var ret=null;
		this['pre'+fkey] && ( ret=this['pre'+fkey](data) );
		this[fkey] && ( ret=this[fkey](data) );
		this['after'+fkey] && ( ret=this['after'+fkey](data) );
		return ret;
	}	
	/**
	 * 预加载数据
	 * @param  {[type]} e [description]
	 * @return {[type]}   [description]
	 */
	,dataLazyload:function(e){
		var _me=this, maptype = this.maptype.toLowerCase()
		,lib = ET.extPath + maptype + '.ext.js';
		if(lib){ //加载对应的地图版本 
			ET.loadJS(lib, function(e){
				$.extend(_me, e);
				_me.readystate=true;
				e.initialize && _me.initialize();
				_me.readystate && _me.onload && _me.onload();
			});
		}
		return this;
	}
	/**
	 * 搜索位置
	 * @param  {[type]} e 接收一个字符串，或gps porint
	 * @return {[type]}        [description]
	 */
	,search:function(e){
		e=(e==undefined || e==null)?'':e;
		if( ET.object.getType(e)=="string"){
			e=this.searchKeyword(e);
		}
		if(!e || e.longitude==undefined || e.latitude==undefined ){
			return this;
		}
		this.location(e);
		return this;
	}
	/**
	 * 根据关键词搜索地图坐标
	 * @param  {[type]} e [description]
	 * @return {[type]}   返回为GPS经韦度 {longitude:0, latitude:0} 
	 */
	,searchKeyword:function(e){ return this._autoCallSelf('_searchKeyword', e); }
	/**
	 * 定位地图显示位置及比例
	 * @param  {[type]} point GPS坐标
	 * @param  {[type]} level 显示级别比例
	 * @return {[type]}       [description]
	 */
	,centerAndZoom:function(point, level){
		this._autoCallSelf('_centerAndZoom', {point:point, level:level});
		return this;
	}
	/**
	 * 设定地图显示区域
	 * @param  {[type]} points GPS经韦度 {longitude:0, latitude:0}
	 * @return {[type]}           [description]
	 */
	,location:function(points){
		if(!points || !points.longitude || !points.latitude){console.log('%c Missing parameters!', 'background:red; color: white'); return ;}
		this.longitude=points.longitude; this.latitude=points.latitude;		
		this._autoCallSelf('_location', points);
		return this;
	}
	/**
	 * 地图点击事件，
	 * 返回为GPS坐标 
	 * @param  {[type]} fun 回调函数
	 * @return {[type]}     [description]
	 */
	,click:function(fun){
		if(fun){
			(!this._event['click']) && (this._event['click']=function(e){return e;});
			var clickEvent = this._event['click'];
			this._event['click']=function(e){ clickEvent(e); fun(e); };
		}
		return this;
	}
	,_click:function(e){this._event['click'] && this._event['click'](e);}
	/**
	 * 在地图上添加标记
	 * @param  {[type]} points 标记位置，可以传入多个。{longitude:114.035849, latitude:22.624643, html:'', ico:'' }
	 * @return {[type]}           
	 */
	,addFlag:function(points){
		points=(points)?points:{longitude:this.longitude ,latitude:this.latitude };
		if(!this.readystate){
			var _me=this, olfun = _me.onload?_me.onload:function(e){return e;};
			_me.onload = function(e){ olfun(e); _me.addFlag(points);};
			return this;
		}
		if(points instanceof Array){
			for(var i=0; i<points.length;i++){
				this.addFlag( points[i] );
			}
			return this;
		}else{
			if(points.longitude==undefined || points.latitude==undefined  ){
				console.log('%c The parameter is incorrect!', 'background:red; color: white'); return ;
			}
		}
		this._autoCallSelf('_addFlag', points);
		return this;
	}
	,clearFlag:function(){if(!this.flags)return this;for(var i=0; i<this.flags.length;i++){this.removeFlag(i);};return this; }
	,removeFlag:function(id){
		if(!this.flags || id===undefined)return false
		if( id<0 || id>this.flags.length )return false;
		this.flags[id].remove();
		return true;
	}
	/**
	 * 获取地图上的标志
	 * @return {[type]} [description]
	 */
	,getFlag:function(){return this.flags; }
	/**
	 * 获取当前GPS坐标位置
	 * @param  {[type]} fun 	异步回调函数
	 * @return {[type]} 返回一个GPS坐标对象如 {longitude:114.035849, latitude:22.624643}
	 */
	,getCurrentPosition:function(fun){
		return this._autoCallSelf('_getCurrentPosition', fun);
	}
}});