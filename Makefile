test: generateProject testProject clean

generateProject:
	cookiecutter --no-input --overwrite-if-exists . project_name='Cypress Test Project'

testProject:
	make -C cypress-test-project npm install

clean:
	rm -fr cypress-test-project