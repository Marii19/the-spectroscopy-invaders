import Defender from "../../game_objects/defender";
import Field from "../../game_objects/field";
import Hero from "../../game_objects/hero";
import level from "../level";

export default class possibleFutureThree extends level{

    constructor(){
        let instructions: string[] = ['possible-future', 'move conjunct info', "move negation info", 'move observation info']
        super('possible-future three', 'a.(b.c.0+b.d.0)', 'a.b.c.0+a.b.d.0', 'Possible-future', instructions);
        this.enemy = "enemy_possible_future"; 
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
       
        let field_0: Field = this.createField( 200, 200, 'a.(b.c.0+b.d.0)', 0);

        this.createField( 200, 320, 'b.c.0+b.d.0', 1);

        this.createField(100, 440, 'c.0', 2);
        
        this.createField(300, 440, 'd.0', 3);

        this.createField(100, 560, '0', 4);

        this.createField(300, 560, '0', 5);

        let field_6: Field = this.createField(600, 200, 'a.b.c.0+a.b.d.0', 6);

        this.createField(500, 320, 'b.c.0', 7);

        this.createField(700, 320, 'b.d.0', 8);

        this.createField(500, 440, 'c.0', 9);

        this.createField(700, 440, 'd.0', 10);

        this.createField(500, 560, '0', 11);

        this.createField(700, 560, '0', 12);

        //create arrows

        this.add.image(200,260, 'arrow').setTint(0xFF8000).rotation += 1.57;

        this.add.image(150,380, 'arrow').setTint(0x0000FF).rotation += 2.3;

        this.add.image(250,380, 'arrow').setTint(0x0000FF).rotation += 0.8;

        this.add.image(100,500, 'arrow').setTint(0xFFFF00).rotation += 1.57;

        this.add.image(300,500, 'arrow').setTint(0xFF0000).rotation += 1.57;

        this.add.image(550,260, 'arrow').setTint(0xFF8000).rotation += 2.3;

        this.add.image(650,260, 'arrow').setTint(0xFF8000).rotation += 0.9;

        this.add.image(500,380, 'arrow').setTint(0x0000FF).rotation += 1.57;

        this.add.image(700,380, 'arrow').setTint(0x0000FF).rotation += 1.57;

        this.add.image(500,500, 'arrow').setTint(0xFFFF00).rotation += 1.57;

        this.add.image(700,500, 'arrow').setTint(0xFF0000).rotation += 1.57;
     
        //initialize the adjacency matrix
        this.connected = this.createConnections(13);
        this.connected[0][1] = 1;
        this.connected[1][2] = 1;
        this.connected[1][3] = 1;
        this.connected[2][4] = 1;
        this.connected[3][5] = 1;
        this.connected[6][7] = 1;
        this.connected[6][8] = 1;
        this.connected[7][9] = 1;
        this.connected[8][10] = 1;
        this.connected[9][11] = 1;
        this.connected[10][12] = 1;

        // Initialize the observations matrix
        this.observations = this.createObservations(13);
        this.observations[0][1] = 'a';
        this.observations[1][2] = 'b';
        this.observations[1][3] = 'b';
        this.observations[2][4] = 'c';
        this.observations[3][5] = 'd';
        this.observations[6][7] = 'a';
        this.observations[6][8] = 'a';
        this.observations[7][9] = 'b';
        this.observations[8][10] = 'b';
        this.observations[9][11] = 'c';
        this.observations[10][12] = 'd';

        //create attacker
        this.hero = new Hero(200, 200, field_0, this)

        // Create defender 
        this.defender = new Defender(this.enemy, this);
        this.defender.addEnemy(600, 200, field_6);
    }
}
