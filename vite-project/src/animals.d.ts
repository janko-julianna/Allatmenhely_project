export default class Filter {
        constructor(){
        this.showAnimals();
        this.loadSelects();
        this.addEventToSelects();
        }

    async loadAnimals(filterby:string[] = []){
        let froute:string = "http://localhost:3000/animals/?";
        for (let i = 0; i < filterby.length; i++) {
                if (i==0) {
                    froute+=`name=${filterby[i]}&`;
                }
                if (i==1) {
                    let breed:string = filterby[i];
                    if (breed.indexOf(" " >= 0)) {
                        breed = breed.split(" ").join("_");
                    }
                    froute+=`breed=${breed}&`
                }
                if (i==2) {
                    froute+=`age=${filterby[i]}&`;
                }
                if (i==3) {
                    froute+=`size=${filterby[i]}`;
                }
        }
        console.log(froute)
        let response = await fetch(froute);
        return await response.json();
    }

    async loadSelects():Promise<void>{
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
            document.querySelector("#name")!.innerHTML += `<option value="${e}">${e}</option>`;
        });
        ages.forEach(e=>{
            document.querySelector("#age")!.innerHTML += `<option value="${e}">${e}</option>`;
        })
        sizes.forEach(e=>{
            document.querySelector("#size")!.innerHTML += `<option value="${e}">${e}</option>`;
        })
        breeds.forEach(e=>{
            let breed:string = e;
            document.querySelector("#breed")!.innerHTML += `<option value="${e}">${breed.split("_").join(' ')}</option>`;
        })
    }

    async showAnimals(filterby:string[]=[]){
        const Animals = await this.loadAnimals(filterby);
        console.log(Animals)

        let table = document.querySelector('.table tbody');
        table!.innerHTML="";
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
        Animals.forEach(a => {
            let tr:HTMLTableRowElement = document.createElement('tr') as HTMLTableRowElement;
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
            table!.appendChild(tr);
        });
    }

     getFilterValues():string[] {
        let values:string[] = [];
        const selects = document.querySelectorAll("select");
        selects.forEach(s=>{
             values.push(`${s.value}`)
        })
        console.log(values)
        return values;
    };

    addEventToSelects(){
        const selects = document.querySelectorAll("select");
        selects.forEach(s=>{
            s.addEventListener("change", () =>{
                this.showAnimals(this.getFilterValues());
            })
        });
    }
}
