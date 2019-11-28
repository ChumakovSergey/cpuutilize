from setuptools import setup, find_packages

setup(
    name='cpuutilize',
    version='1.0',
    packages=find_packages(),
    license='MIT',
    author='Sergey Chumakov',
    author_email='weyderman@gmail.com',
    description='Save CPU utilization',
	install_requires=[
		"Django >= 2.2.7",
		"djangorestframework >= 3.10.3",
	],
	include_package_data = True,
	package_data = {
		'static': ['*'],
	}
	
)