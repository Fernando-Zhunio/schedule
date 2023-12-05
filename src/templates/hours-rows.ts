import { OptionsHourRows } from "../types/global";

export class HoursRows {
  private table = document.createElement("table");
  private tBody = document.createElement("tbody");
  private hoursRows: HTMLTableSectionElement = document.createElement("tbody");
  private options: OptionsHourRows = {
    endTime: "23:59",
    heightRows: 30,
    minutesInterval: 5,
    startTime: "00:00",
  };
  constructor(private container: HTMLElement, options?: OptionsHourRows) {
    this.container.classList.add("hours-rows");
    this.options = {
      ...this.options,
      ...options,
    }
    this.generate();
  }

  generate() {
    // const listTr = this.changeIntervalHtml(this.options).join("");
    // this.hoursRows.innerHTML = html;
    this.changeInterval(this.options);
    this.table.appendChild(this.tBody);
    this.container.appendChild(this.table);
  }

  changeInterval(options: OptionsHourRows) {
    // const result: HTMLTableRowElement[] = [];
    const start = new Date(`2000-01-01 ${options.startTime}`);
    const end = new Date(`2000-01-01 ${options.endTime}`);

    while (start < end) {
      const hour = start.toLocaleTimeString("es", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      const tr = document.createElement("tr");
      // tr.classList.add("hour-schedule");
      tr.style.height = `${this.options.heightRows}px`;
      tr.innerHTML = `<td style="width: 60px;">${hour}</td><td></td>`;
      this.tBody.appendChild(tr);
      start.setMinutes(start.getMinutes() + options.minutesInterval);
    }
  }
}
