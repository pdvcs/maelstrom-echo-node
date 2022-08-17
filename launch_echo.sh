#!/bin/bash

export MAELSTROM_DIR=~/repos/maelstrom
pushd ${MAELSTROM_DIR}/node_echo > /dev/null 2>&1
exec node echo.js
popd > /dev/null 2>&1
