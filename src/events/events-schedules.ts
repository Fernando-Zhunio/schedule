import { EventEmitter } from "./event-emitter";

export const EventChangeDateName = "changeDate";
export const EventChangeTypeScheduleName = "changeTypeSchedule";

export const EventChangeDate = new EventEmitter(EventChangeDateName);
export const EventChangeTypeSchedule = new EventEmitter(EventChangeTypeScheduleName);