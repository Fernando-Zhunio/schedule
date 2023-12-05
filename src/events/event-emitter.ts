export class EventEmitter extends EventTarget {
  constructor(private nameEvent: string) {
    super();
  }
  dispatchEventCustom(message: Date | string) {
    const miEvento = new CustomEvent(this.nameEvent, { detail: { message } });
    this.dispatchEvent(miEvento);
  }
}
