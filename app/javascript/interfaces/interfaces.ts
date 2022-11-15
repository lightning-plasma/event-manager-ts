export interface IEvent {
  id: number | undefined;
  event_type: string;
  event_date: string;
  title: string;
  speaker: string;
  host: string;
  published: boolean;
}

export type EventListProps = {
  events: IEvent[];
};

export type EventProps = EventListProps & {
  onDelete: (eventId: number) => void;
};

export type EventFormProps = EventListProps & {
  onSave: (event: IEvent) => Promise<void>;
};
