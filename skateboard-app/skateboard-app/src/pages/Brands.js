import React, {useState, useEffect} from 'react';
import { supabase } from '../supabaseClient';
import '../styles/Spinner.css';
import '../styles/Table.css';

const Brands = () => {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBrands = async() => {
            console.log('Fetching brands...');
            try {
                const {data, error } = await supabase.rpc('get_brands');
                console.log('Supabase response data: ', data);
                console.log('Supabase response error: ', error);

                if (error) throw error;

                setBrands(data);
                setLoading(false);
            } catch (err) {
                console.log('Error fetching data: ', err);
                setError(err.message);
                setLoading(false);
            }
        }

        fetchBrands();
    }, []);

    if(loading) return (
        <div className="spinner-container">
            <div className="spinner"></div>
        </div>
    );
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Brands</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Product Type</th>
                    </tr>
                </thead>
                <tbody>
                    {brands && brands.length > 0 ? (
                        brands.map((brand, index) => (
                            <tr key={index}>
                                <td>{brand.brand_name}</td>
                                <td>{brand.brand_desc}</td>
                                <td>{brand.product_type}</td>
                            </tr>
                        ))
                    ) : (
                        <tr><td colSpan="3">No Brands Found.</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Brands;
