import Phaser from 'phaser';
import config from './config';
import mainMenu from './phaser_game/scenes/main_menu'
import traceOne from './phaser_game/scenes/trace_levels/trace_one'
import traceTwo from './phaser_game/scenes/trace_levels/trace_two';
import traceThree from './phaser_game/scenes/trace_levels/trace_three'
import traceFour from './phaser_game/scenes/trace_levels/trace_four';
import failureOne from './phaser_game/scenes/failure_levels/failure_one';
import failureTwo from './phaser_game/scenes/failure_levels/failure_two';
import failureThree from './phaser_game/scenes/failure_levels/failure_three';
import failureFour from './phaser_game/scenes/failure_levels/failure_four';
import possibleFutureOne from './phaser_game/scenes/possible_future_levels/possible_future_one';
import possibleFutureTwo from './phaser_game/scenes/possible_future_levels/possible_future_two';
import possibleFutureThree from './phaser_game/scenes/possible_future_levels/possible_future_three';
import possibleFutureFour from './phaser_game/scenes/possible_future_levels/possible_future_four';
import simulationOne from './phaser_game/scenes/simulation_levels/simulation_one';
import simulationTwo from './phaser_game/scenes/simulation_levels/simulation_two';
import simulationThree from './phaser_game/scenes/simulation_levels/simulation_three';
import simulationFour from './phaser_game/scenes/simulation_levels/simulation_four';
import bisimulationOne from './phaser_game/scenes/bisimulation_levels/bisimulation_one';
import bisimulationTwo from './phaser_game/scenes/bisimulation_levels/bisimulation_two';
import bisimulationThree from './phaser_game/scenes/bisimulation_levels/bisimulation_three';
import bisimulationFour from './phaser_game/scenes/bisimulation_levels/bisimulation_four';
import credits from './phaser_game/scenes/credits';

// Creates game containing all levels and main menu scenes
new Phaser.Game(
  Object.assign(config, {
    scene: [mainMenu, credits,
            traceOne, traceTwo, traceThree, traceFour, 
            failureOne, failureTwo, failureThree, failureFour, 
            possibleFutureOne, possibleFutureTwo, possibleFutureThree, possibleFutureFour, 
            simulationOne, simulationTwo, simulationThree, simulationFour, 
            bisimulationOne, bisimulationTwo, bisimulationThree, bisimulationFour]
  })
);




