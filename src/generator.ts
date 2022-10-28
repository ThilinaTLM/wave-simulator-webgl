import {Particle} from "./particle";
import * as PIXI from "pixi.js";

export interface ParticleGeneratorOptions {
    size?: number;
    distanceX?: number;
    distanceY?: number;
    color?: number;
    margins?: {
        top?: number;
        bottom?: number;
        left?: number;
        right?: number;
    };
}

export class Generator {

    private readonly _options: ParticleGeneratorOptions;

    constructor(options?: ParticleGeneratorOptions) {
        options = options || {}
        // fallback to default _options
        this._options = {
            size: options.size || 2,
            color: (options.color === undefined)? options.color: 0xFF0000,
            distanceX: options.distanceX || 5,
            distanceY: options.distanceY || 5,
            margins: {
                top: options.margins && options.margins.top || 0,
                bottom: options.margins && options.margins.bottom || 0,
                left: options.margins && options.margins.left || 0,
                right: options.margins && options.margins.right || 0
            }
        }
    }

    get options(): ParticleGeneratorOptions {
        return this._options;
    }

    private fallbackOptions(options?: ParticleGeneratorOptions): ParticleGeneratorOptions {
        options = options || {}
        return {
            size: options.size || this._options.size,
            color: options.color || this._options.color,
            distanceX: options.distanceX || this._options.distanceX,
            distanceY: options.distanceY || this._options.distanceY,
            margins: {
                top: options.margins && options.margins.top || this._options.margins?.top,
                bottom: options.margins && options.margins.bottom || this._options.margins?.bottom,
                left: options.margins && options.margins.left || this._options.margins?.left,
                right: options.margins && options.margins.right || this._options.margins?.right
            }
        }
    }

    generate(viewport: HTMLCanvasElement, options?: ParticleGeneratorOptions) {
        // _options
        const width = viewport.width;
        const height = viewport.height;
        const opts = this.fallbackOptions(options);
        const {left, right, top, bottom} = opts.margins!;

        const grid: Particle[][] = [];

        // generate particle grid
        for (let y = top!; y < height - (top! + bottom!); y += opts.distanceY!) {
            const particles: Particle[] = [];
            for (let x = left!; x < width - (left! + right!); x += opts.distanceX!) {
                const particle = new Particle({
                    x: x,
                    y: y,
                    size: opts.size!,
                    color: opts.color!
                });
                particles.push(particle);
            }
            grid.push(particles);
        }

        return grid;
    }

}