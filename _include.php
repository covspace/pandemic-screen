<?php
include 'config.php';

$templates = new League\Plates\Engine('templates');

$dbClient = new MongoDB\Client($mongoDbConnection);
