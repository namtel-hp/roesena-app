import { EventActions, EventActionTypes } from '../actions/event.actions';
import { AppEvent } from '@utils/interfaces';
import * as fromRoot from '@state/state.module';

export const eventFeatureKey = 'calendar';

interface CalendarState {
  events: AppEvent[];
  currentDate: Date;
  days: AppEvent[][];
  isLoading: boolean;
}

export interface State extends fromRoot.State {
  calendar: CalendarState;
}

export const initialState: CalendarState = {
  events: [],
  currentDate: new Date(),
  days: [],
  isLoading: false,
};

export function reducer(state = initialState, action: EventActions): CalendarState {
  switch (action.type) {
    case EventActionTypes.DateLoaded:
      return { ...state, currentDate: action.payload.currentDate };

    case EventActionTypes.LoadEventsSuccess:
      const currentDate = state.currentDate;
      const value: AppEvent[][] = new Array(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()).fill(
        []
      );
      const days = value.map((_, index) => {
        const eventsForDay: AppEvent[] = [];
        const startDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), index + 1, 0, 0).getTime();
        const endDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), index + 1, 24, 0).getTime();
        action.payload.events.forEach((event) => {
          if (event.date.getTime() <= endDay && event.date.getTime() >= startDay) {
            eventsForDay.push(event);
          }
        });
        return eventsForDay;
      });
      return { ...state, events: action.payload.events, days, isLoading: false };

    case EventActionTypes.LoadEventsFailure:
      return { ...state, isLoading: false };

    case EventActionTypes.LoadEvents:
    case EventActionTypes.GoNextMonth:
    case EventActionTypes.GoPreviousMonth:
      return { ...state, events: [], days: [], isLoading: true };

    default:
      return state;
  }
}
