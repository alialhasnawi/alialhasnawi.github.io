import { El, x } from "../../lib/esrc.js";

/**
 * A DateInput component.
 */
export class DateInput extends El {
    /** @type HTMLElement */
    #hour;
    /** @type HTMLElement */
    #minute;

    /**
     * Create a new DateInput.
     * @param {Date} date default date, undefined=set to current time.
     */
    constructor(date = undefined) {
        super();

        const now = date || new Date();

        this.#hour = x('input', {
            className: 'date-hour', type: 'text',
            value: now.getHours(), size: '2',
            pattern: '[0-9]*', placeholder: 'hh',
            maxLength: 2
        });
        this.#minute = x('input', {
            className: 'date-minute', type: 'text',
            value: now.getMinutes(), size: '2',
            pattern: '[0-9]*', placeholder: 'mm',
            maxLength: 2
        });

        if (this.#hour.value.length == 1)
            this.#hour.value = '0' + this.#hour.value;
        if (this.#minute.value.length == 1)
            this.#minute.value = '0' + this.#minute.value;

        this.e = x('div', { className: 'dateinput-selector', events: { input: () => { this.validate_date() } } },
            [this.#hour, x('div', { className: 'dateinput-spacer', textContent: ':' }), this.#minute]);
    }

    /**
     * Fix invalid dates.
     */
    validate_date() {
        this.#hour.value = this.#hour.value.replace(/\D/g, '');
        this.#minute.value = this.#minute.value.replace(/\D/g, '');
    }

    /**
     * Return the date object from this selector.
     * @returns Date
     */
    get_date() {
        const d = new Date();
        d.setHours(this.#hour.value || 0);
        d.setMinutes(this.#minute.value || 0);
        return d;
    }
}


/**
 * A Duration component.
 */
export class DurationInput extends El {
    #duration;

    /**
     * Create a new DurationInput.
     * @param {Date} date default date, undefined=set to current time.
     */
    constructor(date = undefined) {
        super();

        const now = date || new Date(600000);

        this.#duration = x('input', {
            className: 'date-duration', type: 'text',
            value: Math.floor(now.getTime() / 60000), size: '4',
            pattern: '[0-9]*', placeholder: 'mm'
        });

        this.e = x('div', {
            className: 'durationinput-selector',
            events: { input: () => { this.validate_date() } }
        }, this.#duration);
    }

    /**
     * Fix invalid dates.
     */
    validate_date() {
        this.#duration.value = this.#duration.value.replace(/\D/g, '');
    }

    /**
     * Return the date object from this selector.
     * @returns Date
     */
    get_date() {
        return new Date(this.#duration.value * 60000);
    }
}