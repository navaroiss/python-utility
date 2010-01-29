#!/usr/bin/env python
import sys, os, re, urllib2, urllib, sgmllib
from optparse import OptionParser

parser = OptionParser()
parser.add_option('-l', '--link', dest='link', help='What\'s you want to get?')
parser.add_option('-d', '--directory', dest='directory', help='The directory we save the media')
(options, args) = parser.parse_args()

if (options.directory is None) or (options.link is None):
    parser.print_help()
    #parser.print_usage()
    sys.exit()

class FetchLocation(sgmllib.SGMLParser):
    
    def __init__(self, verbose=0):
        self.locations = []
        sgmllib.SGMLParser.__init__(self, verbose)
    
    def parse(self, html):
        self.feed(html)
        self.close()
    
    def start_location(self, attributes):
        pass
    def end_location(self):
        pass
    
    def handle_data(self, data):
        self.locations.append(data)
        
    def get_locations(self):
        return self.locations

def fetch_request(url, data={}, headers={}):
    print "Fetching data from %s "%(url)
    user_agent = 'Mozilla/4.0 (compatible; MSIE 5.5; Windows NT)'
    if headers=={}:
        headers = { 'User-Agent' : user_agent }
    
    try:
        data = urllib.urlencode(data)
        req = urllib2.Request(url)
        response = urllib2.urlopen(req)
    except urllib2.URLError:
        print "Your connection is not available!"
        sys.exit();
        
    redirect_url = response.geturl()
    rs = re.findall('\.swf', redirect_url)
    if len(rs)>=1:
        rs = re.findall('file=(.*)', redirect_url)
        return fetch_request(rs[0])
    return response.read()

print "Starting my mission... "
data = fetch_request(options.link)

#rs = re.findall('swfobject\.embedSWF\("(.*)", "flashPlayerListHolder"', data) or re.findall('swfobject\.embedSWF\("(.*)", "flashPlayerHolder"', data)
rs = re.findall('<param value="http://img1.nhaccuatui.com/Flash/NCTplayer31_L.swf\?file=(.*)" name="movie"/>', data)
#print re.findall('<param value="http://img1.nhaccuatui.com/Flash/NCTplayer31_L.swf\?file=(.*)" name="movie"/>', data)

if len(rs)>=1:
    xmldata = fetch_request(rs[0])
    print "Get elements from Website's response"
    parser = FetchLocation()
    parser.parse(xmldata)
    print "We have %d items" % (len(parser.get_locations()))
    i = 0
    for media in parser.get_locations():
        r = re.findall('http://(.*).nhaccuatui.com', media)
        if len(r)>=1:
            if (media.split('.')[-1] not in ['gif','png','jpg','jpeg', 'swf']):
                i = i + 1
                print "Downloading %d th %s " % (i, media)
                os.system('wget -P %s "%s"' % (options.directory, media))
