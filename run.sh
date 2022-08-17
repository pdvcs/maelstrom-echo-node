#!/bin/bash

source ./setup.vars
pushd "$MAELSTROM_DIR" > /dev/null 2>&1
./maelstrom "$@"
popd > /dev/null 2>&1