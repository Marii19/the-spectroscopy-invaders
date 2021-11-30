import Defender from "../../game_objects/defender";
import Field from "../../game_objects/field";
import Hero from "../../game_objects/hero";
import level from "../level";


export default class bisimulationOne extends level{

    constructor(){
        let instructions: string[] = ['bisimulation', 'move conjunct info', "move negation info", 'move observation info']
        super('bisimulation one', 'a.(b.0+c.0)', 'a.0+a.(b.0+c.0)', 'Bisimulation', instructions);
        this.enemy = "enemy_bisimulation"
    }

    preload(){
        super.preload();
        this.load.image('background_bisimulation', 'assets/backgrounds/level_backgrounds/background_bisimulation.png');
        this.load.spritesheet('enemy_bisimulation', 'assets/characters/enemy_bisimulation.png', { frameWidth: 32, frameHeight: 48 });
    }

    create(){
        this.add.image(400, 300, 'background_bisimulation');
        super.create();
 
        // Fields
        let field_0: Field = this.createField(200, 200, 'a.(b.0+c.0)', 0);

        this.createField(200, 320, 'b.0+c.0', 1);

        this.createField(100, 440, '0', 2);

        this.createField(300, 440, '0', 3);

        let field_defender: Field = this.createField(600,200, 'a.0+a.(b.0+c.0)', 4);

        this.createField(500, 320, '0', 5);

        this.createField(700, 320, 'b.0+c.0', 6);

        this.createField(600, 440, '0', 7);

        this.createField(700, 440, '0', 8);

        //create arrows
        this.add.image(200,260, 'arrow').rotation += 1.57;
        this.add.image(150,380, 'arrow').setTint(0xFF0000).rotation += 2.3;
        this.add.image(250,380, 'arrow').setTint(0xFFAA00).rotation += 0.9;
        this.add.image(550,260, 'arrow').rotation += 2.3;
        this.add.image(650,260, 'arrow').rotation += 0.9;
        this.add.image(650,380, 'arrow').setTint(0xFF0000).rotation += 2.3;
        this.add.image(700,380, 'arrow').setTint(0xFFAA00).rotation += 1.575;
     
        //initialize the adjacency matrix
        this.connected = this.createConnections(9);
        this.connected[0][1] = 1;
        this.connected[1][2] = 1;
        this.connected[1][3] = 1;
        this.connected[4][5] = 1;
        this.connected[4][6] = 1;
        this.connected[6][7] = 1;
        this.connected[6][8] = 1;

        // Initialize the observations matrix
        this.observations = this.createObservations(9);
        this.observations[0][1] = 'a';
        this.observations[1][2] = 'b';
        this.observations[1][3] = 'c';
        this.observations[4][5] = 'a';
        this.observations[4][6] = 'a';
        this.observations[6][7] = 'b';
        this.observations[6][8] = 'c';

        //create hero
        this.hero = new Hero(200, 200, field_0, this);

        // Create first defender
        this.defender = new Defender(this.enemy, this);
        this.defender.addEnemy(600, 200, field_defender);
    }
}
