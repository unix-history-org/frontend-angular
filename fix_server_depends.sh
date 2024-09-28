#!/bin/sh

rm -rf .angular node_modules
npm install --force -include=dev
ng build --configuration production
