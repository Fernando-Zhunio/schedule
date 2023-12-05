import { EventChangeDate, EventChangeDateName } from "../events/events-schedules";
import { IOptionsHeader, ScheduleOnInit } from "../types/global";

export default class HeaderSchedule implements ScheduleOnInit {
  private valueChange!: HTMLElement;
  private options: Required<IOptionsHeader> = { date: new Date(), lang: "es" }
  constructor(private container: HTMLElement, options: IOptionsHeader | null = null) {
    this.onInit();
    this.options = {
      ...options,
      ...this.options,
    }
  }

  onInit(): void {
    this.generate();
    EventChangeDate.addEventListener(EventChangeDateName,(date: any) => {
      console.log({date}, date.detail.message);
      this.valueChange.innerHTML = this.getMonthByName(date.detail.message);
    })
  }

  generate() {
    const { template, changeElement } = this.headerTemplate(this.options.date);
    this.container.appendChild(template);
    this.valueChange = changeElement;
  }

  headerTemplate(date: Date = new Date()) {
    const div = document.createElement("div");
    const h2 = document.createElement("h2");
    h2.innerHTML = this.getMonthByName(date) + " " + date.getFullYear();
    div.appendChild(h2);
    return {
      template: div,
      changeElement: h2,
    };
  }


  getMonthByName(date: Date = new Date()) {
    return date.toLocaleDateString(this.options.lang, { month: "long" });
  }
}
