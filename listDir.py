from optparse import OptionParser
import os, os.path

def listDir(path):
	for item in os.listdir(path):
		new_path = os.path.join(path, item)
		if os.path.isdir(new_path):
			listDir(new_path)
		else:
			print new_path

parser = OptionParser()
parser.add_option("-d", "--dir", dest="directory",
		help="list directory", metavar="DIR")

(options, args) = parser.parse_args()
#print options.directory
#print args

if options.directory != '':
	if os.path.isdir( options.directory ):
		listDir( options.directory )


