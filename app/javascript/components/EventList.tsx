import React, { useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { IEvent, EventListProps } from "../interfaces/interfaces";

const EventList: React.FC<EventListProps> = ({ events }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const searchInput = useRef<HTMLInputElement>(null);

  const updateSearchTerm = () => {
    setSearchTerm(searchInput.current!.value);
  };

  const matchSearchTerm = (el: IEvent) => {
    const { id, published, ...rest } = el;
    return Object.values(rest).some(
      (value) => value.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
    );
  };

  const renderEvents = (eventArray: IEvent[]) => {
    const filteredEventArray = eventArray
      .filter((el) => matchSearchTerm(el))
      .sort((a, b) => {
        const d1 = new Date(a.event_date);
        const d2 = new Date(b.event_date);
        return d2.getTime() - d1.getTime();
      });

    return filteredEventArray.map((event) => (
      <li key={event.id}>
        <NavLink to={`/events/${event.id!}`}>
          {event.event_date}
          {" - "}
          {event.event_type}
        </NavLink>
      </li>
    ));
  };

  return (
    <section className="eventList">
      <h2>
        Events
        <Link to="/events/new">New Event</Link>
      </h2>
      <input
        className="search"
        placeholder="search"
        type="text"
        ref={searchInput}
        onKeyUp={updateSearchTerm}
      />
      <ul>{renderEvents(events)}</ul>
    </section>
  );
};

export default EventList;
