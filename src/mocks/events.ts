import IEvent from "@/models/event";

const mockedEvents: IEvent[] = [{
  id: 1,
  datetime: new Date(2020, 6, 1),
  title: 'Event 1',
}, {
  id: 2,
  datetime: new Date(2020, 7, 2),
  title: 'Event 2',
}, {
  id: 3,
  datetime: new Date(2020, 8, 3),
  title: 'Event 3',
}];

export default mockedEvents;
