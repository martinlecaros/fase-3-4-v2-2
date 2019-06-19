class Cohete {
    codigo:string;
    propulsores:number;
    potencia: Array<number>;
    
    constructor(codigo:string,propulsores:number,potencia:Array<number>){
        this.codigo=codigo;
        this.propulsores=propulsores;
        this.potencia=potencia;
    }

    print(codigo,propulsores,potencia) {
        
        return `Cohete: ${codigo} tiene ${propulsores} propulsores y su máxima potencia es: ${potencia}.`;
    
    }
}
