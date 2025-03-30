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
        animals.forEach(a => {
            let tr = document.createElement('tr');
            let pages = '';
            tr.innerHTML = `
                <td>${a.id}</td>
                <td>${a.name}</td>
                <td>${a.species}</td>
                <td>${(a.breed).split("_").join(" ")}</td>
                <td>${a.age}</td>
                <td>${a.gender}</td>
                <td>${a.size}</td>
            `
            table.appendChild(tr);
        });
    }




}