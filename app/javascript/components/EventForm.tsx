import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Pikaday from "pikaday";
import { EventFormProps, IEvent } from "../interfaces/interfaces";
import {
  formatDate,
  FormError,
  handleAjaxError,
  validateEvent,
} from "../helpers/helpers";
import "pikaday/css/pikaday.css";
import EventNotFound from "./EventNotFound";

const EventForm: React.FC<EventFormProps> = ({ events, onSave }) => {
  const { id } = useParams();
  const initialEventState = useCallback(() => {
    const defaults: IEvent = {
      id: undefined,
      event_type: "",
      event_date: "",
      title: "",
      speaker: "",
      host: "",
      published: false,
    };

    const currentEvent = id
      ? events.find((e) => e.id === Number(id))
      : ({} as IEvent);

    return { ...defaults, ...currentEvent };
  }, [events, id]);

  const [event, setEvent] = useState(initialEventState);

  const updateEvent = (key: string, value: string | boolean) => {
    setEvent((prevEvent) => ({ ...prevEvent, [key]: value }));
  };

  const [formErrors, setFormErrors] = useState<FormError>(new FormError());
  const dateInput = useRef<HTMLInputElement>(null);

  const cancelURL = event.id ? `/events/${event.id}` : "/events";
  const title = event.id
    ? `${event.event_date} - ${event.event_type}`
    : "New Event";

  useEffect(() => {
    // eslint-disable-next-line max-len
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
    const p = new Pikaday({
      field: dateInput.current,
      toString: (date: Date) => formatDate(date),
      onSelect: (date: Date) => {
        const formattedDate = formatDate(date);
        if (dateInput.current) {
          dateInput.current.value = formattedDate;
          updateEvent("event_date", formattedDate);
        }
      },
    });

    // eslint-disable-next-line max-len
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
    return () => p.destroy();
  }, []);

  useEffect(() => {
    setEvent(initialEventState);
  }, [events, initialEventState]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { target } = e;
    const { name } = target;
    const isCheckBox = target.type === "checkbox";
    const value = isCheckBox
      ? (target as HTMLInputElement).checked
      : target.value;

    updateEvent(name, value);
  };

  const renderErrors = () => {
    if (!formErrors.hasError()) return null;

    return (
      <div className="errors">
        <h3>The following errors prohibited the event from being saved:</h3>
        <ul>
          {formErrors.getErrors().map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
      </div>
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateEvent(event);

    if (errors.hasError()) {
      setFormErrors(errors);
    } else {
      onSave(event).catch((saveErr) => handleAjaxError(saveErr));
    }
  };

  if (id && !event.id) return <EventNotFound />;

  return (
    <section>
      {renderErrors()}

      <h2>{title}</h2>
      <form className="eventForm" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="event_type">
            <strong>Type:</strong>
            <input
              type="text"
              id="event_type"
              name="event_type"
              onChange={handleInputChange}
              value={event.event_type}
            />
          </label>
        </div>
        <div>
          <label htmlFor="event_date">
            <strong>Date:</strong>
            <input
              type="text"
              id="event_date"
              name="event_date"
              ref={dateInput}
              autoComplete="off"
              value={event.event_date}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label htmlFor="title">
            <strong>Title:</strong>
            <textarea
              cols={30}
              rows={10}
              id="title"
              name="title"
              onChange={handleInputChange}
              value={event.title}
            />
          </label>
        </div>
        <div>
          <label htmlFor="speaker">
            <strong>Speakers:</strong>
            <input
              type="text"
              id="speaker"
              name="speaker"
              onChange={handleInputChange}
              value={event.speaker}
            />
          </label>
        </div>
        <div>
          <label htmlFor="host">
            <strong>Hosts:</strong>
            <input
              type="text"
              id="host"
              name="host"
              onChange={handleInputChange}
              value={event.host}
            />
          </label>
        </div>
        <div>
          <label htmlFor="published">
            <strong>Publish:</strong>
            <input
              type="checkbox"
              id="published"
              name="published"
              onChange={handleInputChange}
              checked={event.published}
            />
          </label>
        </div>
        <div className="form-actions">
          <button type="submit">Save</button>
          <Link to={cancelURL}>Cancel</Link>
        </div>
      </form>
    </section>
  );
};

export default EventForm;
