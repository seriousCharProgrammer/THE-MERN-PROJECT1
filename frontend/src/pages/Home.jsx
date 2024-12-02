import React from 'react';
import { Link } from 'react-router';
import { FaQuestionCircle, FaTicketAlt } from 'react-icons/fa';
export default function Home() {
  return (
    <>
      <section className='heading'>
        <h1>What do you need help with</h1>
        <p>Please choose from an option below</p>
      </section>
      <Link to='/newticket' className='btn btn-reverse btn-block'>
        <FaQuestionCircle /> Create New Ticket
      </Link>
      <Link to='/tickets' className='btn  btn-block'>
        <FaTicketAlt /> View my Tickets
      </Link>
    </>
  );
}
