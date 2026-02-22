const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
    agentId: {type: String, required: true, unique: true},
    color: {type: String, default: 'rgb(255,0,0)'},
    position:{
        x:{type:Number, default:100},
        y: {type: Number, default:100}
    },
    needs:{
        hunger:{type: Number, default: 0},
        fatigue:{type: Number, defautl:0}
    },
    traits:{
        fastMetabolism:{type: Boolean, default: false},
        lazy: { type: Boolean, default: false}
    }
});

module.exports = mongoose.model('AgentData', agentSchema);