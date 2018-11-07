ET.extend({random:{
	initialize:function(){}
	,float:function(foot){var rnd =  Math.random(); return (foot)?rnd*foot:rnd; }
	,int:function(min, max){var foot=max?max:min; foot=foot?parseInt(foot):9; var val=parseInt(this.float() * foot); return (min&&max)?val+min:val; }
	,Hex:function(foot){foot=(foot)?parseInt(foot):1;var hex=''; for(var i=0; i<foot; i++){hex+=parseInt(this.int(16)).toString(16)};return hex;}
	,char:function(){return String.fromCharCode(this.int(255))}
	,stringByAZ:function(count){count=(count)?count:1;var reVal='';for(var i=0;i< count;i++)reVal +=this.string(1,65,90);return reVal;}
	,stringByaz:function(count){count=(count)?count:1;var reVal='';for(var i=0;i< count;i++)reVal +=this.string(1,97,122);return reVal;}
	,stringByW:function(count){
		var reVal='';
		count=(count)?count:1;
		for(var i=0;i< count;i++){
			var t = this.int(3);
			reVal+=(t==0)?this.int():((t==1)?this.stringByAZ():this.stringByaz()) ;
		}
		return reVal;
	}
	,string:function(count, minCharCode, maxCharCode){
		var reVal='';
		count=(count)?count:1;
		minCharCode = minCharCode||0;
		maxCharCode = maxCharCode||255;
		var range = maxCharCode - minCharCode
		for(var i=0;i< count;i++){
			reVal +=String.fromCharCode(this.int(range)+minCharCode+1);
		}
		return reVal;
	}
}});