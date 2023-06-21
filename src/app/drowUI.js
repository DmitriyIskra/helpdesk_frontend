

export default class DrowUI {
    constructor(widget, moment, http, redrawing) {
        this.widget = widget;
        this.buttonAddTicket = this.widget.querySelector('.widget__button-add-ticket');
        this.modalAddTicket = this.widget.querySelector('.pop-up-add');
        this.ticketContainer = this.widget.querySelector('.ticket-container');
        this.redrawing = new redrawing(this.ticketContainer);
        this.http = new http(this.redrawing);
        this.moment = moment;
        this.data = null;
    }


    async start() {
        await this.http.read();
        this.redrowCards();
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

                

                this.hideModal(modal);

                this.clearContainer();
                this.create(formData)
                this.redrowCards();
                sessionStorage.removeItem('data')
                form.reset();
                
            }
        }, {once: true});
    }

    async create (formData) {
        await this.http.create(formData, 'POST');
        await this.http.read();
    }

    showModalAddTicket() {
        this.modalAddTicket.classList.add('pop-up-active');
        
        let form = this.modalAddTicket.querySelector('form');
        let buttonReset = this.modalAddTicket.querySelector('.button-reset');

        this.registerEventModal(buttonReset, this.modalAddTicket, form);
    }

    redrowCards() {
        try {
            const data = JSON.parse(sessionStorage.data)

            data.forEach( item => {
            

                const card = document.createElement('div');
                card.classList.add('card');
                card.setAttribute('id', `${item.id}`);
    
    
    
                const wrNameStatus = document.createElement('div');
                wrNameStatus.classList.add('wr-name-status');
    
                const status = document.createElement('div');
                status.classList.add('status');
                if(item.status === true) {
                    status.classList.add('status-active');
                } else {
                    status.classList.remove('status-active');
                }
    
                const textCard = document.createElement('div');
                textCard.classList.add('text-card');
                textCard.textContent = item.name;
    
    
    
                const wrDateRedact = document.createElement('div');
                wrDateRedact.classList.add('wr-date-redact');
    
                const dateCard = document.createElement('div');
                dateCard.classList.add('date-card');
                dateCard.textContent = item.created;
    
                const wrEditDelete = document.createElement('div');
                wrEditDelete.classList.add('wr-edit-delete');
    
                const editCard = document.createElement('div'); 
                editCard.classList.add('edit-card');
    
                const deleteCard = document.createElement('div');
                deleteCard.classList.add('delete-card');
    
    
                wrEditDelete.append(editCard);
                wrEditDelete.append(deleteCard);
    
                wrNameStatus.append(status);
                wrNameStatus.append(textCard);
    
                wrDateRedact.append(dateCard);
                wrDateRedact.append(wrEditDelete);
    
                card.append(wrNameStatus);
                card.append(wrDateRedact);
    
                this.ticketContainer.append(card);
            })
        } catch(err) {
            console.log('объект не json')
        }
        
        
    }

    hideModal(el) {
        el.classList.remove('pop-up-active');
    }

    getDate() {
        return this.moment().format('DD.MM.YY HH:mm');
    }

    clearContainer() {
        let cards = [...this.ticketContainer.querySelectorAll('.card')]

        cards.forEach( item => item.remove())
    }

    // метод ПЕРЕРИСОВКА при  изменениях
}