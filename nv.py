#!/usr/bin/env python
import os, urllib, urllib2, sgmllib, re
from optparse import OptionParser

from os.

parser = OptionParser()
parser.add_option("-d", "--directory", dest="directory", help="Directory")


def get_response(url, data={}, header={}):
    data = urllib.urlencode(data)
    header = {'Content-Type': 'application/x-www-form-urlencoded'}
    try:
        sock = urllib2.Request(url, data, header)
        response = urllib2.urlopen(sock)
        return response.read()
    except urllib2.HTTPError:
        print "Your connection is broken"

class NhacVui(object):
    
    search_song_playing = '<a title="(.*)"  href="(.*)" target="_blank"><img src="(.*)" width="26" height="32"> Download</a>' 
    search_list_playing = '<a title="(.*)"  href="(.*)" target="_blank"><img src="(.*)" width="18" height="19"></a>' 
    
    directory = "~/Music/"
    host = "http://www4.nhac.vui.vn/"
    
    def __init__(self):
        pass

    def get_a_song(self, song_id):
        song = "Play,%d"%(song_id)
        html = get_response("http://www4.nhac.vui.vn/Music/index.php", {'url':song})
        rs = re.findall(self.search_song_playing, html)
        link = self.host + rs[0][1]
        self.system_wget(link)
    
    def get_album(self, album_id):
        album = "Album,%d" % album_id
        html = get_response("http://www4.nhac.vui.vn/Music/index.php", {'url':album})
        rs = re.findall(self.search_list_playing, html)
        for item in rs:
            link = self.host + "Music/" +  item[1]
            self.system_wget(link)
    
    def system_wget(self, link):
        os.system("wget -P %s %s"%(self.directory, link))
        
if __name__ == "__main__":
    print 
    downloader = NhacVui()
    downloader.get_album(11185)
    

