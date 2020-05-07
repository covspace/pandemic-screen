#!/usr/bin/python

import csv
import pymongo

myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["covspace"]
mycol = mydb["countries"]



with open('countries.csv') as csvfile:
	reader = csv.DictReader(csvfile)
	for row in reader:
		# country,latitude,longitude,name
		if(row['latitude'] and row['longitude']):
			dict = { "iso_code": row['country'], "country_name": row['name'], "lat": float(row['latitude']), "lng": float(row['longitude']) }
			print dict
			x = mycol.insert_one(dict)
			print x
