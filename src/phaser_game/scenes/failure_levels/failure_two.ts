import Defender from "../../game_objects/defender";
import Field from "../../game_objects/field";
import Hero from "../../game_objects/hero";
import level from "../level";


export default class failureTwo extends level{

    constructor(){
        let instructions: string[] = ['failure', "move negation info", 'move observation info']
        super('failure two', 'a.(a.c.0+b.b.0)', 'a.b.b.0+a.a.(b.b.0+c.0)', 'Failure', instructions);
        this.enemy = "enemy_failure"
    }

    preload(){
        super.preload();
        this.load.image('background_failure', 'assets/backgrounds/level_backgrounds/background_failure.png');
        this.load.spritesheet('enemy_failure', 'assets/characters/enemy_failure.png', { frameWidth: 32, frameHeight: 48 });

    }

    create(){
        this.add.image(400, 300, 'background_failure');
        super.create();
 
        // Fields
        let field_0: Field = this.createField(200, 200, 'a.(a.c.0+b.b.0)', 0);

        this.createField(100, 320, 'a.c.0+b.b.0', 1);

        this.createField(300, 320, 'c.0', 2);

        this.createField(100, 440, 'b.0', 3);

        this.createField(300, 440, '0', 4);

        let field_5: Field = this.createField(600,200, 'a.b.b.0+a.a.(b.b.0+c.0)', 5);

        this.createField(500, 320, 'b.b.0', 6);

        this.createField(700, 320, 'a.(b.b.0+c.0)', 7);

        this.createField(500, 440, 'b.0', 8);

        this.createField(700, 440, 'b.b.0+c.0',9);

        this.createField(600, 550, '0', 10);


        //create arrows
        this.add.image(150,260, 'arrow').rotation += 2.3;

        this.add.image(200,320, 'arrow');

        this.add.image(100,380, 'arrow').setTint(0xff0000).rotation += 1.57;

        this.add.image(300,380, 'arrow').setTint(0xffff00).rotation += 1.57;

        this.add.image(200,440, 'arrow').setTint(0xff0000);

        this.add.image(550,260, 'arrow').rotation += 2.3;

        this.add.image(650,260, 'arrow').rotation += 0.8;

        this.add.image(500,380, 'arrow').setTint(0xff0000).rotation += 1.575;

        this.add.image(700,380, 'arrow').rotation += 1.575;

        this.add.image(600,440, 'arrow').setTint(0xff0000).rotation += 3.125;

        this.add.image(550,500, 'arrow').setTint(0xff0000).rotation = 0.8;

        this.add.image(650,500, 'arrow').setTint(0xffff00).rotation = 2.3;
        
        //initialize the adjacency matrix
        this.connected = this.createConnections(11);
        this.connected[0][1] = 1;
        this.connected[1][2] = 1;
        this.connected[1][3] = 1;
        this.connected[2][4] = 1;
        this.connected[3][4] = 1;
        this.connected[5][6] = 1;
        this.connected[5][7] = 1;
        this.connected[6][8] = 1;
        this.connected[7][9] = 1;
        this.connected[8][10] = 1;
        this.connected[9][8] = 1;
        this.connected[9][10] = 1;

        // Initialize the observations matrix
        this.observations = this.createObservations(12);
        this.observations[0][1] = 'a';
        this.observations[1][2] = 'a';
        this.observations[1][3] = 'b';
        this.observations[2][4] = 'c';
        this.observations[3][4] = 'b';
        this.observations[5][6] = 'a';
        this.observations[5][7] = 'a';
        this.observations[6][8] = 'b';
        this.observations[7][9] = 'a';
        this.observations[8][10] = 'b';
        this.observations[9][8] = 'b';
        this.observations[9][10] = 'c';

        // create hero
        this.hero = new Hero(200, 200, field_0, this);

        // create defender
        this.defender = new Defender(this.enemy, this);
        this.defender.addEnemy(600, 200, field_5);
    }


    
}
