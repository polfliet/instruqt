#!/bin/bash
while true; do
    mongo < loadgenMongo.js;
    sleep 30;
done