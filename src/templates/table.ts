import { OptionsHeadTable } from "../types/global";
import { HeadTable } from "./head";

export class Table {
    private table: HTMLTableElement = document.createElement("table");
    private tHead!: HeadTable;
    private tBody!: HTMLTableSectionElement
    private options!: OptionsHeadTable
    private rowsTable!: {
        rowElement: HTMLTableRowElement;
        hour: string;
    }[]
    constructor(private container: HTMLElement, options: OptionsHeadTable ) {
        this.generate();
        this.options = {
            ...this.options,
            ...options
        }
    }

    generate() {
        this.tHead = new HeadTable(this.table, this.options);
        this.container.appendChild(this.table);
    }

    generateTBody() {
        this.tBody= this.table.createTBody();
        this.tBody.style.position = "relative";
    }

    getTableElement() {
        return this.table
    }

    generateRows() {

    }
    
    
}