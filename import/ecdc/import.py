#!/usr/bin/python
#

import csv
import pymongo
import datetime
import urllib2
import os
import codecs

response = urllib2.urlopen('https://opendata.ecdc.europa.eu/covid19/casedistribution/csv')
data = response.read()
filename = "data.csv"
file = open(filename, 'wb')
file.write(data)
file.close()
todayDt = datetime.datetime.today()

myclient = pymongo.MongoClient("mongodb://admin:covid19season@localhost:27017")
mydb = myclient["covspace"]
countriesdb = mydb["countries"]
owid = mydb["ecdc"]

with codecs.open('data.csv', 'r', encoding='ascii', errors='ignore') as csvfile:
	reader = csv.DictReader(csvfile)
	for row in reader:
		# dateRep,day,month,year,cases,deaths,countriesAndTerritories,geoId,countryterritoryCode,popData2018,continentExp
		if(row['dateRep'] != todayDt.strftime('%d/%m/%Y')):
			continue

		country = countriesdb.find_one({'iso_code': row['geoId']})
		if country:
			#
			# first put in -1 for no data
			for k,v in enumerate(row):
				if not row[v]:
					row[v] = -1
			# dateRep,day,month,year,cases,deaths,countriesAndTerritories,geoId,countryterritoryCode,popData2018,continentExp
			dict = { "country_id": country['_id'], "date": datetime.datetime.strptime(row['dateRep'], '%d/%m/%Y'),
				'cases': int(row['cases']), 'deaths': int(row['deaths']), 'popData2018': int(row['popData2019']) }
			print dict
			x = owid.insert_one(dict)

			print "inserted ds for", country['iso_code'], "and", row['dateRep']

os.remove('data.csv')
