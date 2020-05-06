#!/usr/bin/python

import csv
import pymongo
import datetime
import re

myclient = pymongo.MongoClient("mongodb://admin:covid19season@localhost:27017")
mydb = myclient["covspace"]
countriesdb = mydb["countries"]
coll = mydb["eurostat_population"]

with open('data.csv') as csvfile:
	reader = csv.DictReader(csvfile)
	byCountries = {}
	for row in reader:
		# "TIME","GEO","AGE","SEX","UNIT","Value","Flag and Footnotes"
		# fix for Germany
		if row["GEO"] == "Germany including former GDR":
			row["GEO"] = "Germany"
		if not row["GEO"] in byCountries:
			byCountries[row["GEO"]] = {'total_population': 0, 'lt_twenty_population': 0, 'twenty_sixtyfive_population': 0, 'gt_sixtyfive_population': 0}
		# parse value
		rowIntMatch = re.search('\d', row['Value'])
		if not rowIntMatch:
			continue
		rowValue = int(row['Value'].replace(' ', ''))
		# parse age
		ageMatch = re.search('(\d+) year(|s)', row["AGE"])
		age = -1
		if ageMatch:
			age = int(ageMatch.group(1))
			if age <= 20:
				byCountries[row["GEO"]]['lt_twenty_population'] += rowValue
			elif age >20 and age <= 65:
				byCountries[row["GEO"]]['twenty_sixtyfive_population'] += rowValue
			else:
				byCountries[row["GEO"]]['gt_sixtyfive_population'] += rowValue
		byCountries[row["GEO"]]['total_population'] += rowValue

	print byCountries


	for c in byCountries:
		country = countriesdb.find_one({'country_name': c})
		if country:
			# "TIME","GEO","AGE","SEX","UNIT","Value","Flag and Footnotes"
			# "total_population", "lt_twenty_population", "twenty_sixtyfive_population", "gt_sixtyfive_population"
			dict = { "country_id": country['_id'], "date": datetime.datetime.strptime('2019', '%Y'),
				'total_population': byCountries[c]['total_population'],
				'lt_twenty_population': byCountries[c]['lt_twenty_population'],
				'twenty_sixtyfive_population': byCountries[c]['twenty_sixtyfive_population'],
				'gt_sixtyfive_population': byCountries[c]['gt_sixtyfive_population'] }
			print dict
			x = coll.insert_one(dict)

			print "insert ds for", country['iso_code'], "and", row['TIME'], "totpop:", byCountries[c]['total_population']
