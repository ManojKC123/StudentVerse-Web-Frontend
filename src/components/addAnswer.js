// import { ADD_ANSWER} from '../components/answers.types';
// import axios from 'axios';

// export const addAnswer = (postId, formData) => async (dispatch) => {
//     const config = {
//         headers: {
//             'Content-Type': 'application/json',
//         },

//     };

//     try {
//         const res = await axios.post(
//             `${apiURL}/addAnswer${postId}`,
//             formData,
//             config
//         );
        
//         dispatch({ 
//             type: ADD_ANSWER, 
//             payload: res.data.data, 
//         });
        
//     } catch{
        
//     }
// };