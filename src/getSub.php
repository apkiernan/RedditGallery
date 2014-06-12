<?php 

$subreddit = $_GET["subreddit"];

if (isset( $_GET['after'] )) {
	$after = $_GET['after'];
}

$reddit = "http://reddit.com/r/{$subreddit}/new.json?count=25&after={$after}";

$getData = file_get_contents($reddit);

echo $getData;


exit;


?>
