const { Schema, model, mongoose } = require("mongoose")
const uri = process.env.dbWEB
const db = mongoose.createConnection(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const WebSessions = new Schema({

    // la id del servidor
    sessionID: {
        type: String,
        required: true
    },

    //un objeto que guarda las configuraciones de la prision en ese servidor
    discordData: {
        type: Object,
        required: true
    },
})

module.exports = db.model("WebSessions", WebSessions)