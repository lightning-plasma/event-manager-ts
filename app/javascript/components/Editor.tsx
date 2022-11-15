import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "./Header";
import { IEvent } from "../interfaces/interfaces";
import EventList from "./EventList";
import Event from "./Event";
import EventForm from "./EventForm";
import { success } from "../helpers/notification";
import { handleAjaxError } from "../helpers/helpers";

const Editor = () => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<IEvent[]> = await axios.get(
          "/api/events"
        );
        setEvents(response.data);
      } catch (e) {
        handleAjaxError(e);
      }

      setIsLoading(false);
    };

    fetchData().catch((e) => handleAjaxError(e));
  }, []);

  const addEvent = async (newEvent: IEvent) => {
    try {
      const response: AxiosResponse<IEvent> = await axios.post(
        "/api/events",
        newEvent
      );
      const newEvents = [...events, response.data];
      setEvents(newEvents);
      success("Event Added");
      navigate(`/events/${response.data.id!}`);
    } catch (e) {
      handleAjaxError(e);
    }
  };

  const updateEvent = async (updatedEvent: IEvent) => {
    try {
      await axios.put(
        `/api/events/${updatedEvent.id!}`,
        updatedEvent
      );

      const newEvents = events;
      const idx = newEvents.findIndex((event) => event.id === updatedEvent.id);
      newEvents[idx] = updatedEvent;
      setEvents(newEvents);

      success("Event Updated");
      navigate(`/events/${updatedEvent.id!}`);
    } catch (e) {
      handleAjaxError(e);
    }
  };

  const deleteEvent = (eventId: number) => {
    const sure = window.confirm("Are you sure?");

    if (sure) {
      axios
        .delete(`/api/events/${eventId}`)
        .then(() => {
          success("Event Deleted!");
          navigate("/events");
          setEvents(events.filter((event) => event.id !== eventId));
        })
        .catch((e) => handleAjaxError(e));
    }
  };

  return (
    <>
      <Header />
      <div className="grid">
        {isLoading ? (
          <p className="loading">Loading...</p>
        ) : (
          <>
            <EventList events={events} />
            <Routes>
              <Route
                path=":id"
                element={<Event events={events} onDelete={deleteEvent} />}
              />
              <Route path=":id/edit" element={<EventForm events={events} onSave={updateEvent} />} />
              <Route path="new" element={<EventForm events={events} onSave={addEvent} />} />
            </Routes>
          </>
        )}
      </div>
    </>
  );
};

export default Editor;
