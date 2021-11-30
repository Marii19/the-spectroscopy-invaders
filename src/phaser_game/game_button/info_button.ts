import levelBasic from "../scenes/level_basic";
import Button from "./basic_button";

/**
 * A class for instruction button in each level
 */
export default class InfoButton extends Button{
current_instruction: Phaser.GameObjects.Image;      // currently displayed instruction
instructions: string[];                             // array containing all instructions to show
current_video: Phaser.GameObjects.Video;            // currently displayed video

    /**
     * 
     * @param game_scene 
     * @param instructions what instructions to display
     */
    constructor(game_scene: levelBasic, instructions: string[]){
        // Call basic button constructor 
        super(750, 130, 'info_instructions', game_scene);
        
        // Scale button
        this.button.setScale(1.5);

        this.instructions = instructions;

        // Add on click event
        this.addOnClickEvent();
    }

    /**
     * Adds on click listener that shows instruction for current level
     */
    addOnClickEvent(): void{
        this.button.on('pointerdown', function(){
            // Get current instruction and put it back at the end of instructions array
            let instruction: string = this.instructions.shift();
            this.game_scene.disableAll();
            this.instructions.push(instruction);

            // Firstly, show instructions for current segment
            this.showSegmentInfo();
            
            // Creates arrow, clicking on it shows further instructions (for example game activities)
            let next_arrow: Phaser.GameObjects.Image = this.game_scene.add.image(750, 550, 'next_arrow').setScale(1.3).setInteractive();
            
            // On flick, distroy current instructions/video and show next
            next_arrow.on('pointerdown', function(){
                let instruction: string = this.instructions.shift();
                this.instructions.push(instruction);
                this.current_instruction.destroy();
                if(this.current_video != undefined){
                    this.current_video.destroy();
                }
                this.showInfo(instruction);
                next_arrow.depth = 1;
            }, this)

            // Close instructions button
            let close_instructions: Phaser.GameObjects.Sprite = this.game_scene.add.sprite(780, 20, 'exit').setInteractive();
            close_instructions.depth = 1;
            close_instructions.on("pointerdown", function(){
                this.current_instruction.destroy();
                if(this.current_video != undefined){
                this.current_video.destroy();
                }
                next_arrow.destroy();
                close_instructions.destroy();
                this.game_scene.enableAll();
            }, this);
        }, this);
    }

    /**
     * Show chosen instruction
     * @param instruction 
     */
    showInfo(instruction: string){
        // If it is activity  instruction
        if(instruction.substring(0,4) == 'move'){
            this.showMoveInfos(instruction)
        }else{
            this.showSegmentInfo()
        }

    }

    /**
     * Creates sprite containing current segment instructions
     */
    showSegmentInfo(): void{
        let instructions: Phaser.GameObjects.Image;
        switch(this.game_scene.observation){
            case 'Trace':{
                instructions = this.game_scene.add.image(400, 300, 'trace_instructions');
                break;
            }
            case 'Failure':{
                if(this.game_scene.name == "failure one" || this.game_scene.name == "failure two"){
                    instructions = this.game_scene.add.image(400, 300, 'failure_instructions_negation');
                }else{
                    instructions = this.game_scene.add.image(400, 300, 'failure_instructions');
                }
                break;
            }
            case 'Possible-future':{
                instructions = this.game_scene.add.image(400, 300, 'possible_future_instructions');
                break;
            }
            case 'Simulation':{
                instructions = this.game_scene.add.image(400, 300, 'simulation_instructions');
                break;
            }
            case 'Bisimulation':{
                instructions = this.game_scene.add.image(400, 300, 'bisimulation_instructions');
                break;
            }
        }
        this.current_instruction = instructions;
    }

    /**
     * Creates sprite and video for chosen activity instructions
     * @param info instruction to display
     */
    showMoveInfos(info: string): void{
        this.current_instruction = this.game_scene.add.image(400, 300, info);
        this.current_video= this.game_scene.add.video(400, 200, info + ' video').setScale(0.4);
        this.current_video.play(true);
        
    }
}