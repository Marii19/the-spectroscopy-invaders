import Phaser from 'phaser'
import MainMenuButton from '../game_button/main_menu_button';
import RestartButton from '../game_button/restart_button';
import InfoButton from '../game_button/info_button';
import Field from '../game_objects/field';
import Defender from '../game_objects/defender';
import Spectroscopy from '../spectroscopy';
import Hero from '../game_objects/hero';

/**
 * A class that represents basic levels in the spectroscopy invaders. All levels in the game inherit from this class. Inherits from Phaser.Scene
 */
export default class levelBasic extends Phaser.Scene
{
    hero: Hero;                         // Hero instance
    defender: Defender;                 // Defender instance

    connected: number[][];              // Matrix telling which fields are connected
    observations: string[][];           // Matrix containing all actions
    fields: Field[];                    // Array containing all fields
    enemy;                              // Name of enemy to create sprite with right elve figure
    name: string;                       // Level's name
    hero_term: string;                  // Hero's starting CCS term
    defender_term: string;              // Defender's starting CCS term
    observation: string;                // Name of the level's segment
    spectroscopy: Spectroscopy;         // Spectroscopy instance
    restartButton;
    restart_level_button: RestartButton;
    swapButton: Phaser.GameObjects.Sprite;
    conjunctionChallengeButton: Phaser.GameObjects.Sprite;
    main_menu_button: MainMenuButton;
    info_button: InfoButton;
    instructions: string[];             // Instrutions for that level that arre displayed after clicking on the info  button



    /**
     * 
     * @param name level's name
     * @param hero hero instance
     * @param defender defender instanz
     * @param observation observation language
     * @param instructions instructions for the level
     */
	constructor(name: string, hero: string, defender: string, observation: string, instructions: string[])
	{
		super(name); 
        this.name = name;
        this.hero_term = hero;
        this.defender_term = defender;
        this.observation = observation;
        this.instructions = instructions;
	}

	preload (){
        // Preload all images, spritesheets and videos
        this.load.image('field', 'assets/objects/state.png');
        this.load.image('field_original', 'assets/objects/state_old.png');
        this.load.image('arrow', 'assets/objects/arrow.png');
        this.load.spritesheet('hero', 'assets/characters/hero_male.png', { frameWidth: 32, frameHeight: 48 });
        this.load.image('gameover_background', 'assets/objects/gameover_background.png');
        this.load.image('main_menu', 'assets/objects/entrance/main_menu.png')
        this.load.image('game_over', 'assets/texts/game_over.png');
        this.load.image('menu', 'assets/texts/menu.png');
        this.load.image('lost', 'assets/texts/lost.png');
        this.load.image('won', 'assets/texts/won.png');
        this.load.image('next', 'assets/texts/next.png');
        this.load.image('restart', 'assets/texts/restart.png');
        this.load.image('read instructions', 'assets/texts/read_instructions.png');
        this.load.image('star', 'assets/objects/stars/star.png');
        this.load.image('star_empty', 'assets/objects/stars/star_empty.png');
        this.load.image('menu_text', 'assets/texts/menu_text.png');
        this.load.image('continue', 'assets/texts/continue.png');
        this.load.image('restart_button', 'assets/objects/restart.png');
        this.load.image('prelost_background', 'assets/texts/game_pre_lost.png');
        this.load.image('beatable_conjunctions', 'assets/texts/beatable_conjunctions.png');
        this.load.image('beatable_negations', 'assets/texts/beatable_negations.png');
        this.load.image('beatable_negations_height', 'assets/texts/beatable_negations_height.png');
        this.load.image('beatable_observations', 'assets/texts/beatable_observations.png');
        this.load.image('info', 'assets/texts/info.png');
        this.load.image('perfect', 'assets/texts/perfect.png');
        this.load.image('nice', 'assets/texts/nice.png');
        this.load.image('try_again', 'assets/texts/try_again.png');
        this.load.image('exceeded_observation', 'assets/texts/exceeded_observation.png');
        this.load.image('trace_instructions', 'assets/texts/instructions/trace_instructions.png');
        this.load.image('failure_instructions', 'assets/texts/instructions/failure_instructions.png');
        this.load.image('failure_instructions_negation', 'assets/texts/instructions/failure_instructions_negation.png');
        this.load.image('possible_future_instructions', 'assets/texts/instructions/possible_future_instructions.png');
        this.load.image('simulation_instructions', 'assets/texts/instructions/simulation_instructions.png');
        this.load.image('bisimulation_instructions', 'assets/texts/instructions/bisimulation_instructions.png');
        this.load.image('exit', 'assets/objects/exit.png');
        this.load.image('info_instructions', 'assets/actions/instructions.png');
        this.load.image('enemy_soul', 'assets/objects/originals/manes.png');
        this.load.image('done_button', 'assets/objects/prompt_yes.png');
        this.load.video('observation_video', "assets/videos/observation.mkv");    
        this.load.image('move observation info', 'assets/texts/instructions/observation_move.png');
        this.load.image('info button at levels', 'assets/texts/instructions/info_button_at_levels.png');
        this.load.image('move conjunct info', 'assets/texts/instructions/conjunct_challenge_move.png');
        this.load.image('move negation info', 'assets/texts/instructions/negation_move.png');
        this.load.video('move negation info video', "assets/videos/negation_move.mp4");
        this.load.video('move conjunct info video', "assets/videos/conjunct_move.mp4");
        this.load.video('move observation info video', 'assets/videos/observation_move.mp4');
    }

    create()
    {
        // Restart to fresh settings (in case of restarting level)
        this.fields = [];

        // Main menu button
        this.main_menu_button= new MainMenuButton(this);

        // Restart button
        this.restart_level_button = new RestartButton(this);
        
        // Info button
        this.info_button = new InfoButton(this, this.instructions);

        // Spectroscopy
        this.spectroscopy = new Spectroscopy(this.hero_term, this.defender_term, this.observation, this);
    
    }

    /**
     * Creates field on board 
     * @params x-position, y-position, term, field number
     */
     createField(x, y, term, field_number): Field{
        let field: Field = new Field(x, y, term, field_number, this);
        return field;
    }

    /**
     * Creates an arrow image on the board
     * @param x x-position
     * @param y y-position
     * @param rotation rotation of the arrow
     * @param color arrow's color as hexa
     */
    createArrow(x, y, rotation, color): void{
        let arrow = this.add.image(x, y, 'arrow');
        arrow.rotation = arrow.rotation + rotation;
        arrow.setTint(color);
    }

    /**
     * Returns a field from given number 
     * @param number 
     * @returns field
     */
     getFieldFromNumber(number: number): Field{
        for(let field of this.fields){
            if(field.field_number == number){
                return field;
            }
        }
    }

    /**
     * Creates a matrix containing information what fields are connected with what observations
     * @param fieldsNumber number of fileds
     * @returns 
     */
    createObservations(fieldsNumber: number): string[][]{     
        let observations: string[][] = [];
        for(let i = 0; i < fieldsNumber; i++){
            let observation: string[] = []
            for(let j = 0; j < fieldsNumber; j++){
                observation.push('');
            } 
            observations.push(observation)
        }
        return observations;
    }

    /**
     * Creates adjacency matrix
     * @param fieldsNumber number of fields
     * @returns 
     */
    createConnections(fieldsNumber: number): number[][]{    
        let observations: number[][] = [];
        for(let i = 0; i< fieldsNumber; i++){
            let observation: number[] = []
            for(let j =0; j< fieldsNumber; j++){
                let temp = 0;
                observation.push(temp);
            }
            observations.push(observation)
        }
        return observations;
    }

    /**
     * Disables all fields
     */
     disableFields(): void{
        for(let field of this.fields){
              field.sprite.disableInteractive();
        } 
     }
 
     /**
      * Enables all fields
      */
     enableFields(): void{
         for(let field of this.fields){
             field.sprite.setInteractive();
         } 
     }
    
    /**
     * Disable all sprites in the level 
     */
    disableAll(): void{
        // Disable fields
        this.disableFields();
        this.main_menu_button.button.disableInteractive();
        this.info_button.button.disableInteractive();
        this.restart_level_button.button.disableInteractive();
    }

    /**
     * Enable all sprites in the level
     */
    enableAll(): void{
        // enable fields
        this.enableFields();
        this.main_menu_button.button.setInteractive();
        this.info_button.button.setInteractive();
        this.restart_level_button.button.setInteractive();
    }
}
