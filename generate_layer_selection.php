<?php
error_reporting(E_ALL);

require 'vendor/autoload.php';
require '_include.php';

$layers = $dbClient->covspace->data_entities->find(['show_in_layers' => true])->toArray();

$datasources = $dbClient->covspace->datasources->find(['active' => true])->toArray();

echo $templates->render('layer_selection', ['layers' => $layers, 'datasources' => $datasources]);
