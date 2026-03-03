#!/usr/bin/env bash

# build the UI
npm run build

# delete old wwwroot files
rm -r ../WorkoutBackend/WorkoutBackend.Api/wwwroot/*

# copy over the new files
cp -r ./dist/* ../WorkoutBackend/WorkoutBackend.Api/wwwroot/

# re-create the .gitkeep file for deployment
cd ../WorkoutBackend/WorkoutBackend.Api/wwwroot/
touch .gitkeep