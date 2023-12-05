export interface OptionsSchedule {
    selector: string,
    labelsDays?: LabelHead[],
    hoursRows?: OptionsHourRows,
    daysCols?: OptionsDaysCols
}

export interface LabelHead {key:string, text: string}

type Time = `${'00' | '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19' | '20' | '21' | '22' | '23'}:${'00' | '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19' | '20' | '21' | '22' | '23' | '24' | '25' | '26' | '27' | '28' | '29' | '30' | '31' | '32' | '33' | '34' | '35' | '36' | '37' | '38' | '39' | '40' | '41' | '42' | '43' | '44' | '45' | '46' | '47' | '48' | '49' | '50' | '51' | '52' | '53' | '54' | '55' | '56' | '57' | '58' | '59'}`;


export interface OptionsHourRows {
    startTime: Time,
    endTime: Time,
    minutesInterval: number,
    heightRows: number,
}

export interface OptionsDaysCols {
    labelsHead: LabelHead[],
}

export interface IOptionsHeader {
    lang: 'es' | 'en';
    date: Date
}

export interface ScheduleOnInit {
    onInit(arr: any): void
}

export interface OptionsHeadTable {
    labelsDays: LabelHead[],
}

export interface CurrentDataSchedule {
    date: Date,
    type: 'day' | 'week' | 'month'
}