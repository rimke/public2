/*
*
*	Canvas 扩展 1.0.0.1 
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
ET.extend(ET.extension, {svg:{
	initialize:function(){
		ET.loadLib('object');
		if( !$(this).html() ){ $(this).html( 'Does not support canvas'); }
		$.extend(this, this.fn);
	}
	/**
	 * 添加分组
	 * @param  {[type]} attr [description]
	 * @return {[type]}      [description]
	 */
	,addg:function(attr){
		var _me=this;
		return this._ce('g', attr?attr:{}, function(){			
			$.extend(this, _me.fn);
		});
	}
	,fn:{
		/**
		 * 添加path
		 * @param  {[type]} data 
		 *         "M1 1 L10 10"
		 *         {M:[1,1], L:[10,10]}
		 *         {M:[1,1], L:[[10,10],[20,20]]}
		 *         [{M:[1,1], L:[10,10]},{M:[1,1], L:[10,10]}]
		 * @param  {[type]} attr 样式{}
		 * @return {[type]}      [description]
		 */
		addpath:function(data, attr){
			attr=attr?attr:{'stroke':'#000000','stroke-width':1, 'fill':'none' };
			if( ET.object.getType(data)=="array" ){
				for(var i=0, l=data.length;i<l;i++){
					var d= data[i];
					this.addpath(d, attr);
				}
				return this;
			}
			var pcmd=['M', 'L', 'H', 'V', 'C', 'S', 'Q', 'T', 'A', 'Z'] //大写表示绝对定位，小写表示相对定位
			,attrd='', _me=this;
			return this._ce('path',null, function(){
				if(ET.object.getType(data)== "string") {
					attrd=data;
				}else{
					for(var k in data){
						if(pcmd.indexOf(k.toUpperCase())<0){ continue;}
						var d=data[k];
						attrd += _me._analysispos(d, k);
					}
				}
				$(this).attr({'d':attrd});
				attr && $(this).attr(attr);

			});
		}
		/**
		 * 添加距形
		 * @param  {[type]} x     起始x坐标
		 * @param  {[type]} y     起始y坐标
		 * @param  {[type]} w     宽
		 * @param  {[type]} h     高
		 * @param  {[type]} style 样式{}
		 * @return {[type]}       [description]
		 */
		,addrect:function(x,y,w,h,style){
			var _me=this;
			return this._ce('rect', {'x':x ,'y':y ,'width':w ,'height':h }, function(){
				style && $(this).css(style);
				$.extend(this, _me.fn);
			});
		}
		/**
		 * 画圆
		 * @param  {[type]} x     圆心 x 坐标
		 * @param  {[type]} y     圆心 y 坐标
		 * @param  {[type]} r     半径
		 * @param  {[type]} style 样式{}
		 * @return {[type]}       [description]
		 */
		,addcircle:function(x, y, r, style){
			return this._ce('circle', {'cx':x, 'cy':y, 'r':r},function(){				
				style && $(this).attr(style);
			});
		}
		/**
		 * 添加二维坐标尺
		 * @param  {[type]} x      坐标 x 位置
		 * @param  {[type]} y      坐标 y 位置
		 * @param  {[type]} w      尺 宽
		 * @param  {[type]} h      尺 高
		 * @param  {[type]} min    [description]
		 * @param  {[type]} max    [description]
		 * @param  {[type]} parts  [description]
		 * @param  {[type]} mirror [description]
		 * @return {[type]}        [description]
		 */
		,addrulerVH:function(x, y, w, h, min, max, parts, mirror){
			// w=w?w:$(this).width(); h=h?h:$(this).height();
			var v=this.addrulerV(50, y-h, w, h, min, max, parts, mirror)
			,h=this.addrulerH(x, y, w, h, min, max, parts, mirror)
			,o={};
			return o;
		}
		//垂直
		,addrulerV:function(x, y, w, h, min, max, parts, mirror){
			return this.addruler(true, x, y, w, h, min, max, parts, mirror);
		}
		//水平
		,addrulerH:function(x, y, w, h, min, max, parts, mirror){
			return this.addruler(false, x, y, w, h, min, max, parts, mirror);
		}
		/**
		 * 添加尺子
		 * @param  {[type]} vh  水平或垂直，false水平，true垂直，，默认为false
		 * @param  {[type]} x   尺子起始 x 坐标，默认为0
		 * @param  {[type]} y   尺子起始 y 坐标，默认为0
		 * @param  {[type]} w   尺子宽，默认为父级宽度
		 * @param  {[type]} h   尺子高，默认为16
		 * @param  {[type]} min 最小刻度，默认为0
		 * @param  {[type]} max 最大刻度，默认为100
		 * @param  {[type]} parts 刻度等份默认为20
		 * @param  {[type]} mirror 镜像，默认为false
		 * @return {[type]}     [description]
		 */
		,addruler:function(vh,  x, y, w, h, min, max, parts, mirror){
			vh=vh?true:false;
			x=x?x:0; y=y?y:0;
			w=w?w:0; h=h?h:0;
			min=min?min:0; 
			max=max?max:100; 
			mirror=true;
			
			// if(!w){w=(vh)?16:$(this).width()-x; }
			// if(!h){h=(vh)?$(this).height()-y:16; }
			if(!w){w=$(this).width()-x; }
			if(vh){w=16; }
			if(!h){h=$(this).height()-y; }
			if(!vh){h=16; }

			parts=parts?parts:10;
			var p='', rw = max-min
			,rwl=(rw+'').length
			,fnts= $(this).css('font-size').replace(/[^\d]/gi,'')*1
			,pl = vh?parseInt(h/parts):parseInt(w/parts)// 没等份宽
			,l=parts 
			// ,gt=this.addg({'style':'opacity:0.5'});
			,gt=this._ce('g', {'style':'opacity:0.5;text-shadow: 0rem 0rem 0.03rem #8e8e8e;'});
			if(vh){
				var x1=mirror?x-w:x+w;
				p='M'+x1+' '+y+' L'+x+' '+y;
			}else{
				var y1=mirror?y+h:y-h;
				p='M'+x+' '+y1+' L'+x+' '+y;
			}
			for(var i=0; i<l;i++){
				var x1=x, y2=y, tx=0,ty=0,
				val = (i+1)*(rw/parts)+min;
				if(vh){
					x1=(i%2)?((w/3)*2):w/3, y2=i*pl+pl+y;
					x1=mirror?x-x1:x+x1;
					p+='L'+x+' ' +y2+' ';
					p+='L'+x1+' ' +y2+' ';
					p+='M'+x+' ' +y2+' ';
					tx=mirror?x-(rwl*fnts):x+(rwl*fnts);
					ty=y2;
					val=max-val;
				}else{
					x1=i*pl+pl+x, y2=(i%2)?((h/3)*2):h/3;
					y2=mirror?y2+y:y-y2;
					p+='L'+x1+' ' +y+' ';
					p+='L'+x1+' ' +y2+' ';
					p+='M'+x1+' ' +y+' ';
					tx=x1;
					ty=mirror?y+(rwl*fnts):y-(rwl*fnts);
				}
				var gtxt=this.addtext(val, tx, ty);
				$(gt).append(gtxt);
			}
			var path=this.addpath(p, {'stroke':'#999999','stroke-width':1, 'style':'-webkit-tap-highlight-color: rgba(0, 0, 0, 0);', 'fill':'none' });
			return this;
		}
		/**
		 * 添加文本
		 * @param  {[type]} txt  [description]
		 * @param  {[type]} x    [description]
		 * @param  {[type]} y    [description]
		 * @param  {[type]} attr [description]
		 * @return {[type]}      [description]
		 */
		,addtext:function(txt,x,y,attr){
			var _me=this;
			x=x?x:0; y=y?y:0;
			attr=attr?attr:{};
			return this._ce('text', {'x':x, 'y':y},function(){				
				$(this).html(txt);
			});
		}
		,_ce:function(tagName, attr, fun){
			if(!tagName)return ;
			fun=fun?fun:function(){};
			if( ET.object.getType(fun)!= "function" ){fun=function(){}; }
			var o=ET.ceNS(tagName, attr);
			ET.exec(fun, o, o);
			$(this).append(o);
			return o;
		}
		//解析坐标
		,_analysispos(data, lbl){
			if(ET.object.getType(data)== "array"){
				var val='', vals='';
				for(var i=0, l=data.length; i<l;i++){
					var d = data[i];
					if(ET.object.getType(d)== "array"){
						vals+=this._analysispos(d, lbl);
					}else if(ET.object.getType(d)== "number"
						|| ET.object.getType(d)== "string"){
						val+=d+' ';
					}
				}
				return val?this._analysispos(val.substr(0,val.length-1), lbl):this._analysispos(vals,'');
			}else if(ET.object.getType(data)== "string"){
				return lbl+data.replace(/\t*(.*)/gi, '$1')+' ';
			}
		}
	}
	
}});