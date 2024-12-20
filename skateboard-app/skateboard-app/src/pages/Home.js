import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const Home = () => {
  const [skateboarders, setSkateboarders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSkateboarders = async () => {
      console.log("Fetching skateboarders...");
      try {
        const { data, error } = await supabase.from('skateboarders').select();
        console.log('Supabase response data:', data);
        console.log('Supabase response error:', error);
  
        if (error) throw error;
  
        setSkateboarders(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
        setLoading(false);
      }
    };
  
    fetchSkateboarders();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Skateboarders</h1>
      {error && <p>Error: {error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Experience Level</th>
              <th>Stance</th>
            </tr>
          </thead>
          <tbody>
            {skateboarders && skateboarders.length > 0 ? (
              skateboarders.map((skateboarder) => (
                <tr key={skateboarder.username}>
                  <td>{skateboarder.username}</td>
                  <td>{skateboarder.first_name}</td>
                  <td>{skateboarder.last_name}</td>
                  <td>{skateboarder.exp_level}</td>
                  <td>{skateboarder.stance}</td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="5">No skateboarders found.</td></tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
  
};

export default Home;