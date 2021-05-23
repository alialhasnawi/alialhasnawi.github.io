// Sidebar helper class

export class Sidebar {
    #e;
    #states;
    #current;

    /**
     * Create a new sidebar.
     * @param {String} id CSS selector for container.
     */
    constructor(id) {
        this.#e = document.querySelector(id);
        this.#states = {};
    }

    /**
     * Add a static content holder.
     * @param {String} name Reference.
     * @param {String} html Content markup.
     */
    addStatic(name, html) {
        this.#states[name] = toNode(html);
    }

    /**
     * Add a dynamic content holder with templating.
     * @param {String} name Reference.
     * @param {Function} func Template returning node from <d> object.
     */
    addTemplate(name, func) {
        this.#states[name] = {
            engine: func
        };
    }

    /**
     * Switch to static content.
     * @param {String} name Reference of content to switch to.
     */
    swapStatic(name) {
        this.#deleteChildren();
        this.#e.appendChild(this.#states[name]);
        this.#current = name;
    }

    /**
     * Switch to dynamic content.
     * @param {String} name Reference of content to switch to.
     * @param {Object} d Data passed into templating function.
     */
    swapTemplate(name, d){
        this.#deleteChildren();
        this.#e.appendChild(toNode(this.#states[name].engine(d)));
        this.#current = name;
    }

    /**
     * Returns true iff current state is state.
     * @param {String} state State to check for.
     */
    is(state){
        return this.#current == state;
    }

    #deleteChildren() {
        this.#e.removeChild(this.#e.firstChild);
    }
}

/**
 * Converts markup to node element.
 * @param {String} html Markup.
 */
function toNode(html) {
    let temp = document.createElement('template');
    temp.innerHTML = html;
    return temp.content.firstChild;
}