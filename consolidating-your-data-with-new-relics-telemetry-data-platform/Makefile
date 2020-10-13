.PHONY: clean dist

./dist/assets.tar.gz: ./assets/*
	tar -cvzf ./dist/assets.tar.gz --exclude=node_modules --exclude=.env --exclude=*DS_Store* --exclude=.git* ./assets

clean:
	rm -rf ./dist/*

dist: ./dist/assets.tar.gz