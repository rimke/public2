/*
*
*	Etsoftware.map.baidu Beta 2.0.0.0
*	Release date: 
*	Author		: 半条虫(466814195)
*	Keywords	: Etsoftware 半条虫(466814195) rimke 39doo 39度
*	Description	: 预处理<code econtrol></code>标签
*	Blog		: http://rimke.blog.163.com/		
*	Website		: http://www.39doo.com/
*	Mail		: rimke@163.com
*	Copyright	: Power By Etsoftware
* http://blog.csdn.net/kikilizhm/article/details/7858405
* 
*/
ET.extend(ET.extension, {baidu:{
	ak:'OoTtiGomHivxlAVPe77RGsPVuWVz9U84' //API密码
	,map:null
	,initialize:function(){
		ET.loadLib('unit');
		ET.loadLib('object');
		var _me=this;		
		if( !this.maptype ){
			ET.loadLib('map', function(e){
				ET.extend(this, e);
				e.initialize && this.initialize();
			});
			return false;
		}
		this._jsLazyload(function(e){_me.mapInit(e);});
	}
	,_jsLazyload:function(fun){
		var _me=this, isload=false;
        _me.readystate=false;        
		$('script').each(function(){
			if(this.src.indexOf('api.map.baidu.com')!=-1){isload=true; }
		});
		if(isload)return ;
		var script = ET.ce("script");
		if(typeof(fun) =="function" ){
			script.tmpfun= fun;
			window.map_tmp_fun=function(e){
				script.tmpfun(e);
				window.map_tmp_fun=undefined;
        		_me.readystate=true;
        		_me.onload && _me.onload();
			}
			fun='map_tmp_fun';
		}
        script.type = "text/javascript";
        script.src = "http://api.map.baidu.com/api?v=2.0&ak="+this.ak+"&callback="+fun;        
        $('html>head').append(script);
	}
	,mapInit:function(e){
		if(!ET.object.isElement(this)){ return ; };
		var _me=this, css={};
		if( $(this).height()<1 ){ css.height= ET.unit.pxorem(($(window).height()/2)+ 'rem') ; }
		if( $(this).width()<1 ){ css.height= ET.unit.pxorem($(window).width()+ 'rem') ; }
		$(this).css(css);

		this.map = new BMap.Map(this);	// 创建Map实例
        this.map.enableScrollWheelZoom();	//启用滚轮放大缩小        
        this.map.addEventListener("click", function(e){_me._bdClick(e)});
        this.map.addEventListener("touchend", function(e){_me._bdClick(e)});
        if( !(!this.longitude || !this.latitude) ){
        	this.baidu.convertorTobaidu({lng:this.longitude, lat:this.latitude}, function(e){_me._setlocation(e)});
        }else{
        	var myCity = new BMap.LocalCity();
			myCity.get(function(e){
				_me._setlocation({points:[e.center]});	
			});
        }
        this.readystate=true;
	}
	/**
	 * 根据关键字在地图搜索位置，并返回百度地图坐标。
	 * @param  {[type]} keywords 关键字
	 * @return {[type]}          [description]
	 */
	,_searchKeyword:function(keywords){
		var local = new BMap.LocalSearch(this.map, {
			renderOptions:{map: this.map}
		});
		return local.search(keywords);
	}
	/**
	 * 用户调用location函数前执行代码
	 * @param  {[type]} e [description]
	 * @return {[type]}   [description]
	 */
	,pre_location:function(e){
		var _me = this;
		this.baidu.convertorTobaidu({lng:e.longitude, lat:e.latitude}, function(e){_me._setlocation(e)});
	}
	/**
	 * 用户调用location函数后执行代码
	 * @param  {[type]} e [description]
	 * @return {[type]}   [description]
	 */
	,after_location:function(e){}
	/**
	 * 添加标记前调用函数
	 * @param  {[type]} points GPS坐标{html:显示文本, latitude:0, longitude:0}
	 * @return {[type]}   [description]
	 */
	,pre_addFlag:function(points){
		var _me=this, pnts = this._mp2bd_points(points);		
		if(!pnts)return ;
		this.baidu.convertorTobaidu(pnts, function(e){			
			if(e.status!=0 || !e.points){ ET.errorTrace('Err:'+e.status); return ;}
			for (var i = 0; i <e.points.length; i++) {
				var point = e.points[i]
				,nPont = (pnts instanceof Array)?pnts[i]:pnts;				
				$.extend(nPont, point);
				var flag = _me._flag( nPont );
				_me.flags.push( flag );
			}
		});
	}
	/**
	 * MAP的points参数转换为map.baidu参数
	 * @return {[type]} [description]
	 */
	,_mp2bd_points:function(points){
		if(!points) return null;
		var pnts ={};
		if(points instanceof Array){
			pnts =[];
			for(var i=0; i<points.length; i++){
				var pnt=this._mp2bd_points(points[i]);
				pnt && pnts.push(pnt);
			}
		}else{
			pnts = points;
			pnts.lng=points.longitude;
			pnts.lat=points.latitude;
		}
		return pnts;
	}
	,_bdClick:function(e){
		var _me=this;
		_me.baidu.convertorToGPS(e.point, function(point){
        	_me._click({provider:e ,longitude:point.lng ,latitude:point.lat });
    	});
	}
	/**
	 * 设置地图显示位置
	 * @param  {[type]} e [description]
	 * @return {[type]}   [description]
	 */
	,_setlocation:function(e){		
    	var point = e.points[0]; // 创建点坐标
    	var zoom=e.zoom?e.zoom:this.map.getViewport().zoom;    	
    	this.map.centerAndZoom(point, zoom);
    	// this.map.centerAndZoom(point, 16);
        // this._flag(e.points);
	}
	/**
	 * 在地图上标记显示定位
	 * @param  {[type]} points 定位坐标 {html:显示文本, latitude:0, longitude:0}
	 * @return {[type]}   返回坐标对象
	 */
	,_flag:function(points){
		var _me=this, ret=null;
		if(points instanceof Array){			
			ret=[];
			for(var i=0; i<points.length; i++){
				var pi = points[i]
				,marker = this._flag(pi);
		        ret.push(marker);
			}
		}else if( typeof(points) =="object"){
			var point = new BMap.Point(points.lng, points.lat)
			,param={};
	        if( points.ico && points.ico.length>0 ){
	        	param.icon = this._createICO(points.ico, points.icoW, points.icoH);
	        }
			ret = new BMap.Marker(point, param); //创建标注
        	ret.disableDragging(); // 不可拖拽
	        this.map.addOverlay(ret); // 将标注添加到地图中
	        _me._refGPS(point);
	        if( points.html && points.html.length>0 ){
	        	var txt = this._addText(points, points.html);
	        	ret.addEventListener("click", function(){ 
					_me.map.openInfoWindow(txt, this.point); //开启信息窗口
				});
	        }
		}
		return ret;
	}
	,_createICO:function(src, w, h){
		var myIcon = new BMap.Icon(src, new BMap.Size(w, h), {imageOffset: new BMap.Size(0, 0)});
		return myIcon;
	}
	/**
	 * 添加显示文本
	 * @param {[type]} point 
	 * @param {[type]} html  
	 */
	,_addText:function(point, html){
		point = new BMap.Point(point.lng, point.lat);
		var opts = {
			width : 200     // 信息窗口宽度
			,height: 100     // 信息窗口高度
			// ,title : "海底捞王府井店"  // 信息窗口标题
			,enableMessage:true //设置允许信息窗发送短息
			// ,message:"亲耐滴，晚上一起吃个饭吧？戳下面的链接看下地址喔~"
		};
		var infoWindow = new BMap.InfoWindow(html, opts);  // 创建信息窗口对象 
		this.map.openInfoWindow(infoWindow, point); // 开启信息窗口	
		// console.log(point);
		return infoWindow;	
	}
	,_refGPS:function(point){
		var _me = this;
		this.baidu.convertorToGPS(point, function(e){
			if(e && e.lng && e.lat ){
				_me.longitude = e.lng;
				_me.latitude = e.lat;
			}
		});
	}
	/**
	 * 获取用户当前所在物理地址GPS坐标
	 * @param  {[type]} type 	类型， 1为浏览器，2为IP; 默认为自动
	 * @param  {[type]} fun 	异步回调函数
	 * @return {[type]} 返回GPS经韦度 {lng:0, lat:0}
	 */
	,_getCurrentPosition:function(fun, type){
		type=type?type:3;
		fun=fun?fun:function(p){console.log(p);};
		var ret=null;
		(type&1) &&( ret=this._getCurrentPositionByBrowser(fun) );
		(ret==null && type&2) &&( ret=this._getCurrentPositionByIP(fun) );
		return ret;
	}
	/**
	 * 获取用户IP所在物理地址GPS坐标
	 * @param  {[type]} fun 	异步回调函数
	 * @return {[type]} 返回GPS经韦度 {lng:0, lat:0}
	 */
	,_getCurrentPositionByIP:function(fun){
		var _me=this, geolocation = new BMap.Geolocation();
		geolocation.getCurrentPosition(function(r){
				if(this.getStatus() == BMAP_STATUS_SUCCESS){
					// var mk = new BMap.Marker(r.point);
					// _me.map.addOverlay(mk);
					// _me.map.panTo(r.point);
					hmap.baidu.convertorToGPS(r.point, fun);
					console.log('您的百度位置：{lng：'+r.point.lng+', lat：'+r.point.lat+'}');
				}
				else {
					fun(null);
					console.log('failed'+this.getStatus());
				}        
			}
			,{enableHighAccuracy: true}
		);
	}
	/**
	 * 获取用户浏览器所在物理地址GPS坐标
	 * @param  {[type]} fun 	异步回调函数
	 * @return {[type]} 返回GPS经韦度 {lng:0, lat:0}
	 */
	,_getCurrentPositionByBrowser:function(fun){}
	/**
	 * 定位地图显示位置及比例
	 * @param  {[type]} data	定位数据如{point:'GPS位置',level:显示级别}
	 * @return {[type]}       [description]
	 */
	,_centerAndZoom:function(data){
		var _me=this;
		this.baidu.convertorTobaidu(data.point, function(e){
			console.log(e);
			_me.map.centerAndZoom(e[0], data.level);
		});
	}

	,baidu:{
		/**
		 * 将 GPS坐标转换成为百度坐标
		 * @param  {[type]} points GPS经韦度 {lng:0, lat:0}
		 * @param  {[type]} fun       回调函数
		 * @return {[type]}           没有返回
		 */
		convertorTobaidu:function(points, fun){
			var convertor = new BMap.Convertor();
			if(points instanceof Array){
				var pnts =[];
				for(var i=0; i<points.length; i++){
					var pnt = points[i], p={longitude:0, latitude:0};
					if(pnt.lng && pnt.lat ){
						p={longitude:pnt.lng, latitude:pnt.lat};
					}else if(pnt.longitude && pnt.latitude ){
						p=pnt;
					}else{
						console.log('%c Incorrect coordinates!\n'+ET.object.toString(pnt), 'background:red; color: white'); return ;
						continue;
					}
					var point = new BMap.Point(p.longitude, p.latitude);
					pnts.push(point);
				}
				return convertor.translate(pnts, 1, 5, fun);
			}else{
				return this.convertorTobaidu([points], fun);
			}
		}
		/**
		 * 将百度坐标转为GPS坐标
		 * @param  {[type]} points 百度坐标经韦度 {lng:0, lat:0}
		 * @param  {[type]} fun       回调函数
		 */
		,convertorToGPS:function(points, fun){
			this.convertorTobaidu(points, function(e){
				var ret ={
					'devinfo':'GPRS'
					,lng:2*points.lng-e.points[0].lng
					,lat:2*points.lat-e.points[0].lat
					,longitude:2*points.lng-e.points[0].lng
					,latitude:2*points.lat-e.points[0].lat
				};
				fun && fun(ret);
			});
			return this;
		}

	}
}});