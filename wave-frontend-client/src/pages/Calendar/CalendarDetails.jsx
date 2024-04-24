import React from 'react'
import '../Calendar/calendardetails.css'


function CalendarDetails({block}) {
  return (
    <>
    <div className='calendar-container'>
      {block.title}
    </div>
    </>
  )
}

export default CalendarDetails