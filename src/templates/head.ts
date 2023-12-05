import { EventChangeDate, EventChangeDateName, EventChangeTypeSchedule, EventChangeTypeScheduleName } from "../events/events-schedules";
import { DefaultDays, generateKeyFormDate, getMondayDateCurrent } from "../tools/helpers";
import { LabelHead, OptionsHeadTable } from "../types/global";

export class HeadTable {
    private thead: HTMLTableSectionElement = document.createElement("thead");;
    private items = new Map<string, HTMLTableCellElement>();
    private options: Required<OptionsHeadTable> =  {
        labelsDays: this.generateLabelHeadDate(new Date()),
    };
    constructor(private tableContainer: HTMLTableElement, options: OptionsHeadTable) {
        this.generate();
        EventChangeDate.addEventListener(EventChangeDateName,(date: any) => {            
            this.options.labelsDays = this.generateLabelHeadDate(date.detail.message),
            this.changeHeadTable(this.options.labelsDays);
          })
          EventChangeTypeSchedule.addEventListener(EventChangeTypeScheduleName,(type: any) => {
              
          })
    }

    generate() {
        const thead = document.createElement("thead");
        const table = document.createElement("table");
        const tr = document.createElement("tr");
        const th = document.createElement("th");
        const div = document.createElement("div");
        this.changeHeadTable(this.options.labelsDays!);
        thead.appendChild(tr);
        tr.appendChild(th);
        th.appendChild(div);
        div.appendChild(table);
        table.appendChild(this.thead);
        this.tableContainer.appendChild(thead);
    }

    public changeHeadTable(labelsDays: LabelHead[]) {
        this.thead.innerHTML = "";
        const tr = document.createElement("tr");
        const spaceHour = document.createElement("th");
        spaceHour.style.width = "60px";
        tr.appendChild(spaceHour);
        labelsDays.forEach(({key, text}) => {
            const th = document.createElement("th");
            th.innerHTML = `<div>${text}</div><div>${new Date(key).getDate()}</div>`;
            this.items.set(key, th);
            tr.appendChild(th);
        });
        this.thead.appendChild(tr);
    }

    public changeTypeHead(type: 'day' | 'week' | 'month') {
        
    }

    getHeadTable() {
        return this.thead
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