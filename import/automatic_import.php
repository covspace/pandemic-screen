<?php
/**
 * Automatic data import
 * 06.05.2020 Sebastian Sitaru
 */

$importScripts = glob('*/import.py');

foreach ($importScripts as $filename) {
    echo "$filename<br>";
}
