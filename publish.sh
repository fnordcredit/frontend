#!/bin/sh

cp README.md dist/
cp LICENSE dist/
cp CHANGELOG.md dist/
cp package.json dist/
cd dist/
npm publish
cd ..
