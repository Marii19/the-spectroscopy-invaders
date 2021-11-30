import Defender from "../../game_objects/defender";
import Field from "../../game_objects/field";
import Hero from "../../game_objects/hero";
import level from "../level";

export default class bisimulationFour extends level{

    constructor(){
        let instructions: string[] = ['bisimulation', 'move conjunct info', "move negation info", 'move observation info']
        super('bisimulation four', 'a.(a.b.0+a.c.0)', 'a.a.(b.0+c.0)+a.(a.b.0+a.c.0)', 'Bisimulation', instructions);
        this.enemy = "enemy_bisimulation"
    }

    preload(){
        this.load.image('background_bisimulation', 'assets/backgrounds/level_backgrounds/background_bisimulation.png');
        super.preload();
        this.load.spritesheet('enemy_bisimulation', 'assets/characters/enemy_bisimulation.png', { frameWidth: 32, frameHeight: 48 });
    }

    create(){
        this.add.image(400, 300, 'background_bisimulation');
        super.create();
 
        // Fields

        let field_0: Field = this.createField(200, 200, 'a.(a.b.0+a.c.0)', 0);

        this.createField(200, 320, 'a.b.0+a.c.0', 1);

        this.createField(100, 440, 'b.0', 2);

        this.createField(300, 440, 'c.0', 3);

        this.createField(100, 560, '0', 4);

        this.createField(300, 560, '0', 5);

        let field_6: Field = this.createField(600, 200, 'a.a.(b.0+c.0)+a.(a.b.0+a.c.0)', 6);

        this.createField(500, 320, 'a.(b.0+c.0)', 7);

        this.createField(600, 320, '0', 8);

        this.createField(700, 320, 'a.b.0+a.c.0', 9);

        this.createField(500, 440, 'b.0+c.0', 10);

        this.createField(600, 440, 'c.0', 11);

        this.createField(700, 440, 'b.0', 12);

        this.createField(600, 560, '0', 13);


        //create arrows
        this.add.image(200,260, 'arrow').rotation += 1.57;
        this.add.image(150,380, 'arrow').rotation += 2.3;
        this.add.image(250,380, 'arrow').rotation += 0.9;
        this.add.image(100,500, 'arrow').setTint(0xFF0000).rotation += 1.57;
        this.add.image(300,500, 'arrow').setTint(0xFFAA00).rotation += 1.57;
        this.add.image(550,260, 'arrow').rotation += 2.3;
        this.add.image(650,260, 'arrow').rotation += 0.9;
        this.add.image(500,380, 'arrow').rotation += 1.57;
        this.add.image(550,380, 'arrow').setTint(0xFFAA00).rotation -= 0.9;
        this.add.image(600,380, 'arrow').setTint(0xFFAA00).rotation -= 1.57;
        this.add.image(650,380, 'arrow').rotation += 2.3;
        this.add.image(700,380, 'arrow').rotation += 1.57;
        this.add.image(550,500, 'arrow').setTint(0xFF0000).rotation += 0.9;
        this.add.image(650,500, 'arrow').setTint(0xFF0000).rotation += 2.3;
     
        //initialize the adjacency matrix
        this.connected = this.createConnections(14);
        this.connected[0][1] = 1;
        this.connected[1][2] = 1;
        this.connected[1][3] = 1;
        this.connected[2][4] = 1;
        this.connected[3][5] = 1;
        this.connected[6][7] = 1;
        this.connected[6][9] = 1;
        this.connected[7][10] = 1;
        this.connected[9][11] = 1;
        this.connected[9][12] = 1;
        this.connected[10][8] = 1;
        this.connected[10][13] = 1;
        this.connected[11][8] = 1;
        this.connected[12][13] = 1;

        // Initialize the observations matrix
        this.observations = this.createObservations(14);
        this.observations[0][1] = 'a';
        this.observations[1][2] = 'a';
        this.observations[1][3] = 'a';
        this.observations[2][4] = 'b';
        this.observations[3][5] = 'c';
        this.observations[6][7] = 'a';
        this.observations[6][9] = 'a';
        this.observations[7][10] = 'a';
        this.observations[9][11] = 'a';
        this.observations[9][12] = 'a';
        this.observations[10][8] = 'c';
        this.observations[10][13] = 'b';
        this.observations[11][8] = 'c';
        this.observations[12][13] = 'b';

         //create hero
         this.hero = new Hero(200, 200, field_0, this)

         // Create first defender
         this.defender = new Defender(this.enemy, this);
         this.defender.addEnemy(600, 200, field_6);
    }
}
