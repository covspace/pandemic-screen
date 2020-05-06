#!/usr/bin/python

import csv
import pymongo
import datetime

myclient = pymongo.MongoClient("mongodb://admin:covid19season@localhost:27017")
mydb = myclient["covspace"]
cssedb = mydb["cssedb"]
countriesdb = mydb["countries"]



with open('04-24-2020.csv') as csvfile:
	reader = csv.DictReader(csvfile)
	for row in reader:
		# FIPS,Admin2,Province_State,Country_Region,Last_Update,Lat,Long_,Confirmed,Deaths,Recovered,Active,Combined_Key
		country = countriesdb.find_one({'country_name': row['Combined_Key']})
		if country:
			# required: [ "country_id", "confirmed", "deaths", "recovered" ]
			dict = { "country_id": country['_id'], "confirmed": int(row['Confirmed']), "deaths": int(row['Deaths']), "recovered": int(row['Recovered']), "date": datetime.datetime(2020, 04, 24) }
			print dict
			x = cssedb.insert_one(dict)
			print x
