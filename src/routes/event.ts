import express from 'express';
import IEvent from '@/models/event';
import mockedEvents from '../mocks/events';

const router: express.Router = express.Router();

let events: IEvent[] = mockedEvents;

router.get('/', (req, res) => {
  res.json(events);
});

router.get('/:eventId', (req, res) => {
  const eventId = parseInt(req.params.eventId, 10);
  if (!eventId) {
    return res.sendStatus(400);
  }
  // making a for/of loop for speeding up return process without filtering all results
  for (const event of events) {
    if (event.id === eventId) {
      return res.json(event);
    }
  }
  // if no return from for/of loop, returns 404 Not Found
  return res.sendStatus(404);
});

router.post('/', (req, res) => {
  const event = req.body as IEvent;
  // TODO: add data validation
  const newEvent = {
    ...event,
    id: Math.max(...events.map(e => e.id)) + 1,
  };
  events = events.concat(newEvent);
  return res.send(event);
});

router.put('/:eventId', (req, res) => {
  const eventId = parseInt(req.params.eventId, 10);
  if (!eventId) {
    return res.sendStatus(400);
  }
  const event = req.body as IEvent;
  // TODO: add data validation
  if (event.id !== eventId) {
    return res.sendStatus(400);
  }
  const r: { events: IEvent[], isFound: boolean } = events.reduce(
    (acc: { events: IEvent[], isFound: boolean }, e) => {
      const isFound = e.id === eventId;
      return {
        events: acc.events.concat(isFound ? event : e),
        isFound: acc.isFound || isFound,
      }
    }, { events: [], isFound: false });

  if (!r.isFound) {
    return res.sendStatus(404);
  }

  events = r.events;
  return res.sendStatus(200);
});

router.patch('/:eventId', (req, res) => {
  const eventId = parseInt(req.params.eventId, 10);
  if (!eventId) {
    return res.sendStatus(400);
  }
  const event = req.body as IEvent;
  // TODO: add data validation
  if (event.id && event.id !== eventId) {
    return res.sendStatus(400);
  }
  const r: { events: IEvent[], isFound: boolean } = events.reduce(
    (acc: { events: IEvent[], isFound: boolean }, e) => {
      const isFound = e.id === eventId;
      return {
        events: acc.events.concat(isFound ? { ...e, ...event } : e),
        isFound: acc.isFound || isFound,
      }
    }, { events: [], isFound: false });

  if (!r.isFound) {
    return res.sendStatus(404);
  }

  events = r.events;
  return res.sendStatus(200);
});

router.delete('/:eventId', (req, res) => {
  const eventId = parseInt(req.params.eventId, 10);
  if (!eventId) {
    return res.sendStatus(400);
  }
  const oldLength = events.length;
  events = events.filter(e => e.id !== eventId);
  if (oldLength === events.length) {
    return res.sendStatus(404);
  }
  return res.sendStatus(200);
});

export default router;
