let create_cohete = document.querySelector("#cohete");
let print_cohete = document.querySelector("#printcohete");
let print_all_cohete = document.querySelector("#print_all_cohete");
print_cohete.disabled = true;
const reducer = (accumulator, currentValue) => accumulator + currentValue;

window.addEventListener('load', () => {
    create_cohete.addEventListener("click", selectCohete, false);
    print_cohete.addEventListener("click", printCohete, false); 
    print_all_cohete.addEventListener("click", printAllCohetes, false); 
});

/// GLOBAL OBJECTS
let cohete: Cohete;
let cohete_vel_actual: number;
let cohete_vel_maxima: number;
let cohetes_libreria = new Map();
let count: number = 0;
let nombre: string;

/// DATA
let data: object = 
{ 
    cohete1: {codigo: "32WESSDS", propulsores: 3, potencia: [10,30,80]},
    cohete2: {codigo: "LDSFJA32", propulsores: 6, potencia: [30,40,50,50,30,10]}
};

// FUNCTIONS: SELECT, CREATE AND SAVE COHETE
function selectCohete() {
    let size_data = Object.keys(data).length;
    let values_cohete = Object.values(data)[count];
    if(count < size_data) {
        let codigo = values_cohete.codigo
        let propulsores = values_cohete.propulsores
        let potencia = values_cohete.potencia
        cohete = new Cohete(codigo,propulsores,potencia);
        console.log(cohete);
            
        // save cohete in a MAP()
        nombre = "cohete"+count;
        cohetes_libreria.set(nombre, {"codigo": cohete.codigo, "propulsores": cohete.propulsores, "potencia": cohete.potencia});
        console.log(cohetes_libreria);
        create_cohete.disabled = true;
        print_cohete.disabled = false;
    }
    count += 1;
}

/// PRINT COHETE
function printCohete() {
    cohete_vel_actual = 0;
    cohete_vel_maxima = cohete.potencia.reduce(reducer);
    let p = document.createElement("p"); 
    document.querySelector("#content").appendChild(p); 
    document.querySelector("#content > :first-child").setAttribute("class", "mt-2");
    document.querySelector("#content > :first-child").innerHTML = `${cohete.print(cohete.codigo,cohete.propulsores,cohete.potencia)}
    
    <br>Máxima velocidad: ${cohete_vel_maxima}
    <br>Velocidad actual: <span id="velocidad_id">${cohete_vel_actual}</span>
    <span><button type="button" class="btnacdc btn btn-sm" id="ac_cohete">+</button>
    <button type="button" class="btnacdc btn btn-sm" id="de_cohete">-</button></span>`;
    let acc_cohete = document.querySelector("#ac_cohete");
    let dec_cohete = document.querySelector("#de_cohete");
    acc_cohete.addEventListener("click", accCohete, false);
    dec_cohete.addEventListener("click", decCohete, false);
    create_cohete.disabled = false;
    print_cohete.disabled = true;
};

function printAllCohetes() {
    let print = "";
    cohetes_libreria.forEach((key,value) => {
        print += `${JSON.stringify(value)}:${JSON.stringify(key)}`;
    });
    alert(print);
}

/// ACELERAR - FRENAR
function accCohete() {
    if(cohete_vel_actual < cohete_vel_maxima) {
        cohete_vel_actual += 10;
    }    
    document.querySelector("#velocidad_id").innerHTML = `${cohete_vel_actual}`;
}

function decCohete() {
    if(cohete_vel_actual > 0) {
        cohete_vel_actual -= 10;
    }
    document.querySelector("#velocidad_id").innerHTML = `${cohete_vel_actual}`;
}