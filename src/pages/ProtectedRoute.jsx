import axios from 'axios';
import { useAuth } from '../utils/AuthContext';

const ProtectedRoute = () => {
    const { jwt } = useAuth();

    const fetchData = async () => {
        try {
          const response = await axios.get(process.env.REACT_APP_BACKEND_URL + "opals", {
            headers: {
              jwt: jwt,
            },
          });
    
          console.log(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

    return (
        <div>
            <button onClick={fetchData}>Fetch Protected Data</button>
        </div>
    );
};
    
export default ProtectedRoute;
    