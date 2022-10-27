import * as PIXI from "pixi.js";
import {Generator, ParticleGeneratorOptions} from "./generator";
import {Animator} from "./animator";
import {Particle} from "./particle";

export interface WaveSimulatorOptions {
    pixiOptions?: PIXI.IApplicationOptions;
    className?: string;
    parentElement?: HTMLElement;
}

export class Simulator {

    private readonly app: PIXI.Application
    private readonly options: WaveSimulatorOptions;
    private generator?: Generator;
    private particles?: Particle[][];

    constructor(options: WaveSimulatorOptions) {
        // fallback options
        this.options = {
            pixiOptions: options.pixiOptions,
            className: options.className || "__wave-sim",
            parentElement: options.parentElement
        }

        // setup application
        this.app = new PIXI.Application(this.options.pixiOptions);
        this.app.view.className = this.options.className!;
        if (this.options.parentElement) {
            this.options.parentElement.appendChild(this.app.view);
        }

    }

    generate(options?: ParticleGeneratorOptions) {
        this.generator = new Generator(options)
        this.particles = this.generator.generate(this.app.view);
        this.app.stage.addChild(...this.particles.flat());
    }

    animator(animator: Animator) {
        let t = 0.0; // milliseconds
        this.app.ticker.add((delta) => {
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
        });
    }

    start() {
        this.app.ticker.start();
    }

    stop() {
        this.app.ticker.stop();
    }
}

