# A Simple Echo Server for Node

This is a NodeJS version of the Echo Server
[described here](https://github.com/jepsen-io/maelstrom/blob/main/doc/02-echo/index.md).

Requires Linux (to run maelstrom), and tested with Node 16.

## Deploy

```shell
./deploy.sh
```

## Run

```shell
./run.sh test -w echo --bin ./launch_echo.sh --time-limit 5
```
