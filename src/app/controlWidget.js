export default class ControlWidget {
    constructor (drowUI) {
        this.drowUI = drowUI;

        this.onClick = this.onClick.bind(this)
    }

    init() {
        this.drowUI.start();
        console.log('work')
        this.drowUI.buttonAddTicket.addEventListener('click', this.onClick);
    }

    onClick(e) {
        e.preventDefault();

        // отправлять данные какого то атрибута например id для дальнейшего распознавания где был клик и действий
        // в метод можно передавать null в некоторые параметры если они в данный момент не нужны
        //  и проверку соответственно делать не здесь а дальше в методе который здесь вызываем
        if(e.target.matches('.widget__button-add-ticket')) this.drowUI.showModalAddTicket();
    }
}