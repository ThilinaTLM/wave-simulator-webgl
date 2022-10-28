import * as PIXI from "pixi.js";

export interface ParticleOptions {
    x: number;
    y: number;
    size: number;
    color: number;
}

export class Particle extends PIXI.Graphics {

    private _options: ParticleOptions

    constructor(options: ParticleOptions) {
        super();
        // fallback to default options
        this._options = {
            x: options.x || 0,
            y: options.y || 0,
            size: options.size || 2,
            color: options.color || 0xFF0000
        }

        // generate particle
        this.lineStyle(0);
        this.beginFill(this._options.color, 1);
        this.drawCircle(this._options.x, this._options.y, this._options.size);
        this.endFill();
    }

    get center(): { x: number, y: number } {
        return {
            x: this._options.x,
            y: this._options.y
        }
    }

}
