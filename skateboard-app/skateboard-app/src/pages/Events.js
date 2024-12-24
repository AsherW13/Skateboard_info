import React, {useState, useEffect} from 'react';
import { supabase } from '../supabaseClient';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      console.log('Fetching events...');
      try {
        const { data, error } = await supabase.from('events').select();
        console.log('Supabase response data: ', data);
        console.log('Supabase response error: ', error);

        if (error) throw error;

        setEvents(data);
        setLoading(false);
      } catch (err) {
        console.log('Error fetching data: ', err);
        setError(err.message);
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  if(loading) return <p>Loading...</p>;
  if(error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Past and Upcoming Events</h1>
      {error && <p>Error: {error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Event Location</th>
              <th>Event Date</th>
              <th>Event Description</th>
            </tr>
          </thead>
          <tbody>
            {events && events.length > 0 ? (
              events.map((event) => (
                <tr key={event.event_name}>
                  <td>{event.event_name}</td>
                  <td>{event.event_location}</td>
                  <td>{event.event_date}</td>
                  <td>{event.event_desc}</td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="4">No Events found.</td></tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Events;