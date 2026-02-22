class Agent {
    constructor(id, x, y, traits = {}){
        this.id = id;
        this.x = x;
        this.y = y;
        this.color = 'rgb(255,0,0)';

        // Internal State (The Needs: 0 = Good, 100 = Critical)
        this.needs ={
            hunger: 0,
            fatigue: 0
        };

        // Personality Traits (We will load these from MongoDB later)
        this.traits = traits;
    }

    update (dt){
        // Degrade Needs over time
        // If they have a "fastMetabolism" trait, they get hungry twice
        const hungerRate = this.traits.fastMetabolism ? 2: 1;
        this.needs.hunger += hungerRate *dt;

        // Cap hunger at 100
        if (this.needs.hunger > 100) this. needs.hunger = 100;

        // Visual Feedback: the agent turns darker as it starves
        const redValue = Math.floor(Math.max(50, 255 - (this.needs.hunger * 2)));
        this.color = `rgb(${redValue}, 50, 50)`;

        // Movement (Temporary wandering logic)
        const now = Date.now();
        this.x += Math.cos(now / 500) * 1.5;
        this.y += Math.sin(now / 500) * 1.5;
    }
}

module.exports = Agent;