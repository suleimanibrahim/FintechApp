import axios from 'axios'

const rootUrl ="http://localhost/3000";
 
const apiUrl = rootUrl + '/api/v1/forgot-Password'



export const passwordResetApi = (email:any) =>{

    return new Promise(async(resolve, reject) => {
        try{
            const {data} = await axios.post(apiUrl, {email});
            
            console.log(data)

            resolve(data);
        }catch(error:any){
            reject({status: "error", message: error.message});
        }
    });
};

export default passwordResetApi;


