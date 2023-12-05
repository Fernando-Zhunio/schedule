import { DefaultDays, generateKeyFormDate, getMondayDateCurrent } from "../tools/helpers";
import { LabelHead } from "../types/global";

export class DaysColumns {
    // private contentElement = document.createElement("div");
    private table = document.createElement("table");
    private tBody = document.createElement("tbody");
    private columns = new Map<string, HTMLTableCellElement>();
    private options: {
        labelsDays?: LabelHead[];
    } = {
        labelsDays: [],
    }

    constructor(private container: HTMLElement, options: {
        labelsDays?: LabelHead[];
    }) {
        this.container.classList.add('days-columns');
        this.generate();
    }

    generate() {
        this.table.appendChild(this.tBody);
        this.container.appendChild(this.table);
        this.changeColumnsTable(this.options.labelsDays!);
    }

    public changeColumnsTable(labelsDays: LabelHead[]) {
        this.tBody.innerHTML = "";
        const tr = document.createElement("tr");
        const spaceHour = document.createElement("td");
        spaceHour.style.width = "60px";
        tr.appendChild(spaceHour);
        labelsDays.forEach(({key, text}) => {
            const td = document.createElement("td");
            td.style.position = "relative";
            this.columns.set(key, td);
            tr.appendChild(td);
        });
        this.tBody.appendChild(tr);
    }

    getElementColumns(key: string) {
        return this.columns.get(key);
    }

    generateLabelHeadDate(currentDate: Date, days: number = 7) {
        const d = getMondayDateCurrent(currentDate);
        const labelHead: LabelHead[] = [];
        for (let i = 0; i < days; i++) {
          const key = generateKeyFormDate(d);
          labelHead.push({
              key: key,
              text: DefaultDays[d.getDay()],
          });
          d.setDate(d.getDate() + 1);
        }
        return labelHead;
      }

}