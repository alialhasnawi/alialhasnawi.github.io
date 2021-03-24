export class AnimMan {
    /**
     * Incremental animation manager with target support.
     */

    #EPSILON;
    #DELTA;
    #SUPEREPSILON;
    #origins;
    #targets;

    /**
     * 
     * @param {} epsilon boundary of value change
     * @param {*} delta 
     */
    constructor(epsilon=0.01, delta=0.05, superepsilon=0.001) {
        this.#EPSILON = epsilon;
        this.#DELTA = delta;
        this.#SUPEREPSILON = superepsilon;
        this.#origins = {};
        this.#targets = {};
    }

    /**
     * Add an origin object of what to be updated.
     * @param {String} name id of animation origin
     * @param {Vector3} vector origin vector3 {x, y, z} object
     */
    origin(name, vector) {
        this.#origins[name] = vector;
    }

    /**
     * Add a target for an origin object to increment.
     * @param {String} name id of animation target
     * @param {Vector3} vector target vector3 {x, y, z} object
     */
    target(name, vector) {
        this.#targets[name] = normalize(vector);
    }
    
    /**
     * Increment all targets.
     */
    tick() {
        for (const name in this.#targets) {
            const target = this.#targets[name];
            const origin = this.#origins[name];

            let dx = target.x - origin.x;
            let dy = target.y - origin.y;
            let dz = target.z - origin.z;

            if (Math.abs(dx) < this.#EPSILON) {
                origin.x = target.x + this.#SUPEREPSILON;
            } else {
                origin.x += this.#DELTA * (target.x - origin.x);
            }

            if (Math.abs(dy) < this.#EPSILON) {
                origin.y = target.y + this.#SUPEREPSILON;
            } else {
                origin.y += this.#DELTA * (target.y - origin.y);
            }

            if (Math.abs(dz) < this.#EPSILON) {
                origin.z = target.z + this.#SUPEREPSILON;
            } else {
                origin.z += this.#DELTA * (target.z - origin.z);
            }
        }
    }
}

/**
 * Sanitize and parseFloat
 * @param {Vector3} vector vector3 object
 */
function normalize(vector) {
    let nv = {};

    nv.x = parseFloat(vector.x);
    nv.y = parseFloat(vector.y);
    nv.z = parseFloat(vector.z);

    return nv;
}