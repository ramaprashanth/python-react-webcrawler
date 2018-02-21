
# Description: Crawls the web from a starting url for a var number of pages or until
# a stop word is encountered. Returns a JSON file listing visited pages, their parent-child
# relationships, and whether they contain the stop word.
#
# Built to function in Flask with Python 3.x.
# Import from libraries: flask, html.parser, urllib, json
#
# Authorship and dates are provided by version control.
# Credit for 3rd party code is provided in the body of the code.

from flask import Flask

# to read cookies sent to server
from flask import request

# to store cookies and send back as response object
from flask import make_response

# Crawler Dependencies
from html.parser import HTMLParser # to isolate links in a web page's HTML
from urllib.request import urlopen # to access a web page
from urllib import parse
import json # to build JSON output

from flask_cors import CORS, cross_origin # to bypass CORS

app = Flask(__name__)
CORS(app) # enables CORS support on all routes


# This is the route that corresponds to <website.com/>
# it will use the function definition below as it's primary script
# whatever it returns, will be displayed on the page, but this is
# only used for testing purposes.  We'll be sending back JSON
# TODO: Send JSON with Flask to client
@app.route("/")

#  This function will render values from the cookie.
#  specificaly the value of 'username'.  Otherwise it will say not set
def index():
	return 'Hello world'


@app.route('/about')
def about():
	return 'The about page'


@app.route('/add')
def add():
	# This program adds two numbers

	num1 = 1.5
	num2 = 6.3

	# Add two numbers
	sum = float(num1) + float(num2)

	# Display the sum
	print('The sum of {0} and {1} is {2}'.format(num1, num2, sum))
	return str(sum)

@app.route('/crawler', methods=['POST'])
# And finally here is our spider. It takes in an URL, a word to find,
# and the number of pages to search through before giving up
def startSpider():

	#searchType = "breadth" #vs. "depth"

	startUrl = request.form['startUrl']
	keyword = request.form['keyword']
	maxPages = int(request.form['maxPages'])

	searchType = request.form['searchType']
	parameters = [startUrl, keyword, maxPages, searchType]
	# use cookies.get(key) instead of cookies[key] to not get a
	# KeyError if the cookie is missing
	print("\nHello, your cookie has been received")
	print("Your parameters are in the format of: ")
	print("[startUrl, keyword, maxPages, searchType]")
	print(parameters)
	print("\n")

	# PARSING TOOL
	# We are going to create a class called LinkParser that inherits some
	# methods from HTMLParser which is why it is passed into the definition
	## Credit: from http://www.netinstructions.com/how-to-make-a-web-crawler-in-under-50-lines-of-python-code/ -->
	## TO DO: crawler fails to read urls that don't start with www. Fix this.
	## TO DO: crawler fails to read some content without IO-specific preset. Fix this. For example on Nathalie's Windows 7, need to type chcp 65001 command line
	## before running code (see http://stackoverflow.com/questions/25127935/unicodeencodeerror-charmap-codec-cant-encode-character-problems

	class LinkParser(HTMLParser):

		# This is a function that HTMLParser normally has but we are adding some functionality to it
		def handle_starttag(self, tag, attrs):
			# We are looking for the begining of a link. Links normally look
			# like <a href="www.someurl.com"></a>
			if tag == 'a':
				for (key, value) in attrs:
					if key == 'href':
						# We are grabbing the new URL. We are also adding the
						# base URL to it. For example:
						# www.netinstructions.com is the base and
						# somepage.html is the new URL (a relative URL)
						#
						# We combine a relative URL with the base URL to create
						# an absolute URL like:
						# www.netinstructions.com/somepage.html
						newUrl = parse.urljoin(self.baseUrl, value)
						# And add it to our colection of links:
						self.links = self.links + [newUrl]

		# This is a new function that we are creating to get links
		# that our spider() function will call
		def getLinks(self, startUrl):
			self.links = []
			# Remember the base URL which will be important when creating
			# absolute URLs
			self.baseUrl = startUrl
			# Use the urlopen function from the standard Python 3 library
			response = urlopen(startUrl)
			# Make sure that we are looking at HTML and not other things that
			# are floating around on the internet (such as
			# JavaScript files, CSS, or .PDFs for example)
			##if response.getheader('Content-Type')=='text/html':
			if "text/html" in response.getheader("Content-Type"): #NJ edited
				htmlBytes = response.read()
				# Note that feed() handles Strings well, but not bytes
				# (A change from Python 2.x to Python 3.x)
				htmlString = htmlBytes.decode("utf-8")
				self.feed(htmlString)
				return htmlString, self.links
			else:
				return "",[]

	# BREADTHSPIDER
	# The breadthSpider takes in an URL, a word to find, and the number of pages to search through before giving up
	# It conducts a "Breadth First" search for the word. It returns a JSON file listing the pages that were
	# visited, their child-links, and whether or not they contain the target word. Only 1 page may contain the
	# word since encountering the word ends the search. The crawler does not visit a page twice.
	## Credit: Minor changes to http://www.netinstructions.com/how-to-make-a-web-crawler-in-under-50-lines-of-python-code/
	# TO DO: check that a page is only visited once

	def breadthSpider(url, keyword, maxPages):
		traversalDict = {} # Modification --> build a dictionary of pages you've traversed;
		pagesToVisit = [url] # Modification
		numberVisited = 0
		foundWord = False
		links = []
		# The main loop. Create a LinkParser and get all the links on the page. Also search the page for the word or string
		# In our getLinks function we return the web page (this is useful for searching for the word)
		# and we return a set of links from that web page (this is useful for where to go next)
		while numberVisited < maxPages and pagesToVisit != [] and not foundWord:
			#print("\n conditions: ", numberVisited, pagesToVisit[0], foundWord)
			# Start from the beginning of our collection of pages to visit:
			url = pagesToVisit[0]
			pagesToVisit = pagesToVisit[1:]
			# Modification --> test whether page is new or has been visited before.
			visited = False
			for key in traversalDict:
				if key == url:
					visited = True
			# Modification --> only visit the page if it is new.
			if visited == False:
				numberVisited = numberVisited +1  # Modification --> moved from above
				try:
					print(numberVisited, "Visiting:", url)
					parser = LinkParser()
					data, links = parser.getLinks(url)
					if data.find(keyword)>-1:
						foundWord = True
						# Add the pages that we visited to the collection of pages to visit:
					pagesToVisit = pagesToVisit + links
					print(" **Success!**")
				except:
					print(" **Failed!**")
			traversalDict.update({url: {"children": links, "keyword": foundWord}})
		if foundWord:
			print("The keyword", keyword, "was found at", url)
		else:
			print("Word never found")
		return traversalDict

	# # DEPTHSPIDER: HELPER
	# # Here is a helper function for a spider that completes Depth first search
	# def goDeep(url, keyword, maxPages, numberVisited, traversalList):
		# # One goal is to collect the links on this page -- ie to fill this array
		# links = []
		# # nj --> Check whether or not the page was previously visited
		# visited = False
		# for i in range(0,len(traversalList)):
			# if traversalList[i] == url:
				# visited = True
		# # nj --> only visit the page if it is new.
		# if visited == False:
			# numberVisited = numberVisited +1  #nj --> moved from above
			# traversalList[numberVisited] = url	#nj --> update the traversal list by appending to it the current url
			# try:
				# print(numberVisited, "Visiting:", url)
				# parser = LinkParser()
				# data, links = parser.getLinks(url)
				# if data.find(keyword)>-1:
					# foundWord = True
					# # Add the pages that we visited to the end of our collection
					# # of pages to visit:
					# pagesToVisit = pagesToVisit + links
					# print(" **Success!**")
			# except:
				# print(" **Failed!**")
		# while numberVisited < maxPages and links != [] and not foundWord:
			# url = links[0]
			# links = links[1:]
			# numberVisited, foundWord, traversalList = goDeep(url, keyword, maxPages, numberVisited, traversalList)
		# #After the branch is explored in full, return traversalList
		# return numberVisited, foundWord, traversalList

	# # DEPTHSPIDER
	# # Here is a spider that completes a Depth First search.
	# def depthSpider(url, keyword, maxPages):
		# numberVisited = 0
		# traversalList = []
		# numberVisited, foundWord, traversalList = goDeep(url, keyword, maxPages, numberVisited, traversalList)
		# if foundWord:
			# print("The keyword", keyword, "was found at", url)
		# else:
			# print("Word never found")

	# COMMAND THE CRAWLER TO BEGIN
	# Crawl the web and build a dictionary of website information. Each line contains the name of about
	# a site, a list of its child-links, and whether or not the site contains the stop keyword.
	if searchType == "BFS":
		print("Spider is starting a breadth search from url: " + str(startUrl) + " and searching for keyword: " + str(keyword) + " with " + str(maxPages) + " max pages.\n")
		traversalDict = breadthSpider(startUrl, keyword, maxPages)
	elif searchType == "DFS":
		print("Not implemented yet.\n")
		#print("Spider is starting a depth search from url: " + str(url) + " and searching for keyword: " + str(keyword) + " with " + str(maxPages) + " max pages.\n")
		#traversalDict = depthSpider(url, keyword, maxPages)
	else:
		print("The spider needs to receive a valid search type: " + str(searchType) + " is neither 'depth' nor 'breadth'.\n")
	print("Crawling is complete\n")

	# GENERATE OUTPUT
	# Write the results from the crawl, which are saved in traversalDict, in JSON format and into a local file.
	# TO DO: send file to UI
	#with open('traversed.json', 'w') as fp:
	#	json.dump(traversalDict, fp, sort_keys=False, indent=4) #note singular dump

	return json.dumps(traversalDict, sort_keys=False, indent=4)

if __name__ == "__main__":
	app.run()
