import React from "react";
import { Link, useParams } from "react-router-dom";
import { EventProps } from "../interfaces/interfaces";
import EventNotFound from "./EventNotFound";

const Event: React.FC<EventProps> = ({ events, onDelete }) => {
  const { id } = useParams();
  const event = events.find((e) => e.id === Number(id));

  if (!event) return <EventNotFound />;

  return (
    <div className="eventContainer">
      <h2>
        {event.event_date}
        {" - "}
        {event.event_type}
        <Link to={`/events/${event.id!}/edit`}>Edit</Link>
        <button
          className="delete"
          type="button"
          onClick={() => onDelete(event.id!)}
        >
          Delete
        </button>
      </h2>
      <ul>
        <li>
          <strong>Type:</strong> {event.event_type}
        </li>
        <li>
          <strong>Date:</strong> {event.event_date}
        </li>
        <li>
          <strong>Title:</strong> {event.title}
        </li>
        <li>
          <strong>Speaker:</strong> {event.speaker}
        </li>
        <li>
          <strong>Host:</strong> {event.host}
        </li>
        <li>
          <strong>Published:</strong> {event.published ? "yes" : "no"}
        </li>
      </ul>
    </div>
  );
};

export default Event;
