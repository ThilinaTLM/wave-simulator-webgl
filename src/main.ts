import "./style.css"
import {Simulator} from "./simulator";
import {SineWaveAnimator, SoundWaveAnimator} from "./animator";

async function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
    const simulator = new Simulator({
        pixiOptions: {
            backgroundColor: 0xeeeeee,
            resizeTo: window
        },
        className: "pixi-canvas",
        parentElement: document.body,
        particleGeneratorOptions: {
            distanceX: 8,
            distanceY: 8,
            size: 2,
            color: 0xFF0000,
            margins: {
                top: 150,
                bottom: 50,
                left: -200,
                right: -200
            }
        }
    })

    simulator.generate() // generate particles grid
    const sineWaveAnimator = new SineWaveAnimator(1/400, 1/800, 50);
    simulator.animator(sineWaveAnimator); // set animator
    simulator.start(); // start animation

    await sleep(5000);
    simulator.reset() // stop animation and remove particles
    await sleep(1000);

    simulator.generate()
    const soundWaveAnimator = new SoundWaveAnimator(1/400, 1/800, 50);
    simulator.animator(soundWaveAnimator);
    simulator.start();

}

main().then(r => console.log("done"));