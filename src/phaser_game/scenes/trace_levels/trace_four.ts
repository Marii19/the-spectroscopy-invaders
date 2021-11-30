import Defender from "../../game_objects/defender";
import Field from "../../game_objects/field";
import Hero from "../../game_objects/hero";
import levelTrace from "../level_trace";

export default class traceFour extends levelTrace{
    
    constructor(){
        let instructions: string[] = ['trace', 'move observation info']
        super('trace four', 'a.a.a.0+a.a.(a.0+a.a.0+b.a.a.0)', 'a.(a.a.0+a.(a.0+b.a.0))+a.a.(a.0+b.a.0)', 'Trace', instructions);
        this.enemy = "enemy_trace"
    }

    preload(){
        super.preload();
        this.load.image('background_trace', 'assets/backgrounds/level_backgrounds/background_trace.png');
        this.load.spritesheet('enemy_trace', 'assets/characters/enemy_trace.png', { frameWidth: 32, frameHeight: 48 });
    }

    create(){
        this.preload()
        
        this.add.image(400, 300, 'background_trace');
        super.create();

        // Fields
        let field_0: Field = this.createField(200, 200, 'a.a.a.0+a.a.(a.0+a.a.0+b.a.a.0)', 0);

        this.createField(100, 320, 'a.a.0', 1);

        this.createField(300, 320, 'a.(a.0+a.a.0+b.a.a.0)', 2);

        this.createField(100, 440, 'a.0', 3);

        this.createField(300, 440, 'a.0+a.a.0+b.a.a.0', 4);

        this.createField(200, 560, '0', 5);

        let field_6: Field = this.createField(600, 200, 'a.(a.a.0+a.(a.0+b.a.0))+a.a.(a.0+b.a.0)', 6);

        this.createField(500, 320, 'a.a.0+a.(a.0+b.a.0)', 7);

        this.createField(700, 320, 'a.(a.0+b.a.0)', 8);

        this.createField(500, 440, 'a.0', 9);

        this.createField(700, 440, 'a.0+b.a.0', 10);

        this.createField(600, 560, '0', 11);
        
        // Arrows
        this.add.image(150,260, 'arrow').setTint(0xffff00).rotation += 2.3;

        this.add.image(250,260, 'arrow').setTint(0xffff00).rotation += 0.8;

        this.add.image(100,380, 'arrow').setTint(0xffff00).rotation += 1.57;

        this.add.image(200,380, 'arrow').setTint(0xff0000).rotation -= 2.6;

        this.add.image(300,380, 'arrow').setTint(0xffff00).rotation += 1.57;

        this.add.image(200,440, 'arrow').setTint(0xffff00).rotation -= 3.15;

        this.add.image(150,500, 'arrow').setTint(0xffff00).rotation += 0.8;

        this.add.image(250,500, 'arrow').setTint(0xffff00).rotation += 2.3;

        this.add.image(550,260, 'arrow').setTint(0xffff00).rotation += 2.3;

        this.add.image(650,260, 'arrow').setTint(0xffff00).rotation += 0.8;

        this.add.image(500,380, 'arrow').setTint(0xffff00).rotation += 1.57;

        this.add.image(600,380, 'arrow').setTint(0xffff00).rotation += 0.5;

        this.add.image(700,380, 'arrow').setTint(0xffff00).rotation += 1.57;

        this.add.image(600,440, 'arrow').setTint(0xff0000).rotation -= 3.15;

        this.add.image(550,500, 'arrow').setTint(0xffff00).rotation = 0.8;

        this.add.image(650,500, 'arrow').setTint(0xffff00).rotation = 2.3;

        //initialize the adjacency matrix
        this.connected = this.createConnections(12);
        this.connected[0][1] = 1;
        this.connected[0][2] = 1;
        this.connected[1][3] = 1;
        this.connected[2][4] = 1;
        this.connected[3][5] = 1;
        this.connected[4][1] = 1;
        this.connected[4][3] = 1;
        this.connected[4][5] = 1;
        this.connected[6][7] = 1;
        this.connected[6][8] = 1;
        this.connected[7][9] = 1;
        this.connected[7][10] = 1;
        this.connected[8][10] = 1;
        this.connected[9][11] = 1;
        this.connected[10][9] = 1;
        this.connected[10][11] = 1;

        // Initialize the observations matrix
        this.observations = this.createObservations(12);
        this.observations[0][1] = 'a';
        this.observations[0][2] = 'a';
        this.observations[1][3] = 'a';
        this.observations[2][4] = 'a';
        this.observations[3][5] = 'a';
        this.observations[4][1] = 'b';
        this.observations[4][3] = 'a';
        this.observations[4][5] = 'a';
        this.observations[6][7] = 'a';
        this.observations[6][8] = 'a';
        this.observations[7][9] = 'a';
        this.observations[7][10] = 'a';
        this.observations[8][10] = 'a';
        this.observations[9][11] = 'a';
        this.observations[10][9] = 'b';
        this.observations[10][11] = 'a';

        //create hero
        this.hero = new Hero(200, 200, field_0, this);

        // Create defender
        this.defender = new Defender(this.enemy, this); 
        // Create first defender
        this.defender.addEnemy(600, 200, field_6);


        
    }


    
}
