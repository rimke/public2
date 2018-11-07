<?php
// require __DIR__.'/';
require_once( __DIR__."/Controllers/Controller.php" );
$mdl = isset($_GET['m'])?$_GET['m']:'Home';
$cls = isset($_GET['c'])?$_GET['c']:'Index';
$act = isset($_GET['a'])?$_GET['a']:'Index';
$cls .= "Controller";

$ctl = __DIR__."/Controllers/$mdl/$cls.php";
file_exists($ctl) && require_once($ctl);
$cls = "App\\Controllers\\$mdl\\$cls";


if( class_exists($cls) ){
	$class = new $cls();
	$parameter=null;
	$fun=['$1_before', '$1', '$1_after'];
	foreach ($fun as $k => $v) {
		$f = preg_replace("/^(.*)$/im", $v, $act);
		if( method_exists($class, $f) ){
			$ret = call_user_func(array($class, $f), $parameter);
			echo( $ret );
		}
	}
}