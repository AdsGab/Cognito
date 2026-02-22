const Agent = require('./systems/Agent');
class World {
    constructor(){
        this.agents = {}; //Map of ID -> Agent Data
        this.tickRate = 10; //Ticks per second (TPS)
        this.lastUpdate = Date.now();
    }

    //Initialize a dummy agent for testing
    init(){
        this.agents["agent_01"] = new Agent("agent_01",100,100,{fastMetabolism:true});
        console.log("World Initialized. Agents spawned.");
    }

    tick(){
        const now =Date.now()
        const delta = (now -this.lastUpdate)/ 1000;
        this.lastUpdate = now;

        Object.values(this.agents).forEach(agent=> {
            agent.update(delta);
        })

        return {
            agents: this.agents,
            timestamp: now
        };        
    }
}

module.exports = World;