// this is honestly a really terrible example method but it works

const { Client } = require("../index")
const fs = require("fs")

const test = async () => {
    const clientOptions = {
        "appId": "554d7a6d71387749336f69344c327671734d62553169663231635245394c3849",
        "appSecret": "666e76544141647162717a76733267765536767333725545424967434b6e47663767466a3642676467764545537a386c5446584b4f58553778694263592d5546"
    }
    const client = new Client()
    await client.init(clientOptions)
    
    const stats = fs.statSync("test audio.mp3")
    let stream = fs.createReadStream("test audio.mp3")
    const conversation = await client.api.createConversationFromAudio(stream, stats.size)
    console.log(conversation.conversationId)

    function wait() {
        setTimeout(async () => {
            const { status } = await conversation.fetchJobStatus()
            console.log(status)
            if (status != "completed")
                wait()
            else {
                console.log(await conversation.fetchSpeechToText())
                console.log(await conversation.fetchTranscript())
            }
        }, 1000);
    }
    await wait()
}
test()