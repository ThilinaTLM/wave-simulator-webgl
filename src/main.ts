import "./style.css"
import {Simulator} from "./simulator";
import {CircularMotionAnimator, SineWaveAnimator, SoundWaveAnimator} from "./animator";

async function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
    const simulator = new Simulator({
        pixiOptions: {
            backgroundColor: 0xEEEEEE,
            resizeTo: window
        },
        className: "pixi-canvas",
        parentElement: document.body,
        particleGeneratorOptions: {
            distanceX: 8,
            distanceY: 8,
            size: 2,
            margins: {
                top: 100,
                bottom: 100,
                left: 100,
                right: 100
            }
        }
    })

    simulator.generate({ color: 0x111111 }) // generate particles grid
    // simulator.animator(new CircularMotionAnimator(5, 1/100, 1/100)); // set animator
    simulator.animator(new SineWaveAnimator(1/200, 1/400, 20)); // set animator
    simulator.animator(new SoundWaveAnimator(1/200, 1/400, 20)); // set animator
    simulator.start(); // start animation

}

main().then(r => console.log("done"));