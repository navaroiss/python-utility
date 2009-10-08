from distutils.core import setup
import os, os.path

list = []
path = '/home/navaro/dev/py/util/'
for item in os.listdir( os.path.dirname(path) ):
	if os.path.isfile(os.path.join(os.path.dirname(path), item)):
		x = item.split('.py')
		item = x[0]
		list.append( item )
#print list
setup(name='foo', version='1.0', py_modules=['60s','listDir','mididom'])
