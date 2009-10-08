import re, urllib
from optparse import OptionParser
import os,sys 

def checkOption(parser, options):
    try:
        if options.url != "":
            getMediaURL(options.url)
    except:
        parser.print_usage()

def getMediaURL(url):
    sock = urllib.urlopen(url)
    html = sock.read()
    rs = re.findall('<media src="(.*)" />', html)
    os.system("tput clear")
    try:
        print rs[0]
    except:
        print "URL not found!"
    
parser = OptionParser()
parser.add_option('-u','--url',dest='url',help='URL..')
(options, args) = parser.parse_args()

if __name__ == "__main__":
	checkOption(parser, options)
