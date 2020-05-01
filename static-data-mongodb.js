db.createCollection("countries", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: [ "country_name", "iso_code", "lat", "lng" ],
         properties: {
            country_name: {
               bsonType: "string"
            },
            iso_code: {
               bsonType: "string",
            },
            lat: {
               bsonType: "double",
            },
            lng: {
               bsonType: "double",
            },
         }
      }
   }
})

db.createCollection("regions", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: [ "name", "country_id", "lat", "lng" ],
         properties: {
            name: {
               bsonType: "string"
            },
            country_id: {
               bsonType: "objectId",
            },
            lat: {
               bsonType: "double",
            },
            lng: {
               bsonType: "double",
            },
         }
      }
   }
})

db.createCollection("datasources", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: [ "id", "name_en", "data_entities"],
         properties: {
            id: {
               bsonType: "string",
            },
            name_en: {
               bsonType: "string",
            },
            data_entities: {
               bsonType: "array",
			   uniqueItems: true,
			   minItems: 1,
			   items: {
				   bsonType: ["object"],
				   required: ["entity_id", "this_id", "name_en", "type"],
				   properties: {
					   entity_id: {
						   bsonType: "objectId",
					   },
             this_id: {
               bsonType: "string",
             },
					   name_en: {
						   bsonType: "string",
					   },
					   type: {
						   enum: ["int", "double", "string", "objectId"]
					   }
				   }
			   }

            },
         }
      }
   }
})

db.createCollection("data_entities", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: [ "id", "name_en", "show_in_layers", "show_in_detail" ],
         properties: {
            id: {
               bsonType: "string",
            },
            name_en: {
               bsonType: "string",
            },
            show_in_layers: {
              bsonType: "bool",
            },
            show_in_detail: {
              bsonType: "bool",
            }
			   }
      }
   }
})


db.createCollection("static_country_data", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: [ "country_id", "date", "content" ],
         properties: {
            country_id: {bsonType: "objectId"}, date: {bsonType: "date" },content: {bsonType: "string"}}}
   }
})

db.createCollection("cssedb", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: [ "country_id", "date", "confirmed", "deaths", "recovered" ],
         properties: {
            country_id: {
               bsonType: "objectId"
            },
            date: {
 				       bsonType: "date"
 			      },
            confirmed: {
               bsonType: "int",
            },
            deaths: {
               bsonType: "int",
            },
            recovered: {
               bsonType: "int",
            },
         }
      }
   }
})


// iso_code,location,date,total_cases,new_cases,total_deaths,new_deaths,total_cases_per_million,new_cases_per_million,total_deaths_per_million,new_deaths_per_million,total_tests,new_tests,total_tests_per_thousand,new_tests_per_thousand,tests_units
db.createCollection("owid", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: [ "country_id", "date", "total_cases", "new_cases", "total_deaths", "new_deaths", "total_cases_per_million", "new_cases_per_million", "total_deaths_per_million", "new_deaths_per_million", "total_tests", "new_tests", "total_tests_per_thousand","new_tests_per_thousand", "tests_units" ],
         properties: {
            country_id: {
               bsonType: "objectId"
            },
			     date: {
				       bsonType: "date"
			      },
            total_cases: {
               bsonType: "int",
            },
            new_cases: {
               bsonType: "int",
            },
            total_deaths: {
               bsonType: "int",
            },
			new_deaths: {
               bsonType: "int",
            },
			total_cases_per_million: {
               bsonType: "double",
            },
			new_cases_per_million: {
               bsonType: "double",
            },
			total_deaths_per_million: {
               bsonType: "double",
            },
			new_deaths_per_million: {
               bsonType: "double",
            },
			total_tests: {
               bsonType: "double",
            },
			new_tests: {
               bsonType: "double",
            },
			total_tests_per_thousand: {
               bsonType: "double",
            },
			new_tests_per_thousand: {
               bsonType: "double",
            },
			tests_units: {
               bsonType: "string",
            },
         }
      }
   }
})

// dateRep,day,month,year,cases,deaths,countriesAndTerritories,geoId,countryterritoryCode,popData2018
db.createCollection("ecdc", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: [ "country_id", "date", "cases", "deaths", "popData2018" ],
         properties: {
            country_id: {
               bsonType: "objectId"
            },
            date: {
               bsonType: "date"
            },
            cases: {
               bsonType: "int",
            },
            deaths: {
               bsonType: "int",
            },
            popData2018: {
               bsonType: "int",
            },
         }
      }
   }
})

// "TIME","GEO","AGE","SEX","UNIT","Value","Flag and Footnotes"
db.createCollection("eurostat_population", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: [ "country_id", "date", "total_population", "lt_twenty_population", "twenty_sixtyfive_population", "gt_sixtyfive_population" ],
         properties: {
            country_id: {
               bsonType: "objectId"
            },
            date: {
               bsonType: "date"
            },
            total_population: {
               bsonType: "int",
            },
            lt_twenty_population: {
               bsonType: "int",
            },
            twenty_sixtyfive_population: {
               bsonType: "int",
            },
            gt_sixtyfive_population: {
               bsonType: "int",
            },
         }
      }
   }
})

// 		# Country;date;cumulative_incidence_per_tthousand;num_cases;new_cases;new_cases_per_thousand;
//		# current_hospitalized;num_hospital_days_per_case;add_num_curr_hosp;currrent_hosp_per_tthousand;
//		# perc_current_hospitalized_of_cases;perc_cumulative_hosp_of_cases;num_current_icu;num_cumulative_icu;
//		# num_icu_days_per_case;change_num_current_icu;current_icu_per_tthousand;perc_current_icu_of_cases;
//		# perc_current_icu_of_current_hosp_cases;perc_current_icu_of_cumulative_hosp_cases;num_current_resp;resp_days_per_case
db.createCollection("icu_tub", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: [ "country_id", "date" ],
         properties: {
            country_id: { bsonType: "objectId" },
            date: { bsonType: "date" },
            num_cases:{ bsonType: "int" },
            cumulative_incidence_per_tthousand: { bsonType: "double" },
            new_cases: { bsonType: "int" },
            new_cases_per_thousand: { bsonType: "double" },
            current_hospitalized: { bsonType: "int" },
            num_hospital_days_per_case: { bsonType: "double" },
            new_num_curr_hosp: { bsonType: "int" },
            current_hosp_per_tthousand: { bsonType: "double" },
            perc_current_hospitalized_of_cases: { bsonType: "double" },
            perc_cumulative_hosp_of_cases: { bsonType: "double" },
            num_current_icu: { bsonType: "int" },
            num_cumulative_icu: { bsonType: "int" },
            num_icu_days_per_case: { bsonType: "double" },
            change_num_current_icu: { bsonType: "int" },
            current_icu_per_tthousand: { bsonType: "double" },
            perc_current_icu_of_cases: { bsonType: "double" },
            perc_current_icu_of_current_hosp_cases: { bsonType: "double" },
            perc_current_icu_of_cumulative_hosp_cases: { bsonType: "double" },
            num_current_resp: { bsonType: "int" },
            resp_days_per_case: { bsonType: "double" },
         }
      }
   }
})

// static data
db.data_entities.insert({
  id: 'total_cases',
  name_en: 'Total Cases'
});
db.data_entities.insert({
  id: 'total_deaths',
  name_en: 'Total Deaths'
});
db.data_entities.insert({
  id: 'total_recovered',
  name_en: 'Total Recovered',
});
db.data_entities.insert({
  id: 'total_tests',
  name_en: 'Total Tests',
  active: false
});
db.data_entities.insert({
  id: 'new_tests',
  name_en: 'New Tests',
  active: false
});
db.data_entities.insert({
  id: 'new_cases',
  name_en: 'New Cases',
  active: false
});
db.data_entities.insert({
  id: 'new_deaths',
  name_en: 'New Deaths',
  active: false
});

db.data_entities.insert({
  id: 'total_population',
  name_en: 'Population',
  show_in_detail: true,
  show_in_layers: true,
});
db.data_entities.insert({
  id: 'lt_twenty_population',
  name_en: '<20 yr population',
  show_in_detail: true,
  show_in_layers: false,
});
db.data_entities.insert({
  id: 'twenty_sixtyfive_population',
  name_en: '20-65 yr population',
  show_in_detail: true,
  show_in_layers: false,
});
db.data_entities.insert({
  id: 'gt_sixtyfive_population',
  name_en: '>65 yr population',
  show_in_detail: true,
  show_in_layers: false,
});

db.data_entities.insert({
  id: 'current_hospitalized',
  name_en: 'currently hospitalized',
  show_in_detail: true,
  show_in_layers: false,
});
db.data_entities.insert({
  id: 'num_hospital_days_per_case',
  name_en: 'hospital days/case',
  show_in_detail: true,
  show_in_layers: false,
});
db.data_entities.insert({
  id: 'num_current_icu',
  name_en: 'ICU patients',
  show_in_detail: true,
  show_in_layers: false,
});
db.data_entities.insert({
  id: 'num_icu_days_per_case',
  name_en: 'ICU days/case',
  show_in_detail: true,
  show_in_layers: false,
});
db.data_entities.insert({
  id: 'change_num_current_icu',
  name_en: 'change ICU patients',
  show_in_detail: true,
  show_in_layers: false,
});
db.data_entities.insert({
  id: 'perc_current_icu_of_cases',
  name_en: '% ICU of cases',
  show_in_detail: true,
  show_in_layers: false,
});

db.datasources.insert({
	id: 'cssedb',
	name_en: 'John Hopkins CSSE',
	data_entities: [
		{entity_id: ObjectId("5ea48ba8174b45b4e1cd87fa"), this_id: "confirmed", name_en: "Confirmed Cases", type: "int"},
		{entity_id: ObjectId("5ea48ba8174b45b4e1cd87fb"), this_id: "deaths", name_en: "Deaths", type: "int"},
		{entity_id: ObjectId("5ea48ba9174b45b4e1cd87fc"), this_id: "recovered", name_en: "Recovered", type: "int"},
	]
})
// total_cases,new_cases,total_deaths,new_deaths,total_cases_per_million,new_cases_per_million
// total_deaths_per_million,new_deaths_per_million,total_tests,new_tests,total_tests_per_thousand
// new_tests_per_thousand,tests_units
db.datasources.insert({
	id: 'owid',
	name_en: 'Our World in Data',
	data_entities: [
		{entity_id: ObjectId("5ea48ba8174b45b4e1cd87fa"), this_id: "total_cases", name_en: "Total Cases", type: "int"},
		{entity_id: ObjectId("5ea48ba8174b45b4e1cd87fb"), this_id: "total_deaths", name_en: "Total Deaths", type: "int"},
    {entity_id: ObjectId("5ea48c57174b45b4e1cd87fe"), this_id: "total_tests", name_en: "Total Tests", type: "int"},
	]
})

// dateRep,day,month,year,cases,deaths,countriesAndTerritories,geoId,countryterritoryCode,popData2018,continentExp
db.datasources.insert({
	id: 'ecdc',
	name_en: 'European CDC',
	data_entities: [
		{entity_id: ObjectId("5ea48ba8174b45b4e1cd87fa"), this_id: "cases", name_en: "Total Cases", type: "int"},
		{entity_id: ObjectId("5ea48ba8174b45b4e1cd87fb"), this_id: "deaths", name_en: "Total Deaths", type: "int"},
	]
})

// "total_population", "lt_twenty_population", "twenty_sixtyfive_population", "gt_sixtyfive_population"
db.datasources.insert({
	id: 'eurostat_population',
	name_en: 'Eurostat Population',
	data_entities: [
		{entity_id: ObjectId("5ea5cb0082c622e04eb2911e"), this_id: "total_population", name_en: "Total Population", type: "int"},
		{entity_id: ObjectId("5ea5cb0082c622e04eb2911f"), this_id: "lt_twenty_population", name_en: "<20 yr population", type: "int"},
    {entity_id: ObjectId("5ea5cb0082c622e04eb29120"), this_id: "twenty_sixtyfive_population", name_en: "20-65 yr population", type: "int"},
    {entity_id: ObjectId("5ea5cb0082c622e04eb29121"), this_id: "gt_sixtyfive_population", name_en: ">65 yr population", type: "int"},
	]
})

// num_cases, current_hospitalized, num_hospital_days_per_case, num_current_icu, num_icu_days_per_case
// change_num_current_icu, perc_current_icu_of_cases
db.datasources.insert({
	id: 'icu_tub',
	name_en: 'TU Berlin ICU data',
	data_entities: [
		{entity_id: ObjectId("5ea48ba8174b45b4e1cd87fa"), this_id: "num_cases", name_en: "Total Cases", type: "int"},
		{entity_id: ObjectId("5ea604ea786ed17f20e1dc72"), this_id: "current_hospitalized", name_en: "Currently Hospitalized", type: "int"},
    {entity_id: ObjectId("5ea604ea786ed17f20e1dc73"), this_id: "num_hospital_days_per_case", name_en: "Hospital days/case", type: "double"},
    {entity_id: ObjectId("5ea604ea786ed17f20e1dc74"), this_id: "num_current_icu", name_en: "Current ICU patients", type: "int"},
    {entity_id: ObjectId("5ea604ea786ed17f20e1dc75"), this_id: "num_icu_days_per_case", name_en: "ICU days/case", type: "double"},
    {entity_id: ObjectId("5ea604ea786ed17f20e1dc76"), this_id: "change_num_current_icu", name_en: "Change ICU days", type: "int"},
    {entity_id: ObjectId("5ea604eb786ed17f20e1dc77"), this_id: "perc_current_icu_of_cases", name_en: "% current ICU of cases", type: "double"},
	]
})
