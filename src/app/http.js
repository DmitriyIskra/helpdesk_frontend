export default class Http {
    constructor(redrawing) {
        this.redrawing = redrawing;
    }

    read() {
        new Promise((resolve) => {
            const xhr = new XMLHttpRequest();

            xhr.addEventListener('load', () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    try {
                        // const data = JSON.parse(xhr.responseText);
                        // Получаем свежие данные и отправляем в перерисовку
                        // this.redrawing.createCards(data)
                        sessionStorage.data = xhr.responseText
                        return resolve()
                    } catch (e) {
                        console.error(e);
                    }
                }
            }); 

            xhr.open('GET', 'http://localhost:7070/?method=allTickets');

            xhr.send();
        })

        

        
    }

    create(formData, method) {
        new Promise((resolve) => {
            if(method === 'POST') {
                
                const xhr = new XMLHttpRequest();

                xhr.addEventListener('load', () => {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        try {
                            // const data = JSON.parse(xhr.responseText);
                            // Получаем свежие данные и отправляем в перерисовку
                            // this.redrawing.createCards(data)
                            console.log('create', xhr.responseText)
                            sessionStorage.data = xhr.responseText
                            return resolve()
                        } catch (e) {
                            console.error(e);
                        }
                    }
                })
                
    
                xhr.open('POST', 'http://localhost:7070/?method=createTicket');
    
                xhr.send(formData);
            }
            
        })

        
    }

    

    
}