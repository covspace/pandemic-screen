#!/usr/bin/python

import csv
import pymongo
import datetime
import urllib2
import os

# dl
todayDt = datetime.date.today().replace(day=datetime.date.today().day-1)
today = todayDt.strftime('%m-%d-%Y')
url = 'https://github.com/CSSEGISandData/COVID-19/raw/master/csse_covid_19_data/csse_covid_19_daily_reports/'+today+'.csv'
f = urllib2.urlopen(url)
print "downloading " + url

# Open our local file for writing
with open(os.path.basename(url), "wb") as local_file:
	local_file.write(f.read())


myclient = pymongo.MongoClient("mongodb://admin:covid19season@localhost:27017")
mydb = myclient["covspace"]
cssedb = mydb["cssedb"]
countriesdb = mydb["countries"]



with open(today+'.csv') as csvfile:
	reader = csv.DictReader(csvfile)
	for row in reader:
		# FIPS,Admin2,Province_State,Country_Region,Last_Update,Lat,Long_,Confirmed,Deaths,Recovered,Active,Combined_Key
		country = countriesdb.find_one({'country_name': row['Combined_Key']})
		if country:
			# required: [ "country_id", "confirmed", "deaths", "recovered" ]
			dict = { "country_id": country['_id'], "confirmed": int(row['Confirmed']), "deaths": int(row['Deaths']), "recovered": int(row['Recovered']), "date": todayDt }
			print dict
			x = cssedb.insert_one(dict)
			print x

os.remove(today+'.csv')
