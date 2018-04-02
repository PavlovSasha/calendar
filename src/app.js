import Calendar from './js/Calendar.js'
import './scss/style.scss'
import '../public/img/search.svg'

let date = new Date(2013, 2);

let calendar = new Calendar(date);

calendar.create();

const backButton = document.querySelector('.calendar__header__button_back');

backButton.addEventListener('click', () => {
    date.setDate(1);
    date.setMonth(date.getMonth() - 1);
    updateCalendar();
});

const fwdButton = document.querySelector('.calendar__header__button_forward');

fwdButton.addEventListener('click', () => {
    date.setDate(1);
    date.setMonth(date.getMonth() + 1);
    updateCalendar();
});

const todayButton = document.querySelector('.calendar__header__button_today');

todayButton.addEventListener('click', () => {
    date = new Date();
    updateCalendar();
});

const tableElem = document.querySelector('.calendar__table');

tableElem.addEventListener('click', event => {
    let { target } = event;
    while(target !== this) {
        if (target.classList.contains('day')) {
            document.querySelector('.day.selected').classList.remove('selected');
            target.classList.add('selected');
            return;
        }
        target = target['parentElement'];
    }
});

function updateCalendar () {
    calendar.remove();
    calendar = new Calendar(date);
    calendar.create();
}