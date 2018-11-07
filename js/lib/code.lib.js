ET.extend({code:{
	initialize:function(){
		ET.loadLib('string');
	}
	,codeType:{
		'java':{
			'comment_rule':[
				/\s*\/\*\w*?\*\/\s*/gi // /*.....*/
				,/\s*\/\*[\w\W]*?\*\/\s*/gi  // /* [.\r\n] */
				,/\s*\/\/[^'"\r\n]*/gi // //......
			]
			,'flag_rule':[
				/\s*\<script((\s*[\w\W]*?)|(\>))\<\/script\>\s*/gi
			]
			,'private_char':{}
		}
		,'html':{
			'comment_rule':[
				/\s*\<\!\-\-(.*?)\-\-\>\s*/gi
				,/\s*\<\!\-\-([\W\w]*?)\-\-\>\s*/gi
			]
			,'flag_rule':[
				/\s*(\<[^\>]*?\>)\s*/gi
			]
			,'private_char':{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',' ':'&nbsp;'}
		}
		,'regexp':{
			'comment_rule':[]
			,'flag_rule':[]
			,'private_char':{'\\':"\\\\", '(':"\\(", ')':"\\)", '$':"\\$"
				, '^':"\\^"
				, '*':"\\*"
				, '+':"\\+"
				, '|':"\\|"
				, '.':"\\."
				, '[':"\\["
				, ']':"\\]"
				, '{':"\\{"
				, '}':"\\}"
				, '<':"\\<"
				, '>':"\\>"
			}
		}
	}
	,removeFlag:function(code, type){
		type=type?type.toLowerCase():'java';
		var re = this.codeType[type]?this.codeType[type].flag_rule:null;
		return this.remove(code+'', re); 
	}
	,removeComments:function(code, type){
		type=type?type.toLowerCase():'java';
		var re = this.codeType[type]?this.codeType[type].comment_rule:null;
		return this.remove(code+'', re); 
	}
	,remove:function(code, res){
		if(!res)return code;
		if(!ET.string)return code;
		return ET.string.exclude(code, /\'[^\']*\'/gi, function(code){
			return ET.string.exclude(code, /\"[^\"]*\"/gi, function(code){
				return ET.string.exclude(code, /\/[^\/].*?\/[gi]*/gi, function(code){
					for (var i = 0; i < res.length; i++) {
						code=code.replace(res[i], '');
					}
					return code;
				});
			});
		});

	}
}});