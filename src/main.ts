import { Schedule } from "./schedule";
import "./style.css";
import { ItemSchedule } from "./templates/item-schedule";

const schedule = new Schedule({ selector: "#schedule" });

const btnAdd = document.querySelector<HTMLButtonElement>("#btn-add")!;
const btnNext = document.querySelector<HTMLButtonElement>("#btn-next")!;
const btnPrevious = document.querySelector<HTMLButtonElement>("#btn-previous")!;

btnAdd.addEventListener("click", () => {
  debugger;
  const time = document.querySelector<HTMLInputElement>("#time")!.value;
  const date = document.querySelector<HTMLInputElement>("#date")!.value;
  const item = new ItemSchedule({
    title: "title",
    message: "message",
    dateStart: new Date(`${date} ${time}`),
    dateEnd: new Date(date),
    hoursRows: "00:00",
  });
  schedule.addSchedule(item);
});

btnNext.addEventListener("click", () => {
  schedule.nextSchedule();
})

btnPrevious.addEventListener("click", () => {
  schedule.nextSchedule(true);
})

