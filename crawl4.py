from html.parser import HTMLParser
from urllib.request import urlopen
from urllib.error import URLError
from urllib import parse
import time
import json


class LinkParser(HTMLParser):

    # This is a function that HTMLParser normally has but we are adding some functionality to it
    def handle_starttag(self, tag, attrs):
        # We are looking for the begining of a link. Links normally look like <a href="www.someurl.com"></a>
        if tag == 'a':
            for (key, value) in attrs:
                if (key == 'href') and (value != "javascript: void 0;") and (value != "javascript:void(0)"):
                    newUrl = parse.urljoin(self.baseUrl, value)
                    # And add it to our colection of links:
                    self.links = self.links + [newUrl]

    # This is a new function that we are creating to get links that our spider() function will call
    def getLinks(self, url):
        self.links = []
		# Clean-up: If the url ends in the top-level domain but fails to have a trailing "/", add that "/". Only works with 3-char top level domains. Can be improved.
        if (url[-4:-3] == "."):
            url = url + "/"
		# Clean-up: If the url doesn't start with an http protocol statement, add it. May cause non http/https protocols to fail
        if (url[:4] != "http"):
            url = "http://" + url
        # Remember the base URL which will be important when creating absolute URLs
        self.baseUrl = url
	    # Access the site.
		# Some sites block rapid fire requests. When this happens, wait out the block.
        waitOut = True
        attempts = 0
        while (attempts < 5) and (waitOut == True):
            attempts = attempts + 1
            # Use the urlopen function from the standard Python 3
            try:
                response = urlopen(url)
                waitOut = False
			# When server cannot be reached, wait 3 seconds on each of up to 5 attempts.
            except URLError as e:
                if hasattr(e, 'reason'):
                    # print('We failed to reach a server.')
                    # print('Reason: ', e.reason)
                    if attempts < 4:
                        time.sleep(3)
                        waitOut = True
                    else:
                        return "",[]
                elif hasattr(e, 'code'):
                    # print('The server couldn\'t fulfill the request.')
                    # print('Error code: ', e.code)
                    waitOut = False
                    return "",[]
        else:
            # Make sure that we are looking at HTML and not other things that
            # are floating around on the internet (such as JavaScript files, CSS, or .PDFs for example)
            if "text/html" in response.getheader("Content-Type"): #NJ edited
                htmlBytes = response.read()
                # Note that feed() handles Strings well, but not bytes (A change from Python 2.x to Python 3.x)
                htmlString = htmlBytes.decode("utf-8")
                self.feed(htmlString)
                return htmlString, self.links
            else:
                return "",[]

# The spiders below (one for breadth first search, another for depth first search) take a URL, a word to find,
# and the number of pages to search through before giving up. They output a dictionary.

# This spider completes a "Breadth First" search.
def breadthSpider(url, word, maxPages):
	traversalDict = {} #dictionary that will contain the output
	pagesToVisit = [url] #nj
	numberVisited = 0
	foundWord = False
    # The main loop. Create a LinkParser and get all the links on the page. Also search the page for the word or string
    # In our getLinks function we return the web page (this is useful for searching for the word)
    # and we return a set of links from that web page (this is useful for where to go next)
	while numberVisited < maxPages and pagesToVisit != [] and not foundWord:
		print("\n conditions: ", numberVisited, pagesToVisit[0], foundWord)
        # Start from the beginning of our collection of pages to visit:
		url = pagesToVisit[0]
		pagesToVisit = pagesToVisit[1:]
		# Test whether page is new or has been visited before.
		visited = False
		for key in traversalDict:
			if key == url:
				visited = True
		# Only visit the page if it is new.
		if visited == False:
			try:
				print(numberVisited, "Visiting:", url)
				parser = LinkParser()
				data, links = parser.getLinks(url)
				if data.find(word)>-1:
					foundWord = True
					# Add the pages that we visited to the end of our collection
					# of pages to visit:
				pagesToVisit = pagesToVisit + links
				# print(" **Success!**")
				traversalDict.update({url: {"children": links, "kw": foundWord}})
				numberVisited = numberVisited +1  #nj --> moved
			except:
				print(" **Failed!**")
	# if foundWord:
		# print("The word", word, "was found at", url)
	# else:
		# print("Word never found")
	return traversalDict

# This is a helper function for a spider that completes Depth first search
def goDeep(word, maxPages, traversalDict, pagesToVisit, numberVisited):
	url = pagesToVisit[len(pagesToVisit)-1]
	pagesToVisit = pagesToVisit[0:(len(pagesToVisit)-2)] #remove url being visited in this iteration
	foundWord = False #IS THIS CREATING A PBM?
	visited = False
	for key in traversalDict:
		if key == url:
			visited = True
	# Only visit the page if it is new.
	if visited == False:
		links = []
		try:
			print(numberVisited, "Visiting:", url)
			parser = LinkParser()
			data, links = parser.getLinks(url)
			if data.find(word)>-1:
				foundWord = True
			pagesToVisit = pagesToVisit + links[::-1]  # Add the pages that we visited in reverse order so that you pop the 1st link in content-order from the top of stack.
			# print(" **Success!**")
			traversalDict.update({url: {"children": links, "kw": foundWord}})
			numberVisited = numberVisited +1
		except:
			print(" **Failed!**")
	while numberVisited < maxPages and pagesToVisit != [] and not foundWord:
		foundWord, traversalDict, pagesToVisit, numberVisited = goDeep(word, maxPages, traversalDict, pagesToVisit, numberVisited)
	#After the branch is explored in full, return traversalList
	return foundWord, traversalDict, pagesToVisit, numberVisited

# Spider that completes a Depth First search.
def depthSpider(url, word, maxPages):
	traversalDict = {} # Build ordered list of pages you've traversed; will be JS w/ parent/child
	pagesToVisit = [url] #nj
	numberVisited = 0
	foundWord = False
	foundWord, traversalDict, pagesToVisit, numberVisited = goDeep(word, maxPages, traversalDict, pagesToVisit, numberVisited)
	# if foundWord:
		# print("The word", word, "was found at", url)
	# else:
		# print("Word never found")
	# print(len(traversalDict))
	# print(len(pagesToVisit))
	return traversalDict

############################

# #BFS
traversalDict = breadthSpider("http://cn.nytimes.com", "coil", 5)

#OUTPUT

#Display url & their info iteratively
# for key, value in traversalDict.items():
	# print(key)
	# print(value)

with open('traversed.json', 'w') as fp:
	json.dump(traversalDict, fp, sort_keys=False, indent=4) #note singular dump
