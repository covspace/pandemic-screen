#!/usr/bin/python
#

import csv
import pymongo
import datetime
import urllib2
import os

# dl
today = datetime.date.today().replace(day=datetime.date.today().day-1).strftime('%m-%d-%Y')
url = 'https://github.com/CSSEGISandData/COVID-19/raw/master/csse_covid_19_data/csse_covid_19_daily_reports/'+today+'.csv'
f = urllib2.urlopen(url)
print "downloading " + url

# Open our local file for writing
with open(os.path.basename(url), "wb") as local_file:
	local_file.write(f.read())

myclient = pymongo.MongoClient("mongodb://admin:covid19season@localhost:27017")
mydb = myclient["covspace"]
countriesdb = mydb["countries"]
owid = mydb["eurostat-population"]

with open(today+'.csv') as csvfile:
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

os.remove(today+'.csv')
