export default class Http {
    constructor() {
        
    }
    
    read() {
        const xhr = new XMLHttpRequest();

        if(xhr.DONE === 4) {
            return xhr.responseText;
        }

        xhr.open('GET', 'http://localhost:7070/?method=allTickets');

        xhr.send();
    }

    create(formData, method) {
        // в formData нужно добавлять id = null status created а на сервере уже формировать по двум папкам short и full
        if(method === 'POST') {
            const xhr = new XMLHttpRequest();

            // ПОЛУЧЕМ ДАННЫЕ ДЛЯ ПЕРЕРИСОВКИ......

            xhr.open('POST', 'http://localhost:7070/?method=createTicket');

            xhr.send(formData);
        }
    }

    

    
}