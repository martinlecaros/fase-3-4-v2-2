var Cohete = /** @class */ (function () {
    function Cohete(codigo, propulsores, potencia) {
        this.codigo = codigo;
        this.propulsores = propulsores;
        this.potencia = potencia;
    }
    Cohete.prototype.print = function (codigo, propulsores, potencia) {
        return "Cohete: " + codigo + " tiene " + propulsores + " propulsores y su m\u00E1xima potencia es: " + potencia + ".";
    };
    return Cohete;
}());
