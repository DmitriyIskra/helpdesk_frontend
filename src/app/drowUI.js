

export default class DrowUI {
    constructor(widget, moment, http) {
        this.widget = widget;

        this.buttonAddTicket = this.widget.querySelector('.widget__button-add-ticket');
        this.modalAddTicket = this.widget.querySelector('.pop-up-add');

        this.modalDeleteticket = this.widget.querySelector('.pop-up-delete');

        this.modalEditTicket = this.widget.querySelector('.pop-up-change');
        this.formEditTicket = this.modalEditTicket.querySelector('.form-change-ticket');

        this.ticketContainer = this.widget.querySelector('.ticket-container');

        this.http = http;
        this.moment = moment;

        this.activeCard = null;
        this.activeCardId = null;

        this.description = null;

        this.redrowCards = this.redrowCards.bind(this);
        this.registerEventModal = this.registerEventModal.bind(this);
        this.addTextDescription = this.addTextDescription.bind(this);
        this.addDatatoEditForm = this.addDatatoEditForm.bind(this)
    }


    start() {
        this.http.read(null, 'allTickets', this.redrowCards);
    }


    // РАБОТА ДОБАВЛЕНИЯ ТИКЕТА

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

                
                // скрываем модальное окно добавить тикет
                this.hideModal(modal);
                // очищаем контейнер
                this.clearContainer();

                // отправляем данные на сервер, о создании тикета
                this.http.create(formData, 'POST', this.redrowCards);

                // сбрасываем форму в модальном окне
                this.resetForm(form);
                
            }
        }, {once: true});
    }

    showModalAddTicket() {
        this.modalAddTicket.classList.add('pop-up-active');
        
        let form = this.modalAddTicket.querySelector('form');
        let buttonReset = this.modalAddTicket.querySelector('.button-reset');

        this.registerEventModal(buttonReset, this.modalAddTicket, form);
    }

    // --------------------------------------------------------------- 


    // РАБОТА МОДАЛЬНОГО ОКНА УДАЛЕНИЯ

    controlModalDelete() {     
            // закрываем модальное окно удаления
            this.hideModal(this.modalDeleteticket);
            
            // очищаем контейнер
            this.clearContainer();
            
            this.http.delete(this.activeCardId, this.redrowCards);
    }
// ----------------------------------------------------------------

// ----------------- РАБОТА МОДАЛЬНОГО ОКНА РЕДАКТИРОВАНИЯ

    showModalEditTicket() {
        this.modalEditTicket.classList.add('pop-up-active');

        // сброс и закрытие окна
        this.formEditTicket.addEventListener('reset', e => {
            this.modalEditTicket.classList.remove('pop-up-active');     
        }, {once: true}) 

        // Сбор данных, отправка и закрытие окна
        this.formEditTicket.addEventListener('submit', e => {
            e.preventDefault();

            const newDate = getDate();

            let formData = new FormData(this.formEditTicket);

            this.modalEditTicket.classList.remove('pop-up-active'); 

            this.http.update(this.activeCardId, 'ticketEdit', this.redrowCards)
        }, {once: true})

        this.http.read(this.activeCardId, 'ticketById', this.addDatatoEditForm)
    }

    addDatatoEditForm(json) {
        let data = JSON.parse(json)

        this.formEditTicket.name.value = data.name;
        this.formEditTicket.description.value = data.description;
    }
// --------------------------------------------------


// -------------- РАБОТА ТИКЕТОВ
    changeStatus() {
        const formData = new FormData();
        formData.append('id', this.activeCardId);

        this.clearContainer();

        this.http.update(formData, 'changeStatus', this.redrowCards);
    }



    showDescription(name) {
        name.classList.add('active');

        this.description = document.createElement('div');
        this.description.classList.add('description');

        this.activeCard.append(this.description);

        this.http.read(this.activeCardId, 'ticketById', this.addTextDescription);
    }

    addTextDescription(data) {
        this.description.textContent = JSON.parse(data).description;
    }

    hideDescription(name) {
        name.classList.remove('active');

        const description = this.activeCard.querySelector('.description');
        description.remove();
    }
// -----------------------------------------------------------------------



    // скрываем модальное окно
    hideModal(modal) {
        modal.classList.remove('pop-up-active');
    }

    // Сброс формы
    resetForm(form) {
        form.reset()
    }

    // получение текущей даты и времени 
    getDate() {
        return this.moment().format('DD.MM.YY HH:mm');
    }


    // очистка контейнера
    clearContainer() {
        let cards = [...this.ticketContainer.querySelectorAll('.card')]

        cards.forEach( item => item.remove())
    }



    redrowCards(json) {
        try {
            const data = JSON.parse(json)

            data.forEach( item => {
            
                const card = document.createElement('div');
                card.classList.add('card');
                card.setAttribute('id', `${item.id}`);
    
    
    
                const wrNameStatus = document.createElement('div');
                wrNameStatus.classList.add('wr-name-status');
    
                const status = document.createElement('div');
                status.classList.add('status');
                if(item.status === 'true') {
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



    

    // метод ПЕРЕРИСОВКА при  изменениях
}