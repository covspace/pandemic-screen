<?php
/**
 * Automatic data import
 * 06.05.2020 Sebastian Sitaru
 */

$importScripts = glob('*/import.py');

foreach ($importScripts as $filename)
{
    $dir = dirname($filename);
    $file = basename($filename);
    echo "dir $dir, file $file\n";
    if(is_file($filename))
    {
      chdir($dir);
      system("python $filename", $retArr, $retVal);
      echo "$retArr\n";
    }

}
