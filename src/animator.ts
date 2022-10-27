import {Particle} from "./particle";

export interface AnimatorParams {
    delta: number;
    time: number;
    width: number;
    height: number;
    size: number;
    distanceX: number;
    distanceY: number;
}

export abstract class Animator {
    abstract tick(particles: Particle[][], params: AnimatorParams): void;
}

export class SineWaveAnimator extends Animator {

    constructor(private readonly ALPHA: number, private readonly BETA: number, private readonly HEIGHT: number) {
        super();
    }

    tick(particles: Particle[][], params: AnimatorParams): void {
        particles.forEach(line => {
            line.forEach((p, i) => {
                const x = i * (params.size + params.distanceX);
                if (params.time * this.ALPHA < x * this.BETA * Math.PI) {
                    return
                }
                p.y = -1 * this.HEIGHT * Math.sin(params.time * this.ALPHA - x * this.BETA * Math.PI);
            })
        })
    }
}

export class SoundWaveAnimator extends Animator {

        constructor(private readonly ALPHA: number, private readonly BETA: number, private readonly HEIGHT: number) {
            super();
        }

        tick(particles: Particle[][], params: AnimatorParams): void {
            particles.forEach(line => {
                line.forEach((p, i) => {
                    const x = i * (params.size + params.distanceX);
                    if (params.time * this.ALPHA < x * this.BETA * Math.PI) {
                        return
                    }
                    p.x = -1 * this.HEIGHT * Math.sin(params.time * this.ALPHA - x * this.BETA * Math.PI);
                })
            })
        }
}