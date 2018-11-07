/*
*
*	calendar 1.0.0.1  扩展
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

ET.extend(ET.extension, {calendar:{
	initialize:function(){				
		if( !ET.object.isElement(this) ){ return ;}
		if(!ET.unit) ET.loadLib('unit'); 
		if(!ET.date) ET.loadLib('date'); 
		if(!ET.event) ET.loadLib('event'); 
		if(!ET.calendar) ET.loadLib('calendar'); 
		this.readOnly=true;
		$(this).click(function(){
			this.showCalendar();
		});
	}
	,showCalendar:function(date){		
		var _me=this;
		date=date?date:ET.date.fromString(this.value);
		if(!date){date=new Date();}
		if( this.ccv===undefined ){			
			this.ccv=this.createCalendarView();
			$(this.ccv).css('z-index', document.all.length*10);
			$(this).after(this.ccv);
		}
		$(this.ccv).css({
			'left': ET.unit.pxorem($(this).offset().left +'px')
		}).show();	
		this.setDate(date);
	}
	/**
	 * 创建万年历视图
	 * @return {[type]} [description]
	 */
	,createCalendarView:function(){
		var _me=this; calendar = ET.ce('div', {'class':'bd ET_CALENDAR'})
		,info = ET.ce('div', {'class':'info'})
		,dateweek = ET.ce('p', {'class':'dateweek', 'innerHTML':'2018-04-16 星期一'})
		,day = ET.ce('div', {'class':'day', 'innerHTML':'16'})
		,sub = ET.ce('div', {'class':'sub', 'innerHTML':'<p>戊戌年 【狗年】</p><p>丙辰月 戊寅日</p>'})
		,festival = ET.ce('div', {'class':'festival'})
		,btnOk = ET.ce('a', {'class':'ok', 'innerHTML':'确定'}) ,btnCancel = ET.ce('a', {'class':'cancel', 'innerHTML':'取消'})
		,tools = ET.ce('div', {'class':'tools'})
		,box = ET.ce('div', {'class':'box'})
		,selector = ET.ce('div', {'class':'selector'})
		,yspn = ET.ce('span') ,yslt = ET.ce('select', {'class':'year'})
		,yl = ET.ce('a', {'class':'prev', 'innerHTML':'<'})
		,yr = ET.ce('a', {'class':'next', 'innerHTML':'>'})
		,mspn = ET.ce('span') ,mslt = ET.ce('select', {'class':'month'})
		,ml =$(yl).clone() ,mr =$(yr).clone()
		,holiday = ET.ce('select', {'class':'holiday'})
		,goback = ET.ce('a', {'class':'goback', 'innerHTML':'返回今天', 'href':'javascript:void(0)'})
		,hdivlst = ET.ce('div', {'class':'table'}) 
		,tbl = ET.ce('table', {border:"0", cellspacing:"0"}) ,thd = ET.ce('thead') ,tby = ET.ce('tbody'),tr = ET.ce('tr')
		,feild=['日','一','二','三','四','五','六'];

		for(var i=0; i<feild.length; i++){
			$(tr).append( ET.ce('th', {'innerHTML': feild[i]}) );
		}
		$(goback).click(function(e){ ET.event.preventDefault(e); _me.setDate(new Date()); });
		$(yspn).append([yl, yslt, yr]);
		$(mspn).append([ml, mslt, mr]);
		$([yslt, mslt]).change(function(){_me.setDate( new Date(yslt.value+'/'+mslt.value+'/1') );});
		$(thd).append(tr);
		$(hdivlst).append($(tbl).append([thd, tby]));
		$(btnOk).click(function(e) {_me.setValue(_me.date).destroy(); });
		$(btnCancel).click(function(e) {_me.destroy(); });

		$(tools).append([btnOk,btnCancel]);
		$(info).append([dateweek, day, sub, festival,tools]);
		$(selector).append([yspn, mspn, holiday, goback]);
		$(box).append([selector, hdivlst]);
		$(calendar).append([info, box]);
		return calendar;
	}
	/**
	 * 初始化数据
	 * @param {[type]} date [description]
	 */
	,setDate:function(date){
		if( this.ccv===undefined ){return ;}
		if( !(date instanceof Date) ){return ;}
		this.date = date;
		var day=1; now=null
		, tby = $(this.ccv).find('.table>table>tbody')
		, sltYear = $(this.ccv).find('select.year')
		, sltMonth = $(this.ccv).find('select.month')
		, dateweek = $(this.ccv).find('.dateweek')
		, sub = $(this.ccv).find('.sub')
		, cdate = date.getDate()
		;
		sltYear.empty();
		for(var i=date.getFullYear()-50; i<date.getFullYear()+30; i++){
			$(sltYear).append(ET.ce('option', {'value':i,'innerHTML':i}));
		}
		$(sltYear).val(date.getFullYear());
		sltMonth.empty();
		for(var i=1; i<13; i++){
			$(sltMonth).append(ET.ce('option', {'value':i,'innerHTML':i}));
		}
		$(sltMonth).val(date.getMonth()+1);
		
		if(tby.length<1)return ;
		tby.empty();
		tby[0].calendar=this;
		var ndate=new Date(date.getFullYear()+'/'+(date.getMonth()+1)+'/1') ,nTime=ndate.getTime()
		, w=(new Date( nTime )).getDay(), dmonth=false , Time24=1000*60*60*24;
		if(w>0){nTime-=Time24*w; ndate = new Date( nTime );}				
		for(var i=0; i<6; i++){			
			var tr=ET.ce('tr');
			if(i==5 && ndate.getMonth()!= date.getMonth()){ break;}
			for(var j=0; j<7; j++){
				var td=ET.ce('td');
				td.calendar = this;
				$(tr).append(td);
				$(td).hover(function(){$(this).addClass('hover');}, function(){$(this).removeClass('hover');})
				.click(function(){ 
					$(tby).find('td').removeClass('selected'); 
					$(this).addClass('selected'); 
					this.calendar.date=ET.date.fromString($(this).attr('date'));
					this.calendar.setDate(this.calendar.date);
				})
				.dblclick(function(){this.calendar.setValue(this.calendar.date).destroy(); });
				
				if( j==ndate.getDay() ){
					if(ndate.getMonth() == date.getMonth() && cdate==ndate.getDate()){ $(td).addClass('selected'); }
					if( date.getMonth() != ndate.getMonth() ){ $(td).addClass('disabled'); }
				}
				$(td).attr('date', ET.date.formate('yyyy/MM/dd', ndate)).html(ndate.getDate()); 
				nTime+=Time24;
				ndate = new Date( nTime );
			}
			$(tby).append(tr);
		}
		$(tby).find('.disabled').click(function(){
			this.calendar.setDate(ET.date.fromString($(this).attr('date')));
		});
		dateweek.html( ET.date.formate('yyyy-MM-dd', date)+ ' 星期'+['日','一','二','三','四','五','六'][date.getDay()] );
		$(this.ccv).find('.day').html( cdate );

		var Lunar=ET.calendar.toLunar(date);
		sub.html( '<p>'+Lunar.HB+'('+Lunar.zodiac+'年)</p><p>'+Lunar.month_cn+Lunar.date_cn+'</p>' );
	}
	,getDate:function(){return this.date; }
	,setValue:function(date){
		var type=$(this).attr('type').toLowerCase();
		if( type=='date' ){
			this.value=ET.date.formate('yyyy-MM-dd', date);
		}else if( type=='week' ){
			this.value=ET.date.formate('yyyy-Ww', date); //2015-W15
		}else if( type=='month' ){
			this.value=ET.date.formate('yyyy-MM', date); //
		}else if( type=='time' ){
			this.value=ET.date.formate('hh:ii', date); //2015-W15 
		}else if( type=='datetime' ){
			this.value=ET.date.formate('yyyy-MM-dd hh:ii', date); //
		}else if( type=='datetime-local' ){
			this.value=ET.date.formate('yyyy-MM-ddThh:ii', date); //
		}
		return this;
	}
	/**
	 * 销毁万年历控件
	 * @return {[type]} [description]
	 */
	,destroy:function(){
		if(!this.ccv)return ;
		$(this.ccv).remove();
		this.ccv=undefined;
		return undefined;
	}
}});