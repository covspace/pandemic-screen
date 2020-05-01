<style type="text/css">
#layer_selector_box {
  background-color: #fff;
  border: 2px solid #fff;
  margin-bottom: 20px;
  text-align: center;

  padding: 10px;

  font-size: 16px;

  border: 1px #aaa solid;
}

#layer_selector_box div {
  display: inline;
  margin-left: 10px;
}

#layer_selector_head {
  font-size: 22px;
}

.layer_selector_item {
  cursor: pointer;
  margin-top: 3px;
  margin-bottom: 3px;
}

.layer_selector_item.active {
  border-bottom: 1px solid #f00;
}

.layer_entity_item {
  padding-left: 10px;
}

.layer_entity_item label {
  font-size: 12px !important;
}

.layer_entity_item svg {
  scale: 0.5 !important;
}

#layer_selector_datasource_container
{
  margin-left: 30px;
  border-left: 1px #000 solid;
}
</style>

<div style="display:hidden">
  <div id="layer_selector_box">
    <div id="layer_selector_head">Data</div>
    <div class="layer_selector">
<?php foreach($layers as $l): ?>
    <div id="select-<?=$l["id"]?>" data-value="<?=$l["id"]?>" class="layer_selector_item"><?=$l["name_en"]?></div>
<?php endforeach; ?>
    </div>

    <div id="layer_selector_datasource_container">
      <div>Data Source</div>
      <select id="layer_selector_datasource">
        <?php foreach($datasources as $d): ?>
        <option value="<?=$d["id"]?>"><?=$d["name_en"]?></option>
        <?php endforeach; ?>
      </select>
    </div>
  </div>
</div>
