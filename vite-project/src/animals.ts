export default class Animals{
    constructor(){
        this.showAnimals();
    }

    async loadAnimals(){
        const response = await fetch("http://localhost:3000/animals");
        return await response.json();
    }

    async showAnimals(){
        const animals = await this.loadAnimals();

        let table = document.querySelector('.table tbody');
        if (!table) {
            const tableElement = document.createElement('table');
            tableElement.classList.add('table');

            const thead = document.createElement('thead');
            thead.innerHTML = `
                <tr>
                    <th>Id</th>
                    <th>Név</th>
                    <th>Faj</th>
                    <th>Fajta</th>
                    <th>Kor</th>
                            <th>Nem</th>
        <th>Méret</th>

                </tr>`;
            tableElement.appendChild(thead);

            table = document.createElement('tbody');
            tableElement.appendChild(table);

            document.body.appendChild(tableElement);
        }
        animals.forEach(u => {
            let tr = document.createElement('tr');
            let pages = '';
            tr.innerHTML = `
                <td>${u.id}</td>
                <td>${u.name}</td>
                <td>${u.species}</td>
                <td>${u.breed}</td>
                <td>${u.age}</td>
                <td>${u.gender}</td>
                <td>${u.size}</td>
            `
            table.appendChild(tr);
        });
    }




}