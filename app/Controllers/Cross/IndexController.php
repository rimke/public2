<?php
namespace App\Controllers\Cross;
use App\Controllers\Controller;

class IndexController extends Controller
{
	public function index(){
		$url=isset($_GET['url'])?$_GET['url']:null;
		if($url==null)return "";
		return $this->http_get($url);
	}
}