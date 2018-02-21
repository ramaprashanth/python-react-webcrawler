from html.parser import HTMLParser
from urllib.request import urlopen
from urllib import parse
import json


class LinkParser(HTMLParser):

    # This is a function that HTMLParser normally has
    # but we are adding some functionality to it
    def handle_starttag(self, tag, attrs):
        # We are looking for the begining of a link. Links normally look
        # like <a href="www.someurl.com"></a>
        if tag == 'a':
            for (key, value) in attrs:
                if key == 'href':
                    newUrl = parse.urljoin(self.baseUrl, value)
                    # And add it to our colection of links:
                    self.links = self.links + [newUrl]

    # This is a new function that we are creating to get links
    # that our spider() function will call
    def getLinks(self, url):
        self.links = []
        # Remember the base URL which will be important when creating
        # absolute URLs
        self.baseUrl = url
        # Use the urlopen function from the standard Python 3 library
        response = urlopen(url)
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

# And finally here is our spider. It takes in an URL, a word to find,
# and the number of pages to search through before giving up
#
#This spider completes a "Breadth First" search.
#
#nj --> need to make an ordered list of pages you've traversed
# --> need to export linked list as javascript struct with info on parents/children
# --> checks that a page is new (skip it if already visited).
#
def breadthSpider(url, word, maxPages):
	#traversalList = [url] #nj --> build ordered list of pages you've traversed; will be JS w/ parent/child
	#traversalList = [] #nj --> build ordered list of pages you've traversed; will be JS w/ parent/child
	traversalDict = {} #nj --> build ordered list of pages you've traversed; will be JS w/ parent/child
	pagesToVisit = [url] #nj
	numberVisited = 0
	foundWord = False
    # The main loop. Create a LinkParser and get all the links on the page.
    # Also search the page for the word or string
    # In our getLinks function we return the web page
    # (this is useful for searching for the word)
    # and we return a set of links from that web page
    # (this is useful for where to go next)
	while numberVisited < maxPages and pagesToVisit != [] and not foundWord:
		print("\n conditions: ", numberVisited, pagesToVisit[0], foundWord)
        # Start from the beginning of our collection of pages to visit:
		url = pagesToVisit[0]
		pagesToVisit = pagesToVisit[1:]
		#nj --> test whether page is new or has been visited before.
		visited = False
		for key in traversalDict:
			if key == url:
				visited = True
		#nj --> only visit the page if it is new.
		if visited == False:
			numberVisited = numberVisited +1  #nj --> moved from above
			try:
				print(numberVisited, "Visiting:", url)
				parser = LinkParser()
				data, links = parser.getLinks(url)
				if data.find(word)>-1:
					foundWord = True
					# Add the pages that we visited to the end of our collection
					# of pages to visit:
				pagesToVisit = pagesToVisit + links
				print(" **Success!**")
			except:
				print(" **Failed!**")
			traversalDict.update({url: {"children": links, "keyword": foundWord}})
	if foundWord:
		print("The word", word, "was found at", url)
	else:
		print("Word never found")
	return traversalDict

traversalDict = breadthSpider("http://www.nytimes.com/", "coil", 2)
#depthSpider("http://www.nytimes.com/", "coil", 2)

#Display url & their info iteratively
# for key, value in traversalDict.items():
	# print(key)
	# print(value)

with open('traversed.json', 'w') as fp:
	json.dump(traversalDict, fp, sort_keys=False, indent=4) #note singular dump
