export default class Cl_vEquipoVista {
    _inIdEquipo;
    _btMantenimiento;
    _btResolver;
    _consolaData;
    constructor() {
        this._inIdEquipo = document.getElementById("inIdEquipo");
        this._btMantenimiento = document.getElementById("btMantenimiento");
        this._btResolver = document.getElementById("btResolver");
        this._consolaData = document.getElementById("consolaData");
    }
    get idEquipo() { return this._inIdEquipo.value; }
    get consolaData() { return this._consolaData; }
    onMantenimiento(callback) { this._btMantenimiento.onclick = () => callback(); }
    onResolver(callback) { this._btResolver.onclick = () => callback(); }
}
//# sourceMappingURL=Cl_vEquipo.js.map