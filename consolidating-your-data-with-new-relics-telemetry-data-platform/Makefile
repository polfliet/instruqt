.PHONY: clean dist

./dist/assets.tar.gz: ./assets/*
	tar -cvzf ./dist/assets.tar.gz --exclude=node_modules ./assets

clean:
	rm -rf ./dist/*

dist: ./dist/assets.tar.gz