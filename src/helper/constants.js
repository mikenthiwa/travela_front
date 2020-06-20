import {
  addDays,
  endOfDay,
  startOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  addMonths,
} from 'date-fns';

const definedRanges = {
  'This week': {
    from: startOfWeek(new Date()),
    to: endOfWeek(new Date())
  },
  'Last week': {
    from: startOfWeek(addDays(new Date(), -7)),
    to: endOfWeek(addDays(new Date(), -7))
  },
  'Today': {
    from: startOfDay(new Date()),
    to: endOfDay(new Date())
  },
  'Yesterday': {
    from: startOfDay(addDays(new Date(), -1)),
    to: endOfDay(addDays(new Date(), -1))
  },
  'This month': {
    from: startOfMonth(new Date()),
    to: endOfMonth(new Date())
  },
  'Last month': {
    from: startOfMonth(addMonths(new Date(), -1)),
    to: endOfMonth(addMonths(new Date(), -1))
  }
};
export default definedRanges;
