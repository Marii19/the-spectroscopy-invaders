import levelBasic from "./level_basic"

/**
 * A class representing all other levels than trace levels. All non-trace levels inherit from this class. Additionally adds negation and conjunct activities features
 */
export default class level extends levelBasic
{

    /**
     * 
     * @param name name of the level
     * @param hero hero instance
     * @param defender defender instance
     * @param observation observation language
     * @param instructions instructions for the level
     */
	constructor(name: string, hero: string, defender: string, observation: string, instructions: string[])
	{
		super(name, hero, defender, observation, instructions);
	}

	preload (){
        this.load.image('swap', 'assets/actions/swap.png');
        this.load.image('conjunction', 'assets/actions/conjunction.png');
        this.load.image('negation','assets/texts/negation.png');
        this.load.image('conjunct_challenge','assets/texts/conjunct_challenge.png');
        this.load.image('conjunct_warning','assets/texts/conjunction_warning.png');
        this.load.image('negation_warning','assets/texts/negation_warning.png');
        super.preload();
    }

    create()
    {
        
        super.create();

        this.fields = [];

        // Swap button  for negation activity  
        let swapButton = this.add.sprite(350, 125, 'swap').setInteractive().setScale(0.6);
        this.swapButton = swapButton;
        let negation_text = this.add.image(350, 80, 'negation');
        let negation_warning = this.add.image(350, 170, 'negation_warning');
        negation_text.alpha = 0;
        negation_warning.alpha = 0;
        swapButton.on('pointerdown', function(){
            this.hero.negationActivity();
        }, this);
        swapButton.on('pointerover', function(){
            swapButton.alpha = 0.6;
            negation_text.alpha = 1;
            // If more than one defender show warning
            if(this.defender.enemies.length >1){
                negation_warning.alpha = 1;
            }
            
        }, this);
        swapButton.on('pointerout', function(){
            negation_text.alpha = 0;
            negation_warning.alpha = 0;
            swapButton.alpha = 1;
        });

        // Button for conjunct activity (not created for first and second levels of failure segment)
        if(this.name != "failure one" && this.name != "failure two"){
            let conjunctionChallengeButton = this.add.sprite(450, 120, 'conjunction').setInteractive().setScale(0.6);
            this.conjunctionChallengeButton = conjunctionChallengeButton;
            let conjunct_challenge_text = this.add.image(450, 80, 'conjunct_challenge');
            let conjunct_warning = this.add.image(450, 160, 'conjunct_warning');
            conjunct_challenge_text.alpha = 0;
            conjunct_warning.alpha = 0;
            conjunctionChallengeButton.on('pointerdown', function(){
                this.hero.conjunctChallengeActivity();
            }, this);
            conjunctionChallengeButton.on('pointerover', function(){
                conjunctionChallengeButton.alpha = 0.6;
                conjunct_challenge_text.alpha = 1;

                // If only one defender show warning
                if(this.defender.enemies.length==1){
                    conjunct_warning.alpha = 1;
                }
            }, this);
            conjunctionChallengeButton.on('pointerout', function(){
                conjunctionChallengeButton.alpha = 1;
                conjunct_challenge_text.alpha = 0;
                conjunct_warning.alpha = 0;
            });
        }
        
        
    }

    /**
     * Disable all fields & action buttons
     */
    disableAll(): void{
        super.disableAll()
        // Disable action buttons
        if(this.name != "failure one" && this.name != "failure two"){
            this.conjunctionChallengeButton.disableInteractive();
        }
        this.swapButton.disableInteractive();
    }

    /**
     * Enable all fields & action buttons
     */
    enableAll(): void{
        super.enableAll()
        // Enable action buttons
        if(this.name != "failure one" && this.name != "failure two"){
            this.conjunctionChallengeButton.setInteractive();
        }
        this.swapButton.setInteractive();
    }    
}
