import { Time } from "../types/global"

export class ItemSchedule {
    private div = document.createElement("div");
    title = "";
    message: string | undefined = "";
    dateStart!: Date;
    dateEnd!: Date;
    hoursRows!: Time;
    constructor(
        private options: {
            title: string,
            message?: string,
            dateStart: Date,
            dateEnd: Date,
            hoursRows: Time
        },
    ) {
        this.title = options.title;
        this.message = options.message;
        this.dateStart = options.dateStart;
        this.dateEnd = options.dateEnd;
        this.hoursRows = options.hoursRows;
    }
    
    getOptions() {
        return this.options
    }
    
}