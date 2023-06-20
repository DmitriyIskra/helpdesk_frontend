export default class Http {
    constructor() {
        this.data = null;
    }
    
    read() {
        let data = [];

        const xhr = new XMLHttpRequest();

        xhr.addEventListener('readystatechange', (e) => {
            if(e.target.readyState === 4) {
                console.log('sbvv', e.target.responseText)

                data[0] = e.target.responseText; 
            }
            
        })

        xhr.open('GET', 'http://localhost:7070/?method=allTickets');

        xhr.send();

        return data;
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