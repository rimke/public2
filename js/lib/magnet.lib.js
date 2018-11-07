/*
*
*	磁力链接 Magnet links Beta 1.0.0.1
*	Release date: 
*	Author		: 半条虫(466814195)
*	Keywords	: Etsoftware 半条虫(466814195) rimke 39doo 39度
*	Description	: 本脚本功能由EtSoftWare团队研发，仅供学习不得用于商业用途。
*	Blog		: http://rimke.blog.163.com/		
*	Website		: http://www.39doo.com/
*	Mail		: rimke@163.com
*	Copyright	: Power By Etsoftware
* 	Docs:
* 		http://www.infobt.net/about?cid=44
* 		https://blog.csdn.net/cony_14/article/details/50888073
*/
ET.extend({magnet:{
	initialize:function(){
	}
	,create:function(){
		var obj={
			'dn':''//（显示名称）- 文件名
			,'xl':0//（绝对长度）- 文件字节数
			,'xt':''//（eXact Topic）- 包含文件散列函数值的URN
			,'as':''//（可接受来源） - 在线文件的网络链接
			,'xs':''// （绝对资源）- P2P链接
			,'kt':''//（关键字）- 用于搜索的关键字
			,'mt':''//（文件列表）- 链接到一个包含磁力链接的元文件 (MAGMA - MAGnet MAnifest）
			,'tr':''//（Tracker地址）- BT下载的Tracker URL
		};
		$.extend(obj, this.fn);
		return obj;
	}
	,fn:{
		//获取磁力连接
		getMagnetLinks:function(){
			var ml='magnet:?';
			return ml;
		}
	}
}});