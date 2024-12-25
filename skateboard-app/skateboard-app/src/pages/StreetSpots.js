import React, {useState, useEffect} from 'react';
import { supabase } from '../supabaseClient';
import '../styles/Spinner.css';
import '../styles/Table.css';



const StreetSpots = () => {
  const [streetspots, setStreetSpots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStreetSpots = async () => {
      console.log('Fetching street spots...');
      try {
        const { data, error } = await supabase.from('famous_street_spots').select();
        console.log('Supabase response data: ', data);
        console.log('Supabase response error: ', error);

        if (error) throw error;

        setStreetSpots(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data: ', err);
        setError(err.message);
        setLoading(false);
      }
    }

    fetchStreetSpots();
  }, []);

  if (loading) return (
    <div className="spinner-container">
      <div className="spinner"></div>
    </div>
  );
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Famous Street Spots</h1>
      {error && <p>Error: {error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Trick Name</th>
              <th>Trick Done By</th>
              <th>Location</th>
              <th>Date Done</th>
            </tr>
          </thead>
          <tbody>
            {streetspots && streetspots.length > 0 ? (
              streetspots.map((spot) => (
                <tr
                  key={'${spot.trick_name}-${spot.username}-${spot.trick_location}'}
                >
                  <td>{spot.trick_name}</td>
                  <td>{spot.username}</td>
                  <td>{spot.trick_location}</td>
                  <td>{spot.date_done}</td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="4">No street spots found.</td></tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  )
};

export default StreetSpots;