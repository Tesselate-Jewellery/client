import axios from 'axios';
import { useAuth } from '../utils/AuthContext';
import { useState } from 'react';

const ProtectedRoute = () => {
    const { jwt, role } = useAuth();
    const [data, setData] = useState(null);

    const fetchData = async () => {
        try {
          const response = await axios.get(process.env.REACT_APP_BACKEND_URL + "opals", {
            headers: {
              jwt: jwt,
            },
          });
          
          console.log(response.data);
          setData(response.data);

        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

    return (
        <div>
            {["admin", "staff"].includes(role) && (
            <button onClick={fetchData}>Fetch Protected Data</button>
            )}
            {data && (
            <div>
                <h2>Data for {role}:</h2>
                {/* Display data based on user role */}
                {role === 'admin' && <p>Admin-specific information</p>}
                {role === 'staff' && <p>Staff-specific information</p>}
                {role === 'user' && <p>User-specific information</p>}
            </div>
            )}
        </div>
    );
};
    
export default ProtectedRoute;