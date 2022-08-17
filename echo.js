const readlineLib = require("readline")
const reader = readlineLib.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
})

reader.on("line", function (line) {
    main(line)
})

const thisNode = {
    nodeId: "",
    nextMessageid: 0,
}

function main(line) {
    const { msgtype, message } = parseMessage(line)
    if (msgtype === undefined) {
        console.log("error: could not determine message type")
        return
    }
    switch (msgtype) {
        case "init":
            handleInit(message)
            break

        case "echo":
            handleEcho(message)
            break
    }
}

function parseMessage(line) {
    const parsed = JSON.parse(line)
    return { msgtype: parsed.body.type, message: parsed }
}

function handleInit(message) {
    let nodeId = message.body.node_id
    let msgId = message.body.msg_id
    let src = message.src
    if (isUndefined(nodeId, msgId, src)) {
        console.log("error reading init message")
        return
    }

    thisNode.nodeId = nodeId
    let response = {
        src: nodeId,
        dest: src,
        body: {
            msg_id: thisNode.nextMessageid++,
            in_reply_to: parseInt(msgId),
            type: "init_ok",
        },
    }
    console.log(JSON.stringify(response))
}

function handleEcho(message) {
    let echoMsg = message.body.echo
    let msgId = message.body.msg_id
    let src = message.src
    if (isUndefined(echoMsg, msgId, src)) {
        console.log("error reading init message")
        return
    }

    let response = {
        src: thisNode.nodeId,
        dest: src,
        body: {
            echo: echoMsg,
            msg_id: thisNode.nextMessageid++,
            in_reply_to: parseInt(msgId),
            type: "echo_ok",
        },
    }
    console.log(JSON.stringify(response))
}

function isUndefined() {
    for (const arg of arguments) {
        if (arg === undefined) {
            return true
        }
        return false
    }
}
