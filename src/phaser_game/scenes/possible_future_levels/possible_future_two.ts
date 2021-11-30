import Defender from "../../game_objects/defender";
import Field from "../../game_objects/field";
import Hero from "../../game_objects/hero";
import level from "../level";


export default class possibleFutureTwo extends level{

    constructor(){
        let instructions: string[] = ['possible-future', 'move conjunct info', "move negation info", 'move observation info']
        super('possible-future two', 'a.(a.c.0+a.(c.0+d.0))', 'a.0+a.(a.c.0+a.d.0)', 'Possible-future', instructions);
        this.enemy = "enemy_possible_future"
    }

    preload(){
        super.preload();
        this.load.image('background_possible_future', 'assets/backgrounds/level_backgrounds/background_possible_future.png');
        this.load.spritesheet('enemy_possible_future', 'assets/characters/enemy_possible_future.png', { frameWidth: 32, frameHeight: 48 });
    }

    create(){
        this.add.image(400, 300, 'background_possible_future');
        super.create();
 
        // Fields

        let field_0: Field = this.createField(200, 200, 'a.(a.c.0+a.(c.0+d.0))', 0);

        this.createField(200, 320, 'a.c.0+a.(c.0+d.0)', 1);

        this.createField(100, 440, 'c.0', 2);

        this.createField(300, 440, 'c.0+d.0', 3);

        this.createField(100, 560, '0', 4);

        this.createField(200,560, '0', 5);

        this.createField(300, 560, '0', 6);

        let field_7: Field = this.createField(600, 200, 'a.0+a.(a.c.0+a.d.0)', 7);

        this.createField(500, 320, '0', 8);

        this.createField(700, 320, 'a.c.0+a.d.0', 9);

        this.createField(600, 440, 'c.0', 10);

        this.createField(700, 440, 'd.0', 11);

        this.createField(600, 560, '0', 12);

        this.createField(700, 560, '0', 13);


        //create arrows
        this.add.image(200,260, 'arrow').rotation += 1.57;

        this.add.image(150,380, 'arrow').rotation += 2.3;

        this.add.image(250,380, 'arrow').rotation += 0.8;

        this.add.image(100,500, 'arrow').setTint(0xff0000).rotation += 1.57;

        this.add.image(250,500, 'arrow').setTint(0xff0000).rotation += 2.3;

        this.add.image(300,500, 'arrow').setTint(0xFFAA00).rotation += 1.57;

        this.add.image(650,260, 'arrow').rotation += 0.9;

        this.add.image(550,260, 'arrow').rotation += 2.3;

        this.add.image(650,380, 'arrow').rotation += 2.3;

        this.add.image(700,380, 'arrow').rotation += 1.57;

        this.add.image(600,500, 'arrow').setTint(0xff0000).rotation += 1.57;

        this.add.image(700,500, 'arrow').setTint(0xFFAA00).rotation += 1.57;
     
        //initialize the adjacency matrix
        this.connected = this.createConnections(14);
        this.connected[0][1] = 1;
        this.connected[1][2] = 1;
        this.connected[1][3] = 1;
        this.connected[2][4] = 1;
        this.connected[3][5] = 1;
        this.connected[3][6] = 1;
        this.connected[7][8] = 1;
        this.connected[7][9] = 1;
        this.connected[9][10] = 1;
        this.connected[9][11] = 1;
        this.connected[10][12] = 1;
        this.connected[11][13] = 1;

        // Initialize the observations matrix
        this.observations = this.createObservations(14);
        this.observations[0][1] = 'a';
        this.observations[1][2] = 'a';
        this.observations[1][3] = 'a';
        this.observations[2][4] = 'c';
        this.observations[3][5] = 'c';
        this.observations[3][6] = 'd';
        this.observations[7][8] = 'a';
        this.observations[7][9] = 'a';
        this.observations[9][10] = 'a';
        this.observations[9][11] = 'a';
        this.observations[10][12] = 'c';
        this.observations[11][13] = 'd';

        //create attacker
        this.hero = new Hero(200, 200, field_0, this)

        // Create defender 
        this.defender = new Defender(this.enemy, this);
        this.defender.addEnemy(600, 200, field_7);
    }
}
