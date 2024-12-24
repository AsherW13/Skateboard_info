import React, {useState, useEffect} from 'react';
import { supabase } from '../supabaseClient';

const Skateparks = () => {
  const [skateparks, setSkateparks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSkateparks = async () => {
      console.log('Fetching skateparks with sponsors...');
      try {
        const { data, error } = await supabase.from('skateparks').select();
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

  if (loading) return <p>Loading...</p>;
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
                  <td>{skatepark.rating}</td>
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