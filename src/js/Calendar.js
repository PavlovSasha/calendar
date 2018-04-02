import events from './events'
import { dayHelper, monthHelper } from './helper'

export default class Calendar {
    constructor (date) {
        this.month = date.getMonth();
        this.year = date.getFullYear();
        this.day = date.getDate() || 0;
    }

    create() {
        const mainElem = document.querySelector('.calendar');
        const tableElem = document.querySelector('.calendar__table');
        const headerElem = document.querySelector('.calendar__header__date');

        const template = this.createTemplate();

        headerElem.innerHTML = `${monthHelper[this.month]} ${this.year}`;
        tableElem.innerHTML = template;

        if(events.length) {
            this.pasteEvents();
        }

        if (this.day) {
            const el = document.querySelector(`.d${this.year}-${this.month+1}-${this.day}`);
            el.classList.add('selected');
        }

        mainElem.classList.add('visible');
        tableElem.classList.remove('hidden');
    }

    createTemplate() {
        let d = new Date(this.year, this.month);
        let template = '<div class="row">';

        while (d.getDay() !== 1) {
            d.setDate(d.getDate() - 1);
        }

        //table header
        for (let i = 0; i < 7; i++) {
            template += `\n\t<div class="table__header day d${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}">${dayHelper[i]}, ${d.getDate()}</div>`;
            d.setDate(d.getDate() + 1);
        }

        template += '\n</div>';

        //table main
        while (d.getMonth() === this.month) {

            if(d.getDay() === 1) {
                template += `\n<div class="row">`
            }

            template += `\n\t<div class="day d${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}">${d.getDate()}</div>`;

            if (!d.getDay()) {
                template += '\n</div>';
            }

            d.setDate(d.getDate() + 1);
        }

        //table footer if last month day isn't a sunday
        if (d.getDay() !== 1) {
            while (d.getDay() !== 1) {
                template += `\n\t<div class="day d${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}">${d.getDate()}</div>`;
                d.setDate(d.getDate() + 1);
            }
            template += `\n</div>`;
        }

        return template;
    }

    pasteEvents() {
        events.forEach(e => {
            if (document.querySelector('.d'+e.date)) {
                const target = document.querySelector('.d'+e.date);
                const elem = document.createElement('div');
                const template = `<div class="title">${e.title}</div><div class="text">${e.event}</div>`;

                elem.classList.add('dayEvent');
                elem.innerHTML = template;
                target.append(elem);
                new Date(e.date).getMonth() === this.month ? target.classList.add('not-empty') : '';
            }
        })
    }

    remove() {
        document.querySelector('.calendar__table').innerHTML = '';
        document.querySelector('.calendar__table').classList.add('hidden');

    }
}