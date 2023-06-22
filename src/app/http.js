export default class Http {
    

    read(id, method, callback) {
        let xhr;

        switch (method) {
            case 'allTickets':

                xhr = new XMLHttpRequest();

                xhr.addEventListener('load', () => {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        try {
                            let data = xhr.responseText;
        
                            callback(data);
                        } catch (e) {
                            console.error(e);
                        }
                    }
                }); 
        
                xhr.open('GET', `http://localhost:7070/?method=${method}`);
        
                xhr.send();

                return;
            case 'ticketById': 
                
                xhr = new XMLHttpRequest();

                xhr.addEventListener('load', e => {
                    if(xhr.status >=200 && xhr.status < 300) {
                        let data = xhr.responseText;

                        callback(data);
                    }
                })

                xhr.open('GET', `http://localhost:7070/?method=ticketById&id=${id}`);

                xhr.send()
        }
        
        
    }

    create(formData, method, callback) {

        if(method === 'POST') {
            
            const xhr = new XMLHttpRequest();

            xhr.addEventListener('load', () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    try {
                        const data = xhr.responseText;

                        this.read(null, 'allTickets', callback);
                    } catch (e) {
                        console.error(e);
                    }
                }
            })
            

            xhr.open('POST', 'http://localhost:7070/?method=createTicket');

            xhr.send(formData);
        }

    }  

    // в метод передаем например changeStatus, callback это redrowCards
    update(formData, method, callback) {
        if(method === 'changeStatus') {
            const xhr = new XMLHttpRequest()
            
            xhr.addEventListener('load', e => {
                if(xhr.status >= 200 && xhr.status < 300) {
                    try {
                        const data = xhr.responseText;

                        this.read(null, 'allTickets', callback);
                    } catch(error) {
                        console.error(error);
                    }
                    
                }
            })

            xhr.open('PATCH', `http://localhost:7070/?method=${method}`);
            
            xhr.send(formData)
        }

        if(method === 'ticketEdit') {
            
        }
    }


    delete(id, callback) {
        const xhr = new XMLHttpRequest();

        xhr.addEventListener('load', () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                try {
                    this.read(null, 'allTickets', callback);
                } catch (e) {
                    console.error(e);
                }
            }
        })
        
        xhr.open('DELETE', `http://localhost:7070/?method=DELETE&id=${id}`);
        
        xhr.send();
    }
}

    

    

    
