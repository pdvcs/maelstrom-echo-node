#!/bin/bash

source ./setup.vars
if [[ ! -d $DEPLOY_DIR ]]; then mkdir "$DEPLOY_DIR"; fi
cp ./package*.json ./*.js "$DEPLOY_DIR"
cp launch_echo.sh "$DEPLOY_DIR/.."
sed -i "s|{{dir}}|${MAELSTROM_DIR}|" "$DEPLOY_DIR/../launch_echo.sh"