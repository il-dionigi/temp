#!/usr/bin/env python
import sys
import json
import requests, json
import random
from wordnik import *

def print_json(type, message):
	print(json.dumps({'type': type, 'message': message}))
	sys.stdout.flush()

def is_ascii(string):
	try:
	    string.decode('ascii')
	except UnicodeDecodeError:
		return False
	except UnicodeEncodeError:
		return False
	else:
		return True

apiUrl = 'http://api.wordnik.com/v4'
args = sys.argv[1].split('|')
apiKey = args[0]
otherLanguage = args[1]
exampleRequested = args[2]

client = swagger.ApiClient(apiKey, apiUrl)

# Get dictionary of conversions from a valid language to 2-char code for translating
headers = {'accept': 'application/json', 'content-type': 'application/json', 'Accept-Charset': 'UTF-8'}
r = requests.get('http://www.transltr.org/api/getlanguagesfortranslate', headers=headers)
lanDict = {}
for lan in r.json():
	lanDict[lan['languageName']] = lan['languageCode']

# Get the 2-char codes for both languages
lan_code_to = lanDict.get(otherLanguage)
lan_code_from = lanDict.get('English')

wordApi = WordApi.WordApi(client)
wordsApi = WordsApi.WordsApi(client)
wordOfTheDay = wordsApi.getWordOfTheDay()

if (exampleRequested): # get an example 'word', 'includeDuplicates', 'useCanonical', 'skip', 'limit'
	wordExamples = wordApi.getExamples(wordOfTheDay.word).examples
#	wordExamples = wordExamples.examples
	exampleSize = len(wordExamples)
	if (exampleSize != 0):
		exampleNum = random.randint(0, exampleSize - 1)
		chosenExample = wordExamples[exampleNum]
		startingNum = exampleNum
	while (True):
		exampleTitle = chosenExample.title
		exampleText = chosenExample.text

		# Verify that the example will display correctly
		if (is_ascii(exampleTitle) and is_ascii(exampleText)):
			print_json("exampleText", exampleText)
			print_json("exampleTitle", exampleTitle)
			break
		else: # Or go onto the next sample in the list
			exampleNum = (exampleNum + 1) % exampleSize
			chosenExample = wordExamples[exampleNum]
			if (exampleNum == startingNum):
				break
	
# Valid language codes found
if (lan_code_to != None and lan_code_from != None):
	translateRequest = 'http://www.transltr.org/api/translate?text=%22' + wordOfTheDay.word + '%22&to=' + lan_code_to + '&from=' + lan_code_from
	r = requests.get(translateRequest, headers=headers)
	translation = (r.json())['translationText']
	print_json("translation", translation)
else:
	print_json("ERROR", "Word of the Day Error: Choose a valid language to translate to")

try:
	#Throws error if it doesn't have a pronunciation
	pronounce = wordApi.getTextPronunciations(wordOfTheDay.word,typeFormat='ahd')[0].raw
	#for example in wordOfTheDay.examples:
		#print example.text
		#print '- ' + example.title + '\n'
except TypeError:
	pronounce = ""

print_json("word", wordOfTheDay.word)
print_json("partOfSpeech", wordOfTheDay.definitions[0].partOfSpeech)
print_json("definition", wordOfTheDay.definitions[0].text)
print_json("origin", wordOfTheDay.note)
print_json("pronounce", pronounce)