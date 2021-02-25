/**
 * Create element with tag, class, props
 * @param {String} a tag 
 * @param {*} c class name or props
 * @param {*} b props
 */
export function make(a, c, b) {
    const e = document.createElement(a);

    if (typeof(c) == 'string') {
        e.className = c;
    } else {
        p(e, c);
    }

    if (b) {
        p(e, b);
    }

    return e;
}

function p(e, l) {
    for (const k in l) {
        if (k == 'style') {
            const s = l[k];
            for (const j in s) {
                e.style[j] = s[j];
            }
        } else {
            e[j] = l[k];
        }
    }
}

/**
 * Create element from class, quick
 * @param {String} t tag
 * @param {String} c class
 */
export function el(c='', t='div') {
    const e = document.createElement(t);
    e.className = c;
    return e;
}

/**
 * Add all children to element
 * @param {Element} e parent.
 * @param {Array} c children.
 */
export function addAll(e, c) {
    for (let i = 0; i < c.length; i++) {
        e.append(c[i]);
    }
}

/**
 * Clear all children in parent
 * @param {Element} e parent
 */
export function clear(e) {
    while (true) {
        let c = e.firstElementChild;
        if (c) {
            e.removeChild(c);
        } else {
            break;
        }
    }
}

export const div = (c, b) => make('div', c, b);
export const span = (c, b) => make('span', c, b);

/**
 * Return tag-free markup
 * @param {String} h markup
 */
export function wash(h) {
    return h.replace(/</g, '&lt;').replace(/>/g, '&gt;');
};

/**
 * Return node from template.
 */
export function h(t,...m) {
    let l = document.createElement('template');
    l.innerHTML = String.raw(t, ...m);
    return l.content.firstChild;
}