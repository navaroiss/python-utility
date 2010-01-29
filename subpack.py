import os, glob
import django.http

def get_subpackages(module):
	dir = os.path.dirname(module.__file__)
	def is_package(d):
		d = os.path.join(dir, d)
		return os.path.isdir(d) and glob.glob(os.path.join(d, '__init__.py*'))
	return filter(is_package, os.listdir(dir))


for item in get_subpackages(django.http):
	print item

