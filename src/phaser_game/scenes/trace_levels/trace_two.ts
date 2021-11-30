import hmlFormula from "../../../backend/formulas/hml-formula";
import Defender from "../../game_objects/defender";
import Field from "../../game_objects/field";
import Hero from "../../game_objects/hero";
import levelTrace from "../level_trace";


export default class traceTwo extends levelTrace{

    constructor(){
        let instructions: string[] = ['trace', 'move observation info']
        super('trace two', 'a.(a.0+a.(a.0+a.a.0))+a.(a.0+a.a.0)', 'a.a.0', 'Trace', instructions);
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
        let field_0: Field = this.createField(200, 200, 'a.(a.0+a.(a.0+a.a.0))+a.(a.0+a.a.0)', 0);

        this.createField(100, 320, 'a.0+a.(a.0+a.a.0)', 1);

        this.createField(300, 320, 'a.0+a.a.0', 2);

        this.createField(100, 440, '0', 3);
        
        this.createField(200, 440, '0', 4);

        this.createField(300, 440, 'a.0', 5);

        this.createField(300, 560, '0', 6);

        let field_7: Field = this.createField(600, 200, 'a.a.0', 7);

        this.createField(600, 320, 'a.0', 8);

        this.createField(600, 440, '0', 9);

        // Arrows
        this.createArrow(150, 260, 2.3, 0xFF8000);

        this.createArrow(250, 260, 0.9, 0xFF8000);

        this.createArrow(200, 320, 0, 0xFF8000);

        this.createArrow(100, 380, 1.575, 0xFF8000);

        this.createArrow(250, 380, 2.3, 0xFF8000);

        this.createArrow(300, 380, 1.575, 0xFF8000);

        this.createArrow(300, 500, 1.575, 0xFF8000);

        this.createArrow(600, 260, 1.575, 0xFF8000);

        this.createArrow(600, 380, 1.575, 0xFF8000);

        //initialize the adjacency matrix
        this.connected = this.createConnections(10);
        this.connected[0][1] = 1;
        this.connected[0][2] = 1;
        this.connected[1][2] = 1;
        this.connected[1][3] = 1;
        this.connected[2][4] = 1;
        this.connected[2][5] = 1;
        this.connected[5][6] = 1;
        this.connected[7][8] = 1;
        this.connected[8][9] = 1;

        // Initialize the observations matrix
        this.observations = this.createObservations(10);
        this.observations[0][1] = 'a';
        this.observations[0][2] = 'a';
        this.observations[1][2] = 'a';
        this.observations[1][3] = 'a';
        this.observations[2][4] = 'a';
        this.observations[2][5] = 'a';
        this.observations[5][6] = 'a';
        this.observations[7][8] = 'a';
        this.observations[8][9] = 'a';


        //create hero
        this.hero = new Hero(200, 200, field_0, this);

        // Create defender
        this.defender = new Defender(this.enemy, this); 
        this.defender.addEnemy(600, 200, field_7);
    }


    
}
