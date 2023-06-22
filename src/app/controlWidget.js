export default class ControlWidget {
    constructor (drowUI) {
        this.drowUI = drowUI;

        this.onClick = this.onClick.bind(this)
    }

    init() {
        this.drowUI.start();

        this.drowUI.buttonAddTicket.addEventListener('click', this.onClick);
        this.drowUI.ticketContainer.addEventListener('click', this.onClick); 
        this.drowUI.modalDeleteticket.addEventListener('click', this.onClick) 
    }

    onClick(e) {
        e.preventDefault();

        // если кликаем на карточку то сохраняем ее и ее id
        if(e.target.closest('.card')) {
            this.drowUI.activeCard = e.target.closest('.card')
            this.drowUI.activeCardId = this.drowUI.activeCard.id;
        };
        

        // если клик по кнопке добавить тикет открывается модальное окно и на него навешиваются обработчики, один раз
        if(e.target.matches('.widget__button-add-ticket')) this.drowUI.showModalAddTicket();  
        
        // скрытие модального окна
        if(e.target.matches('.button-reset')) {
            this.drowUI.hideModal(e.target.closest('.pop-up'))
        }

        // нажатие на кнопку удаления тикета
        if(e.target.matches('.button-delete-ticket-submit')) {
            this.drowUI.controlModalDelete();
        }

        // Нажатие на кнопку редактирования тикета
        if(e.target.matches('.edit-card')) {
            this.drowUI.showModalEditTicket();
        }

        // клик по полю статус
        if(e.target.matches('.status')) {
            this.drowUI.changeStatus();
        }

        // Если клик по названию показать полное описание и добавить класс активно
        if(e.target.matches('.text-card') && !e.target.matches('.active')) { //             
            this.drowUI.showDescription(e.target);
        } else if(e.target.matches('.text-card') && e.target.matches('.active')) {
            this.drowUI.hideDescription(e.target);
            console.log('unactive')
        }
       
        // открываем модальное окно подтверждения удаления, в дальнейшем можно через подстановку имени класса и свести к одному методу  
        if(e.target.matches('.delete-card')) {
            this.drowUI.modalDeleteticket.classList.add('pop-up-active');
        }
    }
}