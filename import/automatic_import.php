<?php
/**
 * Automatic data import
 * 06.05.2020 Sebastian Sitaru
 */
require_once dirname(__FILE__).'/../'.'_include.php';

$importScripts = glob('*/import.py');

print_r($importScripts);
