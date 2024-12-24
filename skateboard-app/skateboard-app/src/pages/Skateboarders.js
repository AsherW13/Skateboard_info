import React, {useState, useEffect} from 'react';
import { supabase } from '../supabaseClient';

const Skateboarders = () => {
    const [skateboarders, setSkateboarders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchSkateboarders = async () => {
        console.log('Fetching skateboarders with sponsors...');
        try {
          const { data, error } = await supabase.rpc('get_skateboarders_with_sponsors');
          console.log('Supabase RPC response data:', data);
          console.log('Supabase RPC response error:', error);
  
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
        <h1>Skateboarders with Sponsors</h1>
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
                <th>Sponsors</th>
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
                    <td>
                      {skateboarder.sponsors && skateboarder.sponsors.length > 0
                        ? skateboarder.sponsors.join(', ')
                        : 'None'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No skateboarders found.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    );
};

export default Skateboarders;