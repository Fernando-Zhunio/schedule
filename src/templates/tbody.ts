import { OptionsDaysCols, OptionsHourRows } from "../types/global";
import { DaysColumns } from "./days-columns";
import { HoursRows } from "./hours-rows";
import { Table } from "./table";

export class BodySchedule {
    private tBody = document.createElement("tbody");
    constructor(private table: Table, private options: {
        optionsHourRows?: OptionsHourRows,
        optionsDaysColumns?: OptionsDaysCols
    }) {
        this.generate();
    }

    generate() {
        const tr = document.createElement("tr");
        const td = document.createElement("td");
        const divCols = document.createElement("div");
        const divRows = document.createElement("div");

        tr.appendChild(td);
        td.appendChild(divCols);
        td.appendChild(divRows);
        this.table.getTableElement().appendChild(tr);
        this.generateRows(divRows);
        this.generateCols(divCols);
    }

    generateRows(container:HTMLElement) {
        const rows = new HoursRows(container,this.options.optionsHourRows);
    }

    generateCols(container:HTMLElement) {
        const cols = new DaysColumns(container, {labelsDays: this.options.optionsDaysColumns?.labelsHead});
    }
}