import * as PIXI from "pixi.js";

export interface ParticleOptions {
    x: number;
    y: number;
    size: number;
    color: number;
}

export class Particle extends PIXI.Graphics {

    private options: ParticleOptions

    constructor(options: ParticleOptions) {
        super();
        // fallback to default options
        this.options = {
            x: options.x || 0,
            y: options.y || 0,
            size: options.size || 2,
            color: options.color || 0xFF0000
        }

        // generate particle
        this.lineStyle(0);
        this.beginFill(this.options.color, 1);
        this.drawCircle(this.options.x, this.options.y, this.options.size);
        this.endFill();
    }

}
