#!/usr/bin/python

import csv
import pymongo
import datetime

myclient = pymongo.MongoClient("mongodb://admin:covid19season@localhost:27017")
mydb = myclient["covspace"]
countriesdb = mydb["countries"]
owid = mydb["eurostat-population"]

with open('data.csv') as csvfile:
	reader = csv.DictReader(csvfile)
	for row in reader:
		# dateRep,day,month,year,cases,deaths,countriesAndTerritories,geoId,countryterritoryCode,popData2018,continentExp
		country = countriesdb.find_one({'iso_code': row['geoId']})
		if country:
			#
			# first put in -1 for no data
			for k,v in enumerate(row):
				if not row[v]:
					row[v] = -1
			# dateRep,day,month,year,cases,deaths,countriesAndTerritories,geoId,countryterritoryCode,popData2018,continentExp
			dict = { "country_id": country['_id'], "date": datetime.datetime.strptime(row['dateRep'], '%d/%m/%Y'),
				'cases': int(row['cases']), 'deaths': int(row['deaths']), 'popData2018': int(row['popData2018']) }
			print dict
			x = owid.insert_one(dict)

			print "inserted ds for", country['iso_code'], "and", row['dateRep']
