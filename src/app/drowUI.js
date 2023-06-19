export default class DrowUI {
    constructor(widget, moment, http) {
        this.widget = widget;
        this.buttonAddTicket = this.widget.querySelector('.widget__button-add-ticket');
        this.modalAddTicket = this.widget.querySelector('.pop-up-add');
        this.http = http;
        this.moment = moment;
    }

    start() {
        let data = this.http.read()
        console.log(data)
    }

    registerEventModal(buttonReset, modal, form) {
        buttonReset.addEventListener('click', e => {
            this.hideModal(modal);
        }, {once: true}); 

        form.addEventListener('submit', e => {
            e.preventDefault();

            if(modal.matches('.pop-up-add')) {
                let formData = new FormData(form);

                let date = this.getDate();
                formData.set('status', false);
                formData.set('created', date);

                form.reset();

                this.hideModal(modal);

                this.http.create(formData, 'POST')
            }
        }, {once: true});
    }

    showModalAddTicket() {
        this.modalAddTicket.classList.add('pop-up-active');
        
        let form = this.modalAddTicket.querySelector('form');
        let buttonReset = this.modalAddTicket.querySelector('.button-reset');

        this.registerEventModal(buttonReset, this.modalAddTicket, form);
    }

    hideModal(el) {
        el.classList.remove('pop-up-active');
    }

    getDate() {
        return this.moment().format('DD.MM.YY HH:mm');
    }

    // метод ПЕРЕРИСОВКА при  изменениях
}