import axios from 'axios';
import { FETCH_USER } from './types';

// promises format
// export const fetchUser = () => {
//   return function(dispatch) {
//     axios.get('/api/current_user')
//       .then(res => {
//         dispatch({
//           type: FETCH_USER,
//           payload: res
//         })
//       })
//   }
// }

// async await format
export const fetchUser = () => async (dispatch) => {
  const response = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: response.data });
}