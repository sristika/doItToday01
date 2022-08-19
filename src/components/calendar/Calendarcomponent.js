import React from 'react';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import listPlugin from '@fullcalendar/list';
import rrulePlugin from '@fullcalendar/rrule';
import { ListView } from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';

const Calendarcomponent = () => {
  return (
    <>
      <div>Calendar</div>
      <FullCalendar
        headerToolbar={{
          left: 'today prev,next',
          center: 'title',
          right: 'dayGridMonth,listWeek',
        }}
        plugins={[rrulePlugin, listPlugin, dayGridPlugin]}
        initialView="listWeek"
        weekends={false}
        eventClick={function (arg) {
          alert(arg.event.title);
          alert(arg.event.start);
        }}
        events={[
          {
            title: 'my recurring blue event',
            groupId: 'blueEvents', // recurrent events in this group move together
            daysOfWeek: ['4'],
            startTime: '10:45:00',
            endTime: '12:45:00',
          },
          {
            title: 'my recurring red event',
            daysOfWeek: ['3'], // these recurrent events move separately
            startTime: '11:00:00',
            endTime: '11:30:00',
            color: 'red',
          },
          { title: 'event 1', date: '2022-08-19' },
          { title: 'event 2', date: '2022-08-16' },
        ]}
      />
    </>
  );
};

export default Calendarcomponent;
