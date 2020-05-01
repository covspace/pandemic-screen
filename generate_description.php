<div>
<?php
error_reporting(E_ALL);

require 'vendor/autoload.php';
require '_include.php';

try
{
	$db = $dbClient->covspace;
	$rq_dataSource = $_REQUEST["dataSource"];
	$rq_id = $_REQUEST["id"];
	$rq_countryId = $_REQUEST["countryId"];

	$country = $db->countries->findOne(['_id'=> new \MongoDB\BSON\ObjectId($rq_countryId)]);
	//$ds = $db->datasources->findOne([ 'id' => $rq_dataSource ]);
	$dss = $db->datasources->find()->toArray();

	echo "<h1>".$country['country_name']."</h1>";

	foreach($dss as $ds)
	{
		echo "<div>Data Source: ".$ds["name_en"]."</div>";
		$dsId = $ds['id'];
		$entry = $db->$dsId->findOne([ 'country_id' => new MongoDB\BSON\ObjectId($rq_countryId) ]);
		if($entry != null)
		{
			echo "<ul>";
			foreach($ds["data_entities"] as $de)
			{
				$globalDe = $db->data_entities->findOne([ '_id' => $de['entity_id'], 'show_in_detail' => true ]);
				if($globalDe != null)
				{
					echo "<li>".$globalDe['id']." (".$de["this_id"]."): ".$entry[$de["this_id"]]."</li>";
				}

			}
			echo "</ul>";
		} else {
			echo "no data";
		}


	}


}
catch(Throwable $t)
{
	$msg = $t->__toString();
}

?>
</div>
