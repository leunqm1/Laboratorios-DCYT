export default class Cl_vEquipoVista {
    private _inIdEquipo: HTMLInputElement;
    private _btMantenimiento: HTMLButtonElement;
    private _btResolver: HTMLButtonElement;
    private _consolaData: HTMLElement;

    constructor() {
        this._inIdEquipo = <HTMLInputElement>document.getElementById("inIdEquipo");
        this._btMantenimiento = <HTMLButtonElement>document.getElementById("btMantenimiento");
        this._btResolver = <HTMLButtonElement>document.getElementById("btResolver");
        this._consolaData = <HTMLElement>document.getElementById("consolaData");
    }

    get idEquipo(): string { return this._inIdEquipo.value; }
    get consolaData(): HTMLElement { return this._consolaData; }

    onMantenimiento(callback: () => void): void { this._btMantenimiento.onclick = () => callback(); }
    onResolver(callback: () => void): void { this._btResolver.onclick = () => callback(); }
}