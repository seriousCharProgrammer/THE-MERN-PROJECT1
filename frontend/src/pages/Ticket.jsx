import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeTicket, getTicket, reset } from '../features/tickets/ticketSlice';
import BackButton from '../Components/BackButton';
import Spinner from '../Components/Spinner';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import { getNotes, reset as notesReset } from '../features/notes/noteSlice';
import NoteItem from '../Components/Noteitem';
import Modal from 'react-modal';
export default function Ticket() {
  const { ticket, isLoading, isError, message } = useSelector(
    (state) => state.tickets
  );
  const { notes, isLoading: notesIsLoading } = useSelector(
    (state) => state.notes
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { ticketId } = useParams();
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getTicket(ticketId));
    dispatch(getNotes());

    dispatch(reset());
  }, [isError, message, ticketId, dispatch]);
  if (isLoading || notesIsLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h3>Something Went Wrong</h3>;
  }
  const onTicketClose = () => {
    dispatch(closeTicket(ticketId));
    toast.success('Ticket Closed');
    navigate('/tickets');
  };
  return (
    <div className='ticket-page'>
      <header className='ticket-header'>
        <BackButton url='/tickets' />
        <h2>
          Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>
        <h3>
          Date Submitted:
          {new Date(ticket.createdAt).toLocaleString('en-US')}
        </h3>
        <h3>Product: {ticket.product}</h3>
        <hr />
        <div className='ticket-desc'>
          <h3>Description of Issue</h3>
          <p>{ticket.description}</p>
        </div>
        <h2>Notes</h2>
      </header>
      {notes.map((note) => (
        <NoteItem key={note._id} note={note} />
      ))}
      {ticket.status !== 'closed' && (
        <button className='btn btn-block btn-danger' onClick={onTicketClose}>
          Close ticket
        </button>
      )}
    </div>
  );
}
