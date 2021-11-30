/**
 * A class representing main menu in the spectroscopy invaders
 */
import Phaser from 'phaser'
export default class mainMenu extends Phaser.Scene{
    stars_positions: Map<string, number[]>;     // Map of start positions
    level_won: Map<string, boolean>;            // Map telling which levels are won
    previous_level: Map<string, string>;        // Maps levels to previous levels
    levels: Phaser.GameObjects.Image[];         // A list containing all levels names
    first_open: boolean;                        // Indicates whether this scene has e been opened before


    constructor(){
        super('main menu');
        this.stars_positions= new Map<string,number[]>();
        this.level_won = new Map<string, boolean>();
        this.previous_level = new Map<string, string>();
        this.levels = [];
        this.first_open = true;
    }

    preload(){
        this.load.image('trace', 'assets/backgrounds/menu_background/menu_background_trace.png');
        this.load.image('failure', 'assets/backgrounds/menu_background/menu_background_failure.png' )
        this.load.image('possible-futures', 'assets/backgrounds/menu_background/menu_background_possible_futures.png' )
        this.load.image('simulation', 'assets/backgrounds/menu_background/menu_background_simulation.png' )
        this.load.image('bisimulation', 'assets/backgrounds/menu_background/menu_background_bisimulation.png' )
        this.load.image('enter_trace', 'assets/objects/entrance/enter_trace.png');
        this.load.image('enter_failure', 'assets/objects/entrance/enter_failure.png');
        this.load.image('enter_possible_future', 'assets/objects/entrance/enter_possible_future.png');
        this.load.image('enter_simulation', 'assets/objects/entrance/enter_simulation.png');
        this.load.image('enter_bisimulation', 'assets/objects/entrance/enter_bisimulation.png');
        this.load.image('star', 'assets/objects/stars/star.png');
        this.load.image('star_empty', 'assets/objects/stars/star_empty.png');
        this.load.image('trace_observation', 'assets/texts/trace_observation.png');
        this.load.image('failure_observation', 'assets/texts/failure_observation.png');
        this.load.image('possible_future_observation', 'assets/texts/possible_future_observation.png');
        this.load.image('simulation_observation', 'assets/texts/simulation_observation.png');
        this.load.image('bisimulation_observation', 'assets/texts/bisimulation_observation.png')
        this.load.image('intro', 'assets/texts/intro.png');
        this.load.image("next_arrow", 'assets/objects/next_arrow.png');
        this.load.image('info', 'assets/actions/instructions.png');
    }

    create(){
        if(!this.first_open){
            return;
        }
        // Show intro
        let intro: Phaser.GameObjects.Image = this.add.image(400, 300, 'intro');
        let next_arrow: Phaser.GameObjects.Image = this.add.image(750, 550, 'next_arrow').setScale(1.3).setInteractive();

        next_arrow.on("pointerdown", function(){
            intro.destroy();
            next_arrow.destroy();
            // When intro closed, add levels
            this.addLevels();
        }, this);
        this.first_open = false;
    }

    update(){

    }

    /**
     * Adds levels to main menu, 5 seegments wwith 4 levels each
     */
    addLevels(): void{
        // Add backgrounds for each segment
        this.add.image(400, 60, 'trace').alpha = 0.9;
        this.add.image(400, 180, 'failure').alpha = 0.9;
        this.add.image(400, 300, 'possible-futures').setTint(0xFF7903).alpha = 0.7;
        this.add.image(400, 420, 'simulation').alpha = 0.8;
        this.add.image(400, 540, 'bisimulation').alpha = 0.9;

        //* TRACE SEGMENT
        // Title
        this.add.image(80, 60, 'trace_observation').setScale(0.9);

        // Levels
        let trace_one = this.add.image(250, 60, 'enter_trace').setInteractive().setName("trace one");
        this.levels.push(trace_one);
        trace_one.on('pointerdown', this.startScene, {game: this.game, level: "trace one", menu: this});
        // Add empty stars
        this.add.image(230, 100, 'star_empty');
        this.add.image(270, 100, 'star_empty');
        // Save position of first star like [x, y]
        this.stars_positions.set("trace one", [230,100])
        this.level_won.set("trace one", false);

        let trace_two = this.add.image(400, 60, 'enter_trace').setInteractive().setName("trace two");
        this.levels.push(trace_two);
        // Disable level
        trace_two.setTint(0x5C5C5C);
        trace_two.setAlpha(0.7);
        trace_two.on('pointerdown', this.startScene, {game: this.game, level: "trace two", menu: this});
        this.add.image(380, 100, 'star_empty');
        this.add.image(420, 100, 'star_empty');
        this.stars_positions.set("trace two", [380,100]);
        this.level_won.set("trace two", false);
        this.previous_level.set("trace two", "trace one");

        let trace_three = this.add.image(550, 60, 'enter_trace').setInteractive().setName("trace three");
        this.levels.push(trace_three);
        trace_three.setTint(0x5C5C5C);
        trace_three.setAlpha(0.7);
        trace_three.on('pointerdown', this.startScene, {game: this.game, level: "trace three", menu: this});
        this.add.image(530, 100, 'star_empty');
        this.add.image(570, 100, 'star_empty');
        this.stars_positions.set("trace three", [530,100]);
        this.level_won.set("trace three", false);
        this.previous_level.set("trace three", "trace two");

        let trace_four = this.add.image(700, 60, 'enter_trace').setInteractive().setName("trace four");
        this.levels.push(trace_four);
        trace_four.setTint(0x5C5C5C);
        trace_four.setAlpha(0.7);
        trace_four.on('pointerdown', this.startScene, {game: this.game, level: "trace four", menu: this});
        this.add.image(680, 100, 'star_empty');
        this.add.image(720, 100, 'star_empty');
        this.stars_positions.set("trace four", [680, 100]);
        this.level_won.set("trace four", false);
        this.previous_level.set("trace four", "trace three");


        // *FAILURE SEGMENT

        // Title
        this.add.image(80, 180, 'failure_observation').setScale(0.9);

        // Levels
        let failure_one = this.add.image(250, 180, 'enter_failure').setInteractive().setName("failure one");
        this.levels.push(failure_one);
        failure_one.setTint(0x5C5C5C);
        failure_one.setAlpha(0.7);
        failure_one.on('pointerdown', this.startScene, {game: this.game, level: "failure one", menu: this});
        this.add.image(230, 220, 'star_empty');
        this.add.image(270, 220, 'star_empty');
        this.stars_positions.set("failure one", [230,220]);
        this.level_won.set("failure one", false);
        this.previous_level.set("failure one", "trace four");

        let failure_two = this.add.image(400, 180, 'enter_failure').setInteractive().setName("failure two");
        this.levels.push(failure_two);
        failure_two.setTint(0x5C5C5C);
        failure_two.setAlpha(0.7);
        failure_two.on('pointerdown', this.startScene, {game: this.game, level: "failure two", menu: this});
        this.add.image(380, 220, 'star_empty');
        this.add.image(420, 220, 'star_empty');
        this.stars_positions.set("failure two", [380, 220]);
        this.level_won.set("failure two", false);
        this.previous_level.set("failure two", "failure one");

        let failure_three = this.add.image(550, 180, 'enter_failure').setInteractive().setName("failure three");
        this.levels.push(failure_three);
        failure_three.setTint(0x5C5C5C);
        failure_three.setAlpha(0.7);
        failure_three.on('pointerdown', this.startScene, {game: this.game, level: "failure three", menu: this});
        this.add.image(530, 220, 'star_empty');
        this.add.image(570, 220, 'star_empty');
        this.stars_positions.set("failure three", [530, 220]);
        this.level_won.set("failure three", false);
        this.previous_level.set("failure three", "failure two");

        let failure_four = this.add.image(700, 180, 'enter_failure').setInteractive().setName("failure four");
        this.levels.push(failure_four);
        failure_four.setTint(0x5C5C5C);
        failure_four.setAlpha(0.7);
        failure_four.on('pointerdown', this.startScene, {game: this.game, level: "failure four", menu: this});
        this.add.image(680, 220, 'star_empty');
        this.add.image(720, 220, 'star_empty');
        this.stars_positions.set("failure four", [680, 220]);
        this.level_won.set("failure four", false);
        this.previous_level.set("failure four", "failure three");


        // *POSSIBLE-FUTURE SEGMENT

        // Title
        this.add.image(80, 300, 'possible_future_observation').setScale(0.9);

        // Levels
        let posibble_future_one = this.add.image(250, 300, 'enter_possible_future').setInteractive().setName("possible-future one");
        this.levels.push(posibble_future_one);
        posibble_future_one.setTint(0x5C5C5C);
        posibble_future_one.setAlpha(0.7);
        posibble_future_one.on('pointerdown', this.startScene, {game: this.game, level: "possible-future one", menu: this});
        this.add.image(230, 340, 'star_empty');
        this.add.image(270, 340, 'star_empty');
        this.stars_positions.set("possible-future one", [230, 340]);
        this.level_won.set("possible-future one", false);
        this.previous_level.set("possible-future one", "failure four");

        let posibble_future_two = this.add.image(400, 300, 'enter_possible_future').setInteractive().setName("possible-future two");
        this.levels.push(posibble_future_two);
        posibble_future_two.setTint(0x5C5C5C);
        posibble_future_two.setAlpha(0.7);
        posibble_future_two.on('pointerdown', this.startScene, {game: this.game, level: "possible-future two", menu: this});
        this.add.image(380, 340, 'star_empty');
        this.add.image(420, 340, 'star_empty');
        this.stars_positions.set("possible-future two", [380, 340]);
        this.level_won.set("possible-future two", false);
        this.previous_level.set("possible-future two", "possible-future one");

        let posibble_future_three = this.add.image(550, 300, 'enter_possible_future').setInteractive().setName("possible-future three");
        this.levels.push(posibble_future_three);
        posibble_future_three.setTint(0x5C5C5C);
        posibble_future_three.setAlpha(0.7);
        posibble_future_three.on('pointerdown', this.startScene, {game: this.game, level: "possible-future three", menu: this});
        this.add.image(530, 340, 'star_empty');
        this.add.image(570, 340, 'star_empty');
        this.stars_positions.set("possible-future three", [530, 340]);
        this.level_won.set("possible-future three", false);
        this.previous_level.set("possible-future three", "possible-future two");

        let posibble_future_four = this.add.image(700, 300, 'enter_possible_future').setInteractive().setName("possible-future four");
        this.levels.push(posibble_future_four);
        posibble_future_four.setTint(0x5C5C5C);
        posibble_future_four.setAlpha(0.7);
        posibble_future_four.on('pointerdown', this.startScene, {game: this.game, level: "possible-future four", menu: this});
        this.add.image(680, 340, 'star_empty');
        this.add.image(720, 340, 'star_empty');
        this.stars_positions.set("possible-future four", [680, 340]);
        this.level_won.set("possible-future four", false);
        this.previous_level.set("possible-future four", "possible-future three");

        //* SIMULATION SEGMENT

        // Title
        this.add.image(80, 420, 'simulation_observation').setScale(0.9);

        // Levels
        let simulation_one = this.add.image(250, 420, 'enter_simulation').setInteractive().setName("simulation one");
        this.levels.push(simulation_one);
        simulation_one.setTint(0x5C5C5C);
        simulation_one.setAlpha(0.7);
        simulation_one.on('pointerdown', this.startScene, {game: this.game, level: "simulation one", menu: this});
        this.add.image(230, 460, 'star_empty');
        this.add.image(270, 460, 'star_empty');
        this.stars_positions.set("simulation one", [230, 460]);
        this.level_won.set("simulation one", false);
        this.previous_level.set("simulation one", "possible-future four");

        let simulation_two = this.add.image(400, 420, 'enter_simulation').setInteractive().setName("simulation two");
        this.levels.push(simulation_two);
        simulation_two.setTint(0x5C5C5C);
        simulation_two.setAlpha(0.7);
        simulation_two.on('pointerdown', this.startScene, {game: this.game, level: "simulation two", menu: this});
        this.add.image(380, 460, 'star_empty');
        this.add.image(420, 460, 'star_empty');
        this.stars_positions.set("simulation two", [380, 460]);
        this.level_won.set("simulation two", false);
        this.previous_level.set("simulation two", "simulation one");

        let simulation_three = this.add.image(550, 420, 'enter_simulation').setInteractive().setName("simulation three");
        this.levels.push(simulation_three);
        simulation_three.setTint(0x5C5C5C);
        simulation_three.setAlpha(0.7);
        simulation_three.on('pointerdown', this.startScene, {game: this.game, level: "simulation three", menu: this});
        this.add.image(530, 460, 'star_empty');
        this.add.image(570, 460, 'star_empty');
        this.stars_positions.set("simulation three", [530, 460]);
        this.level_won.set("simulation three", false);
        this.previous_level.set("simulation three", "simulation two");

        let simulation_four = this.add.image(700, 420, 'enter_simulation').setInteractive().setName("simulation four");
        this.levels.push(simulation_four);
        simulation_four.setTint(0x5C5C5C);
        simulation_four.setAlpha(0.7);
        simulation_four.on('pointerdown', this.startScene, {game: this.game, level: "simulation four", menu: this});
        this.add.image(680, 460, 'star_empty');
        this.add.image(720, 460, 'star_empty');
        this.stars_positions.set("simulation four", [680, 460]);
        this.level_won.set("simulation four", false);
        this.previous_level.set("simulation four", "simulation three");

        // *BISIMULATION SEGMENT

        // Title
        this.add.image(80, 540, 'bisimulation_observation').setScale(0.9);

        // Levels
        let bisimulation_one = this.add.image(250, 540, 'enter_bisimulation').setInteractive().setName("bisimulation one");
        this.levels.push(bisimulation_one);
        bisimulation_one.setTint(0x5C5C5C);
        bisimulation_one.setAlpha(0.7);
        bisimulation_one.on('pointerdown', this.startScene, {game: this.game, level: "bisimulation one", menu: this});
        this.add.image(230, 580, 'star_empty');
        this.add.image(270, 580, 'star_empty');
        this.stars_positions.set("bisimulation one", [230, 580]);
        this.level_won.set("bisimulation one", false);
        this.previous_level.set("bisimulation one", "simulation four");

        let bisimulation_two = this.add.image(400, 540, 'enter_bisimulation').setInteractive().setName("bisimulation two");
        this.levels.push(bisimulation_two);
        bisimulation_two.setTint(0x5C5C5C);
        bisimulation_two.setAlpha(0.7);
        bisimulation_two.on('pointerdown', this.startScene, {game: this.game, level: "bisimulation two", menu: this});
        this.add.image(380, 580, 'star_empty');
        this.add.image(420, 580, 'star_empty');
        this.stars_positions.set("bisimulation two", [380, 580]);
        this.level_won.set("bisimulation two", false);
        this.previous_level.set("bisimulation two", "bisimulation one");

        let bisimulation_three = this.add.image(550, 540, 'enter_bisimulation').setInteractive().setName("bisimulation three");
        this.levels.push(bisimulation_three);
        bisimulation_three.setTint(0x5C5C5C);
        bisimulation_three.setAlpha(0.7);
        bisimulation_three.on('pointerdown', this.startScene, {game: this.game, level: "bisimulation three", menu: this});
        this.add.image(530, 580, 'star_empty');
        this.add.image(570, 580, 'star_empty');
        this.stars_positions.set("bisimulation three", [530, 580]);
        this.level_won.set("bisimulation three", false);
        this.previous_level.set("bisimulation three", "bisimulation two");

        let bisimulation_four = this.add.image(700, 540, 'enter_bisimulation').setInteractive().setName("bisimulation four");
        this.levels.push(bisimulation_four);
        bisimulation_four.setTint(0x5C5C5C);
        bisimulation_four.setAlpha(0.7);
        bisimulation_four.on('pointerdown', this.startScene, {game: this.game, level: "bisimulation four", menu: this});
        this.add.image(680, 580, 'star_empty');
        this.add.image(720, 580, 'star_empty');
        this.stars_positions.set("bisimulation four", [680, 580]);
        this.level_won.set("bisimulation four", false);
        this.previous_level.set("bisimulation four", "bisimulation three");

        // Add credits button
        let credits_button: Phaser.GameObjects.Image = this.add.image(760, 50, 'info').setInteractive().setName("credits");
        credits_button.on('pointerdown', function(){
            this.game.scene.sleep('main menu');
            this.game.scene.start('credits');
        }, this);
    }

    /**
     * Stops main menu and opens a level, only if previous level is won
     * @param this level to open
     */
    startScene(this): void{
        if(this.level != "trace one" && this.menu.previous_level){
            let previous_level = this.menu.previous_level.get(this.level)
            if(this.menu.level_won.get(previous_level)){
                this.game.scene.sleep('main menu');
                this.game.scene.start(this.level, {main_menu: this.menu});
            }
        }else{
            this.game.scene.sleep('main menu');
            this.game.scene.start(this.level, {main_menu: this.menu});
        }
    }

    /**
     * Add as many stars as the player has recieved for the level and  unlock next level
     * @param stars_number number of stars
     * @param level_name level name
     */
    updateStars(stars_number: number, level_name: string): void{ 
        let first_star_position: number[] = this.stars_positions.get(level_name);
        let x: number = first_star_position[0];
        let y: number = first_star_position[1];
        for(let i =0; i < stars_number; i++){
            this.add.image(x, y, 'star');
            x += 40;
        }
        this.level_won.set(level_name, true);

        if(level_name != "bisimulation four"){
            let current_level: Phaser.GameObjects.Image = this.levels.find(elem => elem.name == level_name);
            let next_level: Phaser.GameObjects.Image = this.levels[this.levels.indexOf(current_level) + 1]
            next_level.clearTint();
            next_level.setAlpha(1);
        }
    }


}
