import levelBasic from "./level_basic"

/** A class representing trace levels. All trace levels inherit from this class. */
export default class levelTrace extends levelBasic
{

	constructor(name: string, hero: string, defender: string, observation: string, instructions: string[])
	{
		super(name, hero, defender, observation, instructions); 
	}

	preload (){
        super.preload()
    }

    create()
    {
        super.create();
    }
}
