<?php
require_once dirname(__FILE__).'/config.php';
require_once dirname(__FILE__).'/vendor/autoload.php';

$templates = new League\Plates\Engine('templates');

$dbClient = new MongoDB\Client($mongoDbConnection);
