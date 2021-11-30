import Hero from "../../game_objects/hero";
import Defender from "../../game_objects/defender";
import Field from "../../game_objects/field";
import level from "../level";

export default class simulationFour extends level{

    constructor(){
        let instructions: string[] = ['simulation', 'move conjunct info', "move negation info", 'move observation info']
        super('simulation four', 'a.(b.(b.0+c.0)+a.c.0)', 'a.b.c.0+a.a.c.0+a.b.b.0', 'Simulation', instructions);
        this.enemy = "enemy_simulation";
    }

    preload(){ 
        super.preload();
        this.load.image('background_simulation', 'assets/backgrounds/level_backgrounds/background_simulation.png');
        this.load.spritesheet('enemy_simulation', 'assets/characters/enemy_simulation.png', { frameWidth: 32, frameHeight: 48 });
    }

    create(){
        this.add.image(400, 300, 'background_simulation');
        super.create();
 
        // Create fields
        let field_0: Field = this.createField(200, 200, 'a.(b.(b.0+c.0)+a.c.0)', 0);

        this.createField(200, 320, 'b.(b.0+c.0)+a.c.0', 1);

        this.createField(100, 440, 'b.0+c.0', 2);

        this.createField(300, 440, 'c.0', 3);

        this.createField(100, 560, '0', 4);

        this.createField(300, 560, '0', 5);

        let field_6: Field = this.createField(600, 200, 'a.b.c.0+a.a.c.0+a.b.b.0', 6);

        this.createField(500, 320, 'b.c.0', 7);

        this.createField(600, 320, 'a.c.0', 8);

        this.createField(700, 320, 'b.b.0', 9);

        this.createField(500, 440, 'c.0', 10);

        this.createField(600, 440, 'c.0', 11);

        this.createField(700, 440, 'b.0', 12);

        this.createField(600, 560, '0', 13);

        // Create arrows
        this.add.image(200,260, 'arrow').rotation += 1.57;
        this.add.image(150,380, 'arrow').setTint(0xFFAA00).rotation += 2.3;
        this.add.image(250,380, 'arrow').rotation += 0.9;
        this.add.image(100,500, 'arrow').setTint(0xFFAA00).rotation += 1.57;
        this.add.image(165,475, 'arrow').setTint(0xff0000).rotation += 0.7;
        this.add.image(235,525, 'arrow').setTint(0xff0000).rotation += 0.7;
        this.add.image(300,500, 'arrow').setTint(0xff0000).rotation += 1.57;
        this.add.image(550,260, 'arrow').rotation += 2.3;
        this.add.image(600,260, 'arrow').rotation += 1.57;
        this.add.image(650,260, 'arrow').rotation += 0.9;
        this.add.image(500,380, 'arrow').setTint(0xFFAA00).rotation += 1.57;
        this.add.image(600,380, 'arrow').rotation += 1.57;
        this.add.image(700,380, 'arrow').setTint(0xFFAA00).rotation += 1.57;
        this.add.image(550,500, 'arrow').setTint(0xff0000).rotation += 0.9;
        this.add.image(600,500, 'arrow').setTint(0xff0000).rotation += 1.57;
        this.add.image(650,500, 'arrow').setTint(0xFFAA00).rotation += 2.3;
     
        //initialize the adjacency matrix
        this.connected = this.createConnections(15);
        this.connected[0][1] = 1;
        this.connected[1][2] = 1;
        this.connected[1][3] = 1;
        this.connected[2][4] = 1;
        this.connected[2][5] = 1;
        this.connected[3][5] = 1;
        this.connected[6][7] = 1;
        this.connected[6][8] = 1;
        this.connected[6][9] = 1;
        this.connected[7][10] = 1;
        this.connected[8][11] = 1;
        this.connected[9][12] = 1;
        this.connected[10][13] = 1;
        this.connected[11][13] = 1;
        this.connected[12][13] = 1;

        // Initialize the observations matrix
        this.observations = this.createObservations(15);
        this.observations[0][1] = "a";
        this.observations[1][2] = "b";
        this.observations[1][3] = "a";
        this.observations[2][4] = "b";
        this.observations[2][5] = "c";
        this.observations[3][5] = "c";
        this.observations[6][7] = "a";
        this.observations[6][8] = "a";
        this.observations[6][9] = "a";
        this.observations[7][10] = "b";
        this.observations[8][11] = "a";
        this.observations[9][12] = "b";
        this.observations[10][13] ="c";
        this.observations[11][13] ="c";
        this.observations[12][13] = "b";

        //create attacker
        this.hero = new Hero(200, 200, field_0, this)

        // Create first defender 
        this.defender = new Defender(this.enemy, this);
        this.defender.addEnemy(600, 200, field_6);
    }
}
