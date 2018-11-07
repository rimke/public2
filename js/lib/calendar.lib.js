/*
*
*	calendar 1.0.0.1  万年历
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

ET.extend({calendar:{
	initialize:function(){}
	/**
	 * 转换为阳历
	 * @param  {[type]} ld 阴历,默认为空当前日期
	 * @return {[type]}    返回为date
	 */
	,toSolar:function( ld ){
		if(!ld){return new Date();}
	}
	/**
	 * 转换为阴历
	 * @param  {[type]} date 阳历日期, 默认为当前日期
	 * @return {[type]}      
	 */
	,toLunar:function(date){
		date=date?date:new Date();
		var year = date.getFullYear()
		,month = date.getMonth()+1
		,day = date.getDate()
		,yearData = this.lconfig.info[year - this.lconfig.min];
		if (year == this.lconfig.min && month <= 2 && day <= 9) {
			return {year:1891 ,month:1 ,date:1 ,HB:'辛卯',zodiac:'兔',month_cn:'正月',date_cn:'初一'};
		}
		return this.lfun.lunarByBetween(year, this.lfun.betweenSolarDays(date, yearData), yearData);
	}
	,lfun:{
		/**
		 * 计算2个阳历日期之间的天数
		 * @param  {[type]} date  [description]
		 * @param  {[type]} yinfo [description]
		 * @return {[type]}       [description]
		 */
		betweenSolarDays:function(date, yinfo) {
			var time1  = new Date(date.getFullYear() +"/"+ (date.getMonth()+1) +"/"+ date.getDate()).getTime()
			,time2 = new Date(date.getFullYear() +"/"+ yinfo[1] +"/"+ yinfo[2]).getTime()
			,ret=Math.ceil((time1-time2)/24/3600/1000);			
			return ret;
		}
		/**
		 * 根据距离正月初一的天数计算阴历日期
		 * @param  {[type]} year    [description]
		 * @param  {[type]} between [description]
		 * @return {[type]}         [description]
		 */
		,lunarByBetween:function(year, between, ydata) {			
			var lunarArray = {year:0, month:0, date:0, HB:'', zodiac:'', month_cn:'', date_cn:''}
			, yearMonth = [], t = 0, e = 0, leapMonth = 0, m = '';
			if (between == 0) {
				t = 1; e = 1; m = '正月';
			} else {
				year = between > 0 ? year:(year - 1);
				yearMonth = this.lunarYearMonths(year, ydata);
				leapMonth = this.leapMonth(ydata);
				between  = between > 0 ? between:(this.lunarYearDays(year, ydata) + between);
				for (var i = 0; i < 13; i++) {
					if (between == yearMonth[i]) {
						t = i + 2; e = 1; break;
					} else if (between < yearMonth[i]) {
						t = i + 1;
						e = between - ((yearMonth[i-1]) ? yearMonth[i-1]:0) + 1;
						break;
					}
				}
				m = (leapMonth != 0 && t == leapMonth + 1)
				? ('闰'+ this.chineseMonth(t-1))
				: this.chineseMonth(((leapMonth != 0 && leapMonth + 1 < t) ? (t - 1):t));
			}
			lunarArray.year=year; //年 月 日
			lunarArray.month=t; //年 月 日
			lunarArray.date=e; //年 月 日
			lunarArray.HB= this.lunarYear(year); 
			lunarArray.zodiac= this.zodiacYear(year); 
			lunarArray.month_cn= m; 
			lunarArray.date_cn= this.chineseNumber(e); 
			lunarArray.leapMonth= leapMonth;
			return lunarArray;
		}
		//农历每年的天数
		//@param year 农历年份
		,lunarYearDays:function(year, ydata) {
			var monthArray = this.lunarYearMonths(year, ydata),len = monthArray.length;
			return (monthArray[len-1] == 0 ? monthArray[len-2]:monthArray[len-1]);
		}
		//农历月份
		,lunarYearMonths:function(year, ydata) {
			var monthData = this.lunarMonths(ydata) ,res = [] ,temp = 0
			,len = (ydata[0] == 0 ? 12:13);			
			for (var i = 0; i < len; i++) {
				temp = 0;
				for (j = 0; j <= i; j++) {temp += monthData[j]; }
				res.push(temp);
			}
			return res;
		}
		//获取闰月
		//@param year 农历年份
		,leapMonth:function(ydata){return ydata[0]; }
		//农历月份天数数组
		,lunarMonths:function(ydata) {
			var leapMonth = ydata[0] ,bit = (+ydata[3]).toString(2) ,months = [];
			for (var i = 0; i < bit.length; i++) {months[i] = bit.substr(i, 1); }
			for (var k = 0, len = 16 - months.length; k < len; k++) {months.unshift('0'); }
			months = months.slice(0, (leapMonth == 0 ? 12:13));
			for (var i = 0; i < months.length; i++) {months[i] = +months[i] + 29; }
			return months;
		}	
		//中文月份
		,chineseMonth:function(month) {return ET.calendar.lconfig.lang.cn.month[month]; }
		//天干地支年
		,lunarYear:function(year) { 
			return ET.calendar.lconfig.Heavenly[year.toString().split("")[3]] + ET.calendar.lconfig.Branch[year % 12]; }
		//生肖年
		,zodiacYear:function(year) {return ET.calendar.lconfig.Zodiac[year % 12]; }
		//中文日期
		,chineseNumber:function(num) {
			var dateHash = ET.calendar.lconfig.lang.cn.day, res='';
			if (num <= 10) {
				res = '初'+ dateHash[num];
			} else if (num > 10 && num < 20) {
				res = '十'+ dateHash[num-10];
			} else if (num == 20) {
				res = "二十";
			} else if (num > 20 && num < 30) {
				res = "廿"+ dateHash[num-20];
			} else if (num == 30) {
				res = "三十";
			}
			return res;
		}		
	}
	,lconfig:{
		min:1891
		,max:2100
		,info:[
		    [0,2,9, 21936], [6,1,30, 9656], [0,2,17, 9584], [0,2,6, 21168], [5,1,26,43344], [0,2,13,59728],
		    [0,2,2, 27296], [3,1,22,44368], [0,2,10,43856], [8,1,30,19304], [0,2,19,19168], [0,2,8, 42352],
		    [5,1,29,21096], [0,2,16,53856], [0,2,4, 55632], [4,1,25,27304], [0,2,13,22176], [0,2,2, 39632],
		    [2,1,22,19176], [0,2,10,19168], [6,1,30,42200], [0,2,18,42192], [0,2,6, 53840], [5,1,26,54568],
		    [0,2,14,46400], [0,2,3, 54944], [2,1,23,38608], [0,2,11,38320], [7,2,1, 18872], [0,2,20,18800],
		    [0,2,8, 42160], [5,1,28,45656], [0,2,16,27216], [0,2,5, 27968], [4,1,24,44456], [0,2,13,11104],
		    [0,2,2, 38256], [2,1,23,18808], [0,2,10,18800], [6,1,30,25776], [0,2,17,54432], [0,2,6, 59984],
		    [5,1,26,27976], [0,2,14,23248], [0,2,4, 11104], [3,1,24,37744], [0,2,11,37600], [7,1,31,51560],
		    [0,2,19,51536], [0,2,8, 54432], [6,1,27,55888], [0,2,15,46416], [0,2,5, 22176], [4,1,25,43736],
		    [0,2,13, 9680], [0,2,2, 37584], [2,1,22,51544], [0,2,10,43344], [7,1,29,46248], [0,2,17,27808],
		    [0,2,6, 46416], [5,1,27,21928], [0,2,14,19872], [0,2,3, 42416], [3,1,24,21176], [0,2,12,21168],
		    [8,1,31,43344], [0,2,18,59728], [0,2,8, 27296], [6,1,28,44368], [0,2,15,43856], [0,2,5, 19296],
		    [4,1,25,42352], [0,2,13,42352], [0,2,2, 21088], [3,1,21,59696], [0,2,9, 55632], [7,1,30,23208],
		    [0,2,17,22176], [0,2,6, 38608], [5,1,27,19176], [0,2,15,19152], [0,2,3, 42192], [4,1,23,53864],
		    [0,2,11,53840], [8,1,31,54568], [0,2,18,46400], [0,2,7, 46752], [6,1,28,38608], [0,2,16,38320],
		    [0,2,5, 18864], [4,1,25,42168], [0,2,13,42160], [10,2,2,45656], [0,2,20,27216], [0,2,9, 27968],
		    [6,1,29,44448], [0,2,17,43872], [0,2,6, 38256], [5,1,27,18808], [0,2,15,18800], [0,2,4, 25776],
		    [3,1,23,27216], [0,2,10,59984], [8,1,31,27432], [0,2,19,23232], [0,2,7, 43872], [5,1,28,37736],
		    [0,2,16,37600], [0,2,5, 51552], [4,1,24,54440], [0,2,12,54432], [0,2,1, 55888], [2,1,22,23208],
		    [0,2,9, 22176], [7,1,29,43736], [0,2,18, 9680], [0,2,7, 37584], [5,1,26,51544], [0,2,14,43344],
		    [0,2,3, 46240], [4,1,23,46416], [0,2,10,44368], [9,1,31,21928], [0,2,19,19360], [0,2,8, 42416],
		    [6,1,28,21176], [0,2,16,21168], [0,2,5, 43312], [4,1,25,29864], [0,2,12,27296], [0,2,1, 44368],
		    [2,1,22,19880], [0,2,10,19296], [6,1,29,42352], [0,2,17,42208], [0,2,6, 53856], [5,1,26,59696],
		    [0,2,13,54576], [0,2,3, 23200], [3,1,23,27472], [0,2,11,38608], [11,1,31,19176],[0,2,19,19152],
		    [0,2,8, 42192], [6,1,28,53848], [0,2,15,53840], [0,2,4, 54560], [5,1,24,55968], [0,2,12,46496],
		    [0,2,1, 22224], [2,1,22,19160], [0,2,10,18864], [7,1,30,42168], [0,2,17,42160], [0,2,6, 43600],
		    [5,1,26,46376], [0,2,14,27936], [0,2,2, 44448], [3,1,23,21936], [0,2,11,37744], [8,2,1, 18808],
		    [0,2,19,18800], [0,2,8, 25776], [6,1,28,27216], [0,2,15,59984], [0,2,4, 27424], [4,1,24,43872],
		    [0,2,12,43744], [0,2,2, 37600], [3,1,21,51568], [0,2,9, 51552], [7,1,29,54440], [0,2,17,54432],
		    [0,2,5, 55888], [5,1,26,23208], [0,2,14,22176], [0,2,3, 42704], [4,1,23,21224], [0,2,11,21200],
		    [8,1,31,43352], [0,2,19,43344], [0,2,7, 46240], [6,1,27,46416], [0,2,15,44368], [0,2,5, 21920],
		    [4,1,24,42448], [0,2,12,42416], [0,2,2, 21168], [3,1,22,43320], [0,2,9, 26928], [7,1,29,29336],
		    [0,2,17,27296], [0,2,6, 44368], [5,1,26,19880], [0,2,14,19296], [0,2,3, 42352], [4,1,24,21104],
		    [0,2,10,53856], [8,1,30,59696], [0,2,18,54560], [0,2,7, 55968], [6,1,27,27472], [0,2,15,22224],
		    [0,2,5, 19168], [4,1,25,42216], [0,2,12,42192], [0,2,1, 53584], [2,1,21,55592], [0,2,9, 54560]
		]
		,Heavenly:['庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁', '戊', '己']
		,Branch:['申', '酉', '戌', '亥', '子', '丑', '寅', '卯', '辰', '巳', '午', '未']
		,Zodiac:['猴', '鸡', '狗', '猪', '鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊']
		,lang:{
			cn:{
				month: ['', '正月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '冬月', '腊月']
				,day: ['', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十']
			}
		}
	}
	 
}});