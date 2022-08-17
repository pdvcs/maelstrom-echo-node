const rl = require("readline")
const reader = rl.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
})

reader.on("line", function (line) {
    processMessage(JSON.parse(line))
})

const thisNode = {
    nodeId: "",
    nextMessageId: 0,
}

function processMessage(msg) {
    if (msg.body.type === undefined) {
        console.error("error: could not determine message type")
        return
    }
    switch (msg.body.type) {
        case "init":
            processInit(msg)
            break

        case "echo":
            processEcho(msg)
            break

        default:
            console.error("unknown message type:", msg.body.type)
    }
}

function processInit(msg) {
    ensureExists("init", msg.body.node_id, msg.body.msg_id, msg.src)
    thisNode.nodeId = msg.body.node_id
    respond(msg, { type: "init_ok", msg_id: thisNode.nextMessageId++ })
}

function processEcho(msg) {
    ensureExists("echo", msg.body.echo, msg.body.msg_id, msg.src)
    respond(msg, { echo: msg.body.echo, type: "echo_ok", msg_id: thisNode.nextMessageId++ })
}

function ensureExists(description) {
    const args = [...arguments]
    for (const arg of args.slice(1)) {
        if (arg === undefined) {
            console.error(`${description} message: expected fields not found`)
            process.exit(1)
        }
    }
}

function respond(msg, fields) {
    let body = { ...fields, in_reply_to: parseInt(msg.body.msg_id) }
    console.log(JSON.stringify({ src: thisNode.nodeId, dest: msg.src, body: body }))
}
