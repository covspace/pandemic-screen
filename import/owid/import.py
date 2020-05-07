#!/usr/bin/python

import csv
import pymongo
import datetime

import urllib2
import os

# dl
#https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/owid-covid-data.csv
todayDt = datetime.datetime.today()
url = 'https://covid.ourworldindata.org/data/owid-covid-data.csv'
f = urllib2.urlopen(url)
print "downloading " + url

# Open our local file for writing
with open(os.path.basename(url), "wb") as local_file:
	local_file.write(f.read())

myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["covspace"]
countriesdb = mydb["countries"]
owid = mydb["owid"]

with open('owid-covid-data.csv') as csvfile:
	reader = csv.DictReader(csvfile)
	for row in reader:
		# iso_code,location,date,total_cases,new_cases,total_deaths,new_deaths,
		# total_cases_per_million,new_cases_per_million,total_deaths_per_million,
		# new_deaths_per_million,total_tests,new_tests,total_tests_per_thousand,
		# new_tests_per_thousand,tests_units
		country = countriesdb.find_one({'country_name': row['location']})
		if country:
			# required: [ "country_id", "date", "total_cases", "new_cases", "total_deaths",
			# "new_deaths", "total_cases_per_million", "new_cases_per_million",
			# "total_deaths_per_million", "new_deaths_per_million", "total_tests", "new_tests",
			# "total_tests_per_thousand","new_tests_per_thousand", "tests_units" ],
			# only import most recent date
			if(row['date'] != todayDt.strftime('%Y-%m-%d')):
				continue

			# first put in -1 for no data
			for k,v in enumerate(row):
				if not row[v]:
					row[v] = -1

			dict = { "country_id": country['_id'], "date": datetime.datetime.strptime(row['date'], '%Y-%m-%d'),
				'total_cases': int(row['total_cases']), 'new_cases': int(row['new_cases']), 'total_deaths': int(row['total_deaths']),
				'new_deaths': int(row['new_deaths']), 'total_cases_per_million': float(row['total_cases_per_million']), 'new_cases_per_million': float(row['new_cases_per_million']),
				'total_deaths_per_million': float(row['total_deaths_per_million']), 'new_deaths_per_million': float(row['new_deaths_per_million']),
				'total_tests': float(row['total_tests']), 'new_tests': float(row['new_tests']), 'total_tests_per_thousand': float(row['total_tests_per_thousand']),
				'new_tests_per_thousand': float(row['new_tests_per_thousand']), 'tests_units': str(row['tests_units']) }
			print dict
			x = owid.insert_one(dict)
			#print x

os.remove('owid-covid-data.csv')
