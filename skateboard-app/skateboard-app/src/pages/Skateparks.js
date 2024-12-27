import React, {useState, useEffect} from 'react';
import { supabase } from '../supabaseClient';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import '../styles/Spinner.css';
import '../styles/Table.css';

const Skateparks = () => {
  const [skateparks, setSkateparks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSkateparks = async () => {
      console.log('Fetching skateparks with sponsors...');
      try {
        const { data, error } = await supabase.rpc('get_skateparks_sorted_by_rating');
        console.log('Supabase response data: ', data);
        console.log('Supabase response error: ', error);

        if (error) throw error;

        setSkateparks(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
        setLoading(false); 
      }
    }
    
    fetchSkateparks();
  }, []);

  if (loading) return (
    <div className="spinner-container">
      <div className="spinner"></div>
    </div>
  );
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Skateparks</h1>
      {error && <p>Error: {error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Features</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {skateparks && skateparks.length > 0 ? (
              skateparks.map((skatepark) => (
                <tr key={skatepark.skatepark_name}>
                  <td>{skatepark.skatepark_name}</td>
                  <td>{skatepark.skatepark_location}</td>
                  <td>{skatepark.features}</td>
                  <td>
                    {Array.from({ length: skatepark.rating }).map((_, index) => (
                      <FontAwesomeIcon key={index} icon={faStar} style={{ color: '#FFD700', marginRight: '4px' }} />
                    ))}
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="5">No skateparks found.</td></tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Skateparks;