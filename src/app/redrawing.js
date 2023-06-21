export default class Redrawing {
    constructor(container) {
        this.container = container;
        this.cards = this.container.querySelectorAll('.card');
    }

    redrowCards() {
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

            this.container.append(card);
        })
        

    }
}