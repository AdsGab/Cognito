const Agent = require('./systems/Agent');
const AgentModel = require('./models/AgentModel');
class World {
    constructor(){
        this.agents = {}; //Map of ID -> Agent Data
        this.tickRate = 10; //Ticks per second (TPS)
        this.lastUpdate = Date.now();
    }

    //Initialize a dummy agent for testing
    async init(){
        try{
            const dbAgent = await AgentModel.findOneAndUpdate(
                { agentId: "agent_01"},
                {
                    $setOnInsert:{
                        agentId: "agent_01",
                        traits: {fastMetabolism: true}
                    }
                },
                { returnDocument: 'after', upsert: true }
            );
            //Pass the database data into Active Agent class
            this.agents["agent_01"] = new Agent(
                dbAgent.agentId,
                dbAgent.position.x,
                dbAgent.position.y,
                dbAgent.traits
            );

            this.agents["agent_01"].needs = dbAgent.needs;
            console.log("World Initialized. Agents spawned.");
        } catch (error){
            console.error("Error loading agents from DB:", error);
        }
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