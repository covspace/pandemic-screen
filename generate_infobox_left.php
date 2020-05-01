<?php
error_reporting(E_ALL);

require 'vendor/autoload.php';
require '_include.php';

echo $templates->render('info_left', ['dbClient' => $dbClient]);
