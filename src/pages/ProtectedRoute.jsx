import axios from 'axios';
import { useAuth } from '../utils/AuthContext';
import { useState } from 'react';

const ProtectedRoute = () => {
    const { jwt } = useAuth();
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
      <button onClick={fetchData}>Fetch Protected Data</button>
      {data && (
        <div>
          <h2>Data for {data.role}:</h2>
          {/* Display data based on user role */}
          {data.role === 'admin' && <p>Admin-specific information</p>}
          {data.role === 'staff' && <p>Staff-specific information</p>}
          {data.role === 'user' && <p>User-specific information</p>}
        </div>
      )}
    </div>
  );
};
    
export default ProtectedRoute;
    