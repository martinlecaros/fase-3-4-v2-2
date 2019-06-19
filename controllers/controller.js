var create_cohete = document.querySelector("#cohete");
var print_cohete = document.querySelector("#printcohete");
var print_all_cohete = document.querySelector("#print_all_cohete");
print_cohete.disabled = true;
var reducer = function (accumulator, currentValue) { return accumulator + currentValue; };
window.addEventListener('load', function () {
    create_cohete.addEventListener("click", selectCohete, false);
    print_cohete.addEventListener("click", printCohete, false);
    print_all_cohete.addEventListener("click", printAllCohetes, false);
});
/// GLOBAL OBJECTS
var cohete;
var cohete_vel_actual;
var cohete_vel_maxima;
var cohetes_libreria = new Map();
var count = 0;
var nombre;
/// DATA
var data = {
    cohete1: { codigo: "32WESSDS", propulsores: 3, potencia: [10, 30, 80] },
    cohete2: { codigo: "LDSFJA32", propulsores: 6, potencia: [30, 40, 50, 50, 30, 10] }
};
// FUNCTIONS: SELECT, CREATE AND SAVE COHETE
function selectCohete() {
    var size_data = Object.keys(data).length;
    var values_cohete = Object.values(data)[count];
    if (count < size_data) {
        var codigo = values_cohete.codigo;
        var propulsores = values_cohete.propulsores;
        var potencia = values_cohete.potencia;
        cohete = new Cohete(codigo, propulsores, potencia);
        console.log(cohete);
        // save cohete in a MAP()
        nombre = "cohete" + count;
        cohetes_libreria.set(nombre, { "codigo": cohete.codigo, "propulsores": cohete.propulsores, "potencia": cohete.potencia });
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
    var p = document.createElement("p");
    document.querySelector("#content").appendChild(p);
    document.querySelector("#content > :first-child").setAttribute("class", "mt-2");
    document.querySelector("#content > :first-child").innerHTML = cohete.print(cohete.codigo, cohete.propulsores, cohete.potencia) + "\n    \n    <br>M\u00E1xima velocidad: " + cohete_vel_maxima + "\n    <br>Velocidad actual: <span id=\"velocidad_id\">" + cohete_vel_actual + "</span>\n    <span><button type=\"button\" class=\"btnacdc btn btn-sm\" id=\"ac_cohete\">+</button>\n    <button type=\"button\" class=\"btnacdc btn btn-sm\" id=\"de_cohete\">-</button></span>";
    var acc_cohete = document.querySelector("#ac_cohete");
    var dec_cohete = document.querySelector("#de_cohete");
    acc_cohete.addEventListener("click", accCohete, false);
    dec_cohete.addEventListener("click", decCohete, false);
    create_cohete.disabled = false;
    print_cohete.disabled = true;
}
;
function printAllCohetes() {
    var print = "";
    cohetes_libreria.forEach(function (key, value) {
        print += JSON.stringify(value) + ":" + JSON.stringify(key);
    });
    alert(print);
}
/// ACELERAR - FRENAR
function accCohete() {
    if (cohete_vel_actual < cohete_vel_maxima) {
        cohete_vel_actual += 10;
    }
    document.querySelector("#velocidad_id").innerHTML = "" + cohete_vel_actual;
}
function decCohete() {
    if (cohete_vel_actual > 0) {
        cohete_vel_actual -= 10;
    }
    document.querySelector("#velocidad_id").innerHTML = "" + cohete_vel_actual;
}
