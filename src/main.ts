import "./style.css"
import {Simulator} from "./simulator";
import {SineWaveAnimator} from "./animator";

function main() {
    const simulator = new Simulator({
        pixiOptions: {
            backgroundColor: 0xeeeeee,
            resizeTo: window
        },
        className: "pixi-canvas",
        parentElement: document.body,
    })

    simulator.generate({
        distanceX: 8,
        distanceY: 8,
        size: 2,
        color: 0xFF0000,
        margins: {
            top: 150,
            bottom: 50,
            left: 0,
            right: 0
        }
    })

    const sineWaveAnimator = new SineWaveAnimator(1/400, 1/800, 50);
    simulator.animator(sineWaveAnimator);

    simulator.start();
}

main();