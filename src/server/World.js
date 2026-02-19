class World {
    constructor(){
        this.agents = {}; //Map of ID -> Agent Data
        this.tickRate = 10; //Ticks per second (TPS)
        this.lastUpdate = Date.now();
    }

    //Initialize a dummy agent for testing
    init(){
        this.agents["agent_01"] = {
            id: "agent_01",
            x: 100,
            y: 100,
            color: "red"
        };
        console.log("World Initialized.");
    }

    tick(){
        const now =Date.now()
        const delta = (now -this.lastUpdate)/ 1000;
        this.lastUpdate = now;

        const agent = this.agents["agent_01"];
        if (agent){
            agent.x += Math.cos(now/500) *2;
            agent.y += Math.sin(now/500) *2;
        }

        return {
            agents: this.agents,
            timestamp: now
        };        
    }
}

module.exports = World;