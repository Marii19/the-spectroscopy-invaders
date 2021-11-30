

/** A class that shows credits scene. */
export default class credits extends Phaser.Scene
{

	constructor()
	{
		super("credits");
	}

	preload (){
        this.load.image('credits', 'assets/texts/credits.png');
        this.load.image('exit', 'assets/objects/exit.png');
    }

    create()
    {
        this.preload();
        this.add.image(400, 300, "credits");
        let close_button: Phaser.GameObjects.Image = this.add.image(750, 50, 'exit').setInteractive();

        close_button.on("pointerdown", function(){
            this.game.scene.sleep("credits");
            this.game.scene.start("main menu")
        }, this)
    }

    update(){

    }
}
