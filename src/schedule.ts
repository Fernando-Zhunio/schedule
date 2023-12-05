import { EventChangeDate, EventChangeTypeSchedule } from "./events/events-schedules";
import { DaysColumns } from "./templates/days-columns";
import HeaderSchedule from "./templates/header";
import { HoursRows } from "./templates/hours-rows";
import { ItemSchedule } from "./templates/item-schedule";
import { Table } from "./templates/table";
import { BodySchedule } from "./templates/tbody";
import { CustomDate, defaultOptions, generateKeyFormDate, getMondayDateCurrent } from "./tools/helpers";
import {
  CurrentDataSchedule,
  OptionsSchedule,
  Time,
} from "./types/global";

export class Schedule {
  container!: HTMLElement;
  private _header!: HeaderSchedule;
  public get header(): HeaderSchedule {
    return this._header;
  }
  public set header(value: HeaderSchedule) {
    this._header = value;
  }
  private _table!: Table;
  public get table(): Table {
    return this._table;
  }
  public set table(value: Table) {
    this._table = value;
  }
  private _rowsHours!: HoursRows;
  public get rowsHours(): HoursRows {
    return this._rowsHours;
  }
  public set rowsHours(value: HoursRows) {
    this._rowsHours = value;
  }
  private columnsDays!: DaysColumns;
  private _currentDate = new Date();
  public get currentDate() {
    return this._currentDate;
  }
  public set currentDate(value) {
    this._currentDate = value;
  }

  private body!: BodySchedule; 
  constructor(private options: OptionsSchedule) {
    this.options = { ...defaultOptions, ...options };
    this.container = document.querySelector(options.selector)!;
    if (!this.container) {
      throw new Error("No container found selector: " + options.selector);
    }
    this.container.classList.add("schedule-fz");
    this.generateSequential();
  }

  generateSequential() {
    this.header = new HeaderSchedule(this.container);
    this.table = new Table(this.container);
    this.body = new BodySchedule(this.table, {
      optionsHourRows:this.options.hoursRows
    });
  }

   current: CurrentDataSchedule = {
    date: new Date(),
    type: 'week',
  }

  // generateTable() {
  //   const table = new Table();
  //   this.head = new HeadTable(this.options.labelsDays!);

  //   this.rowsHours = new HoursRows(this.options.hoursRows!);
  //   this.columnsDays = new DaysColumns(this.options.labelsDays!);

  //   const tableElement = table.getTableElement();
  //   tableElement.appendChild(this.head.getHeadTable());

  //   const bodyContent = tableElement.createTBody();
  //   bodyContent.style.position = "relative";
  //   const tr = document.createElement("tr");
  //   const td = document.createElement("td");
  //   td.colSpan = this.options.labelsDays!.length + 1;
  //   const div = document.createElement("div");
  //   td.appendChild(div);
  //   div.appendChild(this.rowsHours.getHoursRows());
  //   div.appendChild(this.columnsDays.getColumnsDays());
  //   tr.appendChild(td);

  //   bodyContent.appendChild(tr);

  //   this.addChildContainer(table.getTableElement());
  // }

  addChildContainer(container: HTMLElement) {
    this.container.appendChild(container);
  }

  changeCurrentDate(date: Date) {
    this.currentDate = date;
  }

  addSchedule(item: ItemSchedule) {
    debugger;
    const { startTime, endTime } = this.options.hoursRows!;
    const { dateStart, dateEnd } = item.getOptions();
    const dateHour = `${dateStart.getHours()}:${dateStart.getMinutes()}` as any;
    const startPixel = this.calculePositionPixel(startTime, dateHour);

    const endPixel = this.calculePositionPixel(
      dateHour,
      `${dateEnd.getHours()}:${dateEnd.getMinutes()}` as any
    );

    const parentElement = this.columnsDays.getElementColumns(
      generateKeyFormDate(dateStart)
    )!;
    console.log(parentElement);
    parentElement.appendChild(
      this.generateElementItem(item, startPixel, endPixel - startPixel)
    );
  }

  private generateElementItem(item: ItemSchedule, top: number, height: number) {
    const div = document.createElement("div");
    div.classList.add("item-schedule");
    div.style.top = `${top}px`;
    div.style.height = `${height}px`;
    div.style.position = "absolute";
    div.style.left = "0";
    div.style.width = "100%";
    const div2 = document.createElement("div");
    div2.innerHTML = `<h3>${item.title}</h3>`;
    return div;
  }

  getCurrentDataSchedule(): CurrentDataSchedule {
    return this.current
  }
  
  setCurrentDataSchedule(data: CurrentDataSchedule): void {
    this.current = {
      ...this.current,
      ...data
    }
  }

  setCurrentDate(date: Date): void {
  this.current.date = new Date(date);
  EventChangeDate.dispatchEventCustom(date);
}

  private calculePositionPixel(startTime: Time, endTime: Time): number {
    const startHour = startTime.split(":");
    const endHour = endTime.split(":");
    const start = Number(startHour?.[0]) * 60 + Number(startHour?.[1]);
    const end = Number(endHour?.[0]) * 60 + Number(endHour?.[1]);
    return (
      (end - start) *
      (this.options.hoursRows?.heightRows! /
        this.options.hoursRows?.minutesInterval!)
    );
  }

  nextSchedule(isPrevious: boolean = false) {
    // debugger;
    switch (this.current.type) {
      case 'month':
        this.setCurrentDate(new Date(this.current.date.getFullYear(), this.current.date.getMonth() + (isPrevious ? -1 : 1), 1));
        break;
      case 'week':
        const mondayWeek = CustomDate(getMondayDateCurrent(this.current.date));
        const nextWeek = mondayWeek.getDate() + (isPrevious ? -7 : 7);
        this.setCurrentDate(new Date(mondayWeek.setDate(nextWeek)));
        break;
      case 'day':
        this.setCurrentDate(new Date(this.current.date.getFullYear(), this.current.date.getMonth(), this.current.date.getDate() + (isPrevious ? -1 : 1)));
        break;
    }
  }

  changeTypeSchedule(type: 'day' | 'week' | 'month') {
    this.current.type = type;
    EventChangeTypeSchedule.dispatchEventCustom(type);
  }

}
