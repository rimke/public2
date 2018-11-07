<?php
namespace App\Controllers;

class Controller
{
	protected function http_get($url, $data=null){return $this->http($url, $data, 'get'); }
	protected function http_post($url, $data=null){return $this->http($url, $data, 'post'); }
	private function http($url, $data=[], $type='get', $timeout=5){
		$curl = curl_init();
		$timeout = 5;
		curl_setopt ($curl, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt ($curl, CURLOPT_CONNECTTIMEOUT, $timeout);
		if( $type =='get'){
			if($data){
				if( !strstr($url,'?') ){ $url.="?"; }
				foreach ($data as $k => $v) {$url.="&$k=$v"; }
			}
		}else{
			curl_setopt($curl, CURLOPT_POST, 1);
			curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
		}
		curl_setopt ($curl, CURLOPT_URL, $url);
		$data = curl_exec($curl);
		curl_close($curl);
		return $data;
	}
}