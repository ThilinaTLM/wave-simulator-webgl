import * as PIXI from "pixi.js";
import {Generator, ParticleGeneratorOptions} from "./generator";
import {Animator} from "./animator";
import {Particle} from "./particle";

export interface WaveSimulatorOptions {
    pixiOptions?: PIXI.IApplicationOptions;
    className?: string;
    parentElement?: HTMLElement;
    particleGeneratorOptions?: ParticleGeneratorOptions;
}

export class Simulator {

    private readonly app: PIXI.Application
    private readonly options: WaveSimulatorOptions;
    private generator: Generator;
    private particles: Particle[][] = [];

    private __tickerCb?: (delta: number) => void;

    constructor(options: WaveSimulatorOptions) {
        // fallback options
        this.options = {
            pixiOptions: options.pixiOptions,
            className: options.className || "__wave-sim",
            parentElement: options.parentElement,
            particleGeneratorOptions: options.particleGeneratorOptions
        }

        // setup application
        this.app = new PIXI.Application({
            autoStart: false,
            ...this.options.pixiOptions
        });
        this.app.view.className = this.options.className!;
        if (this.options.parentElement) {
            this.options.parentElement.appendChild(this.app.view);
        }

        // particle generator
        this.generator = new Generator(this.options.particleGeneratorOptions);
    }

    generate(options?: ParticleGeneratorOptions) {
        this.particles = this.generator.generate(this.app.view, options);
        this.app.stage.addChild(...this.particles.flat());
    }

    reset() {
        this.stop();
        this.app.stage.removeChildren();
    }

    animator(animator: Animator, removeOld = false) {
        let t = 0.0; // milliseconds
        if (this.__tickerCb && removeOld) {
            this.app.ticker.remove(this.__tickerCb);
        }
        this.__tickerCb = (delta) => {
            t += delta * 10;
            animator.tick(this.particles || [], {
                delta,
                time: t,
                distanceX: this.generator?.options.distanceX!,
                distanceY: this.generator?.options.distanceY!,
                size: this.generator?.options.size!,
                width: this.app.view.width,
                height: this.app.view.height
            })
        }
        this.app.ticker.add(this.__tickerCb);
        this.start()
    }

    start() {
        this.app.ticker.start();
    }

    stop() {
        this.app.ticker.stop();
    }
}

