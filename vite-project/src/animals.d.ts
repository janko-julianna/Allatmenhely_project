declare module './animals.js' {
    export default class Animals {
        constructor();
    }

    async function loadAnimals(filterby:string[] = []){
        let froute:string = "http://localhost:3000/animals/?";
        filterby.forEach(e => {
            froute+=`${e}=${e}&`;
        });
        let response = await fetch(froute);
        return await response.json();
    }

    async function loadSelects():Promise<void>{
        let data = await this.loadAnimals();

        let names:string[] = [];
        let ages:string[] = [];
        let sizes:string[] = [];
        let breeds:string[] = [];

        document.querySelector("#name")!.innerHTML += `<option value=""></option>`;
        document.querySelector("#age")!.innerHTML += `<option value=""></option>`;
        document.querySelector("#size")!.innerHTML += `<option value=""></option>`;
        document.querySelector("#breed")!.innerHTML += `<option value=""></option>`;

        data.forEach(element => {
            if (!names.includes(element.name)) {
                names.push(element.name);
            }
            if (!ages.includes(element.age)) {
                ages.push(element.age);
            }
            if (!sizes.includes(element.size)) {
                sizes.push(element.size);
            }
            if (!breeds.includes(element.breed)) {
                breeds.push(element.breed);
            }
        });
        names.forEach(e=>{
            document.querySelector("#name")!.innerHTML += `<option value="${e}"></option>`;
        });
        ages.forEach(e=>{
            document.querySelector("#age")!.innerHTML += `<option value="${e}"></option>`;
        })
        sizes.forEach(e=>{
            document.querySelector("#size")!.innerHTML += `<option value="${e}"></option>`;
        })
        breeds.forEach(e=>{
            document.querySelector("#breed")!.innerHTML += `<option value="${e}"></option>`;
        })
    }

    async function showAnimals(filterby:string[]=[]){
        const universities = await this.loadAnimals(filterby);

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
        universities.forEach(u => {
            let tr:HTMLTableRowElement = document.createElement('tr') as HTMLTableRowElement;
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
            table!.appendChild(tr);
        });
    }

    let selects = document.querySelectorAll("select");

    function getFilterValues():string[] {
        let values:string[] = [];
        selects = document.querySelectorAll("select");
        selects.forEach(s=>{
             values.push(`${s.value}`)
        })
        return values;
    };

    selects.forEach(s=>{
        s.addEventListener("change", () =>{
                this.showAnimals(getFilterValues());
        })
    });
}