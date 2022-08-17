#!/bin/bash

export DEPLOY_DIR=~/repos/maelstrom/node_echo
if [[ ! -d $DEPLOY_DIR ]]; then mkdir "$DEPLOY_DIR"; fi
cp package*.json *.js "$DEPLOY_DIR"
cp launch_echo.sh "$DEPLOY_DIR/.."
