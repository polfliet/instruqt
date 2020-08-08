.PHONY: clean build

./dist/ansible.tar.gz:
	tar -cvzf ./dist/ansible.tar.gz ./ansible

clean:
	rm -rf ./dist/*

build: ./dist/ansible.tar.gz