import Defender from "../../game_objects/defender";
import Field from "../../game_objects/field";
import Hero from "../../game_objects/hero";
import level from "../level";

export default class possibleFutureOne extends level{


    constructor(){
        let instructions: string[] = ['possible-future', 'move conjunct info', "move negation info", 'move observation info']
        super('possible-future one', 'a.(c.0+d.0)', 'a.c.0+a.d.0', 'Possible-future', instructions);
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
        let field_0: Field = this.createField(200, 200, 'a.(c.0+d.0)', 0);

        this.createField(200, 320, 'c.0+d.0', 1);

        this.createField(100, 440, '0', 2);

        this.createField(300, 440, '0', 3);

        let field_4: Field = this.createField(600, 200, 'a.c.0+a.d.0', 4);

        this.createField(550,320, 'c.0', 5);

        this.createField(650,320,'d.0', 6 );

        this.createField(550, 440, '0', 7);

        this.createField(650, 440, '0', 8);

        //create arrows
        this.add.image(200,260, 'arrow').rotation += 1.57;

        this.add.image(150,380, 'arrow').setTint(0xff0000).rotation += 2.3;

        this.add.image(250,380, 'arrow').setTint(0xffff00).rotation += 0.8;

        this.add.image(575,260, 'arrow').rotation += 2.0;

        this.add.image(625,260, 'arrow').rotation += 1.05;

        this.add.image(550,380, 'arrow').setTint(0xff0000).rotation += 1.57;
        
        this.add.image(650,380, 'arrow').setTint(0xffff00).rotation += 1.57;
     
        //initialize the adjacency matrix
        this.connected = this.createConnections(9);
        this.connected[0][1] = 1;
        this.connected[1][2] = 1;
        this.connected[1][3] = 1;
        this.connected[4][5] = 1;
        this.connected[4][6] = 1;
        this.connected[5][7] = 1;
        this.connected[6][8] = 1;

        // Initialize the observations matrix
        this.observations = this.createObservations(9);
        this.observations[0][1] = 'a';
        this.observations[1][2] = 'c';
        this.observations[1][3] = 'd';
        this.observations[4][5] = 'a';
        this.observations[4][6] = 'a';
        this.observations[5][7] = 'c';
        this.observations[6][8] = 'd';

        //create attacker
        this.hero = new Hero(200, 200, field_0, this)

        // Create first defender 
        this.defender = new Defender(this.enemy, this);
        this.defender.addEnemy(600, 200, field_4);
    }


    
}
