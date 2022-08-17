#!/bin/bash

export MAELSTROM_DIR=~/repos/maelstrom
pushd $MAELSTROM_DIR > /dev/null 2>&1
./maelstrom $*
popd > /dev/null 2>&1
