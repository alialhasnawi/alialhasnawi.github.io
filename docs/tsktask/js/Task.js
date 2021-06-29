import { El } from "../../lib/esrc.js";


/**
 * A Block interface for Tasks and Breaks. Does not directly create HTML.
 * Inherits the El element interface.
 */
export class Block extends El {
    #start_time;
    #duration;
    #previous;
    #next;
    #start_time_dom;
    #duration_dom;


    /**
     * Create a new block.
     * @param {Date} start_time Start time date object.
     * @param {Date} duration Duration date object (default 0).
     */
    constructor(start_time, duration = new Date(0)) {
        super();
        this.#start_time = start_time;
        this.#duration = duration;

        this.#previous;
        this.#next;
        this.#start_time_dom;
        this.#duration_dom;
    }

    /**
     * Return true if a task overlaps with another.
     * @param {Block} other Another task.
     */
    overlaps(other) {
        return (this.start_time <= other.end_time) && (this.end_time >= other.start_time);
    }

    /**
     * Start time parent node which holds the start time text node.
     * @param {HTMLElement} node Start time node.
     */
    set start_time_dom (node) {
        this.#start_time_dom = node;
    }

    /**
     * Duration parent node which holds the duration text node.
     * @param {HTMLElement} node Duration node.
     */
    set duration_dom (node) {
        this.#duration_dom = node;
    }

    /**
     * Set task's previous Block node.
     * @param {Block} previous_task Previous Block node.
     */
    set previous(previous_task) {
        this.#previous = previous_task;
    }

    /**
     * Previous Block node.
     */
    get previous() {
        return this.#previous;
    }

    /**
     * Set task's next Block node.
     * @param {Block} next_task Next Block node.
     */
    set next(next_task) {
        this.#next = next_task;
    }

    /**
     * Next Block node.
     */
    get next() {
        return this.#next;
    }

    /**
     * Set task's start time.
     * @param {Date} new_value
     */
    set start_time(new_value) {
        this.#start_time = new_value;
        this.#start_time_dom.textContent = this.start_time_string;
    }

    /**
     * Task's start time.
     */
    get start_time() {
        return this.#start_time;
    }

    /**
     * Set task's duration.
     * @param {Date} new_value
     */
    set duration(new_value) {
        this.#duration = new_value;
        this.#duration_dom.textContent = this.duration_string;
    }

    /**
     * Task's duration.
     */
    get duration() {
        return this.#duration;
    }

    /**
     * Set task's end time.
     * @param {Date} new_value
     */
    set end_time(new_value) {
        this.#duration = new Date(new_value.getTime() - this.#start_time.getTime());
        this.#duration_dom.textContent = this.duration_string;
    }

    /**
     * Task's end time.
     */
    get end_time() {
        return new Date(this.#start_time.getTime() + this.#duration.getTime());
    }

    /**
     * Task duration string. Prefer whole number days, hours, or minutes.
     */
    get duration_string() {
        const minutes = Math.floor(this.#duration.getTime() / 60000);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 1) {
            return `${days} d`;
        } else if (hours > 1) {
            return `${hours} h`;
        } else if (minutes > 0) {
            return `${minutes} m`;
        } else {
            return '--';
        }
    }

    /**
     * Task start time string as h?h:mm:ss PM/AM.
     */
    get start_time_string() {
        return this.#start_time.toLocaleTimeString('en-US').slice(0, 11).replace(/:\d\d(?!:)/, '').trim();
    }
}

/**
 * A Task for the TaskManager. Does not directly create HTML.
 * Inherits the El element interface.
 */
export class Task extends Block {
    #name;

    /**
     * Create a new task.
     * @param {String} name Name of the task.
     * @param {Date} start_time Start time in millisecond epoch time.
     * @param {Date} duration Millisecond duration of task.
     */
    constructor(name, start_time, duration = new Date(0)) {
        super(start_time, duration);
        this.#name = name;
    }

    /**
     * Set task's name.
     * @param {String} new_value
     */
    set name(new_value) {
        this.#name = new_value;
    }

    /**
     * Task's name.
     */
    get name() {
        return this.#name;
    }
}