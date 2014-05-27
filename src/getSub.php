<?php 

$subreddit = $_GET["subreddit"];

$page = $_GET["page"];

$url = "http://imgur.com/r/{$subreddit}/page/{$page}.json";

$getData = file_get_contents($url);

echo $getData;


exit;


?>
