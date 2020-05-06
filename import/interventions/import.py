#!/usr/bin/python

import csv
import pymongo
import datetime 

myclient = pymongo.MongoClient("mongodb://admin:covid19season@localhost:27017")
mydb = myclient["covspace"]
mycol = mydb["interventions"]
countriesdb = mydb["countries"]



with open('interventions.csv') as csvfile:
	reader = csv.DictReader(csvfile)
	for row in reader:
		# id,Country,iso3,Region,Date,Measure_L1,Measure_L2,Measure_L3,Measure_L4,Comment,Source
		country = countriesdb.find_one({'country_name': row['Country']})
		if country:
			dict = { "id": row['id'], "country_id": country['_id'], "date": datetime.datetime.strptime(row['Date'], '%d/%m/%Y'), "measure_l1": row['Measure_L1'], "measure_l2": row['Measure_L2'], "measure_l3": row['Measure_L3'], "measure_l4": row['Measure_L4'], "source": row['Source'] }
			print dict
			x = mycol.insert_one(dict)
			print x
