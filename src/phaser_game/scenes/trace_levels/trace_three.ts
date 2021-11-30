import Defender from "../../game_objects/defender";
import Field from "../../game_objects/field";
import Hero from "../../game_objects/hero";
import levelTrace from "../level_trace";


export default class traceThree extends levelTrace{

    constructor(){
        let instructions: string[] = ['trace', 'move observation info']
        super('trace three', 'a.b.(a.0+b.a.0)+a.(b.b.(a.0+b.a.0))', 'a.b.a.0+a.b.b.a.0', 'Trace', instructions);
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
       let field_0: Field  = this.createField(200, 200, 'a.b.(a.0+b.a.0)+a.(b.b.(a.0+b.a.0))', 0);

       this.createField(100, 320, 'b.(a.0+b.a.0)', 1);

       this.createField(300, 320, 'b.b.(a.0+b.a.0)', 2);
       
       this.createField(100, 440, 'a.0+b.a.0', 3);

       this.createField(300, 440, 'a.0', 4);

       this.createField(200, 560, '0', 5);

       let field_6: Field  = this.createField(600, 200, 'a.b.a.0+a.b.b.a.0', 6);

       this.createField(500, 320, 'b.a.0', 7);

       this.createField(700, 320, 'b.b.a.0', 8);

       this.createField(500, 440, 'a.0', 9);

       this.createField(600, 560, '0', 10);

        // Arrows
       this.createArrow(150, 260, 2.3, 0xFF8000);

       this.createArrow(250, 260, 0.9, 0xFF8000);

       this.createArrow(200, 320, 3.15, 0x0000FF);

       this.createArrow(100, 380, 1.575, 0x0000FF);

       this.createArrow(200, 440, 0, 0x0000FF);

       this.createArrow(150, 500, 0.9, 0xFF8000);

       this.createArrow(250, 500, 2.3, 0xFF8000);

       this.createArrow(550, 260, 2.3, 0xFF8000);

       this.createArrow(650, 260, 0.9, 0xFF8000);

       this.createArrow(600, 320, 3.15, 0x0000FF);

       this.createArrow(500, 380, 1.575, 0x0000FF);

       this.createArrow(550, 500, 0.9, 0xFF8000);

        // initialize the adjacency matrix
        this.connected = this.createConnections(11);
        this.connected[0][1] = 1;
        this.connected[0][2] = 1;
        this.connected[1][3] = 1;
        this.connected[2][1] = 1;
        this.connected[3][4] = 1;
        this.connected[3][5] = 1;
        this.connected[4][5] = 1;
        this.connected[6][7] = 1;
        this.connected[6][8] = 1;
        this.connected[7][9] = 1;
        this.connected[8][7] = 1;
        this.connected[9][10] = 1;

        // Initialize the observations matrix
        this.observations = this.createObservations(11);
        this.observations[0][1] = 'a';
        this.observations[0][2] = 'a';
        this.observations[1][3] = 'b';
        this.observations[2][1] = 'b';
        this.observations[3][4] = 'b';
        this.observations[3][5] = 'a';
        this.observations[4][5] = 'a';
        this.observations[6][7] = 'a';
        this.observations[6][8] = 'a';
        this.observations[7][9] = 'b';
        this.observations[8][7] = 'b';
        this.observations[9][10] = 'a';



        //create hero
        this.hero = new Hero(200, 200, field_0, this);

        // Create defender
        this.defender = new Defender(this.enemy, this); 
        // Create first enemy
        this.defender.addEnemy(600, 200, field_6);
    }
}
