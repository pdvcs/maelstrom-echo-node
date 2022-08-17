#!/bin/bash

export MAELSTROM_DIR="{{dir}}"
cd ${MAELSTROM_DIR}/node_echo
exec node echo.js
