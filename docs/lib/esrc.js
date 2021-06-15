/**
 * Create element with tag, class, props.
 * @param {String} tag Element tag.
 * @param {String | Object} class_or_props Class name or props.
 * @param {Object} props Props.
 * @returns HTMLElement
 */
export function make(tag, class_or_props, props) {
    const e = document.createElement(tag);

    if (typeof (class_or_props) == 'string') {
        e.className = class_or_props;
    } else if (class_or_props) {
        p(e, class_or_props);
    }

    if (props) {
        p(e, props);
    }

    return e;
}

/**
 * Apply props to an element.
 * @param {HTMLElement} element Element node.
 * @param {Object} props Props (includeing style).
 */
function p(element, props) {
    for (const k in props) {
        if (k == 'style') {
            const s = props[k];
            for (const j in s) {
                element.style[j] = s[j];
            }
        } else if (k == 'children') {
            addAll(element, props[k]);
        } else {
            element[k] = props[k];
        }
    }
}

/**
 * Create element from class, without props.
 * @param {String} tag Element tag.
 * @param {String} class_string Class name(s).
 * @returns HTMLElement
 */
export function el(class_string = '', tag = 'div') {
    const e = document.createElement(tag);
    e.className = class_string;
    return e;
}

/**
 * Add all children to element.
 * @param {HTMLElement} parent_node Parent node.
 * @param {Array<HTMLElement>} children children.
 */
export function addAll(parent_node, children) {
    for (let i = 0; i < children.length; i++) {
        parent_node.append(children[i]);
    }
}

/**
 * Clear all children in parent
 * @param {HTMLElement} parent_node parent
 */
export function clearAll(parent_node) {
    while (parent_node.firstElementChild) {
        parent_node.removeChild(c);
    }
}

/**
 * Create div with class, props.
 * @param {String} a Element tag.
 * @param {String | Object} class_string Class name or props.
 * @param {Object} props Props.
 * @returns HTMLElement
 */
export const div = (class_string, props) => make('div', class_string, props);

/**
 * Create span with class, props.
 * @param {String} a Element tag.
 * @param {String | Object} class_string Class name or props.
 * @param {Object} props Props.
 * @returns HTMLElement
 */
export const span = (class_string, props) => make('span', class_string, props);

/**
 * Return tag-free sanitized markup.
 * @param {String} html markup
 * @returns string
 */
export function wash(html) {
    return html.replace(/</g, '&lt;').replace(/>/g, '&gt;');
};

/**
 * Return node from template.
 * @returns ChildNode
 */
export function h(t, ...m) {
    let l = document.createElement('template');
    l.innerHTML = String.raw(t, ...m);
    return l.content.firstChild;
}

/**
 * An element abstractor built for polyfilled Web Componenets.
 */
export class El {
    #e;

    /**
     * Create El element wrapper.
     * @param {HTMLElement} element Element node, default=unassigned.
     */
    constructor(element=undefined) {
        this.#e = element;
    }

    /**
     * Remove this element.
     */
    remove() {
        this.#e.remove();
    }

    /**
     * Node representation of this element.
     * @returns HTMLElement
     */
    get html() {
        return this.#e;
    }

    /**
     * Assign HTML directly.
     * @param {HTMLElement} new_html Element node.
     */
    set html(new_html) {
        this.#e = new_html;
    }

    /**
     * Children of this element.
     * @returns HTMLCollection
     */
    get children() {
        return this.#e.children;
    }

    /**
     * Set the children of this element.
     * @param {Array<HTMLElement>} children children.
     */
    set children(children) {
        clearAll(this.#e);
        addAll(this.#e, children);
    }

    /**
     * Set additional props.
     * @param {Object} props_obj Props (includeing style).
     */
    set props(props_obj) {
        p(this.#e, props_obj);
    }
}