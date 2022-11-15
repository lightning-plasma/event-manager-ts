import { IEvent } from "../interfaces/interfaces";
import { error } from "./notification";

export class FormError {
  private static keys = ["eventType", "eventDate", "title", "speaker", "host"];

  errors: Map<string, string>;

  constructor() {
    this.errors = new Map<string, string>();
  }

  hasError() {
    return this.errors.size > 0;
  }

  getErrors(): string[] {
    return FormError.keys.reduce((result: string[], key) => {
      const v = this.errors.get(key);
      if (v) result.push(v);
      return result;
    }, []);
  }

  setError(key: string, errorMessage: string) {
    this.errors.set(key, errorMessage);
  }
}

const isValidDate = (d: string) => !Number.isNaN(Date.parse(d));

export const validateEvent = (e: IEvent) => {
  const errors = new FormError();

  if (e.event_type === "") {
    errors.setError("eventType", "You must enter an event type");
  }

  if (!isValidDate(e.event_date)) {
    errors.setError("eventDate", "You must enter a valid date");
  }

  if (e.title === "") {
    errors.setError("title", "You must enter a title");
  }

  if (e.speaker === "") {
    errors.setError("speaker", "You must enter at least one speaker");
  }

  if (e.host === "") {
    errors.setError("host", "You must enter at least one host");
  }

  return errors;
};

export const formatDate = (d: Date) => {
  const YYYY = d.getFullYear();
  const MM = `0${d.getMonth() + 1}`.slice(-2);
  const DD = `0${d.getDate()}`.slice(-2);

  return `${YYYY}-${MM}-${DD}`;
};

export const handleAjaxError = (e: unknown) => {
  error("something went wrong");
  console.error(e);
};
