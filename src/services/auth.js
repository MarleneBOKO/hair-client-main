import axios from "axios"


const token = localStorage.getItem("token");

const config = {
    headers: {
        "Authorization": "Bearer " + token
    }
};



export function login(email, password){
    return axios.post("http://127.0.0.1:8000/api/login", {
        "email": email,
        "password": password
    })
 
}



export function loginWithToken(token) {
    return axios.post(`http://127.0.0.1:8000/api/login-with-token/${token}`, null, {
        
    });

}

export function logout() {
    return axios.post('http://127.0.0.1:8000/api/logout', {}, config);
}

export function register(name, email, password, password_confirmation, user_type){
    return axios.post("http://127.0.0.1:8000/api/register", {
        "name":name,
        "email":email,
        "password":password,
        "password_confirmation":password_confirmation,
        "user_type": user_type
        

    })
}
export function verifyEmail(userId, verificationHash) {
    return axios.get(`http://127.0.0.1:8000/api/verify/${userId}/${verificationHash}`, config);
}


export function client( address, phone_number,  birth_date, gender, notes) {
    return axios.post("http://127.0.0.1:8000/api/client", {
        address: address,
        phone_number: phone_number,
        birth_date: birth_date,
        gender: gender,
        notes: notes
    }, config);
}

export function getClients() {
    return axios.get("http://127.0.0.1:8000/api/salon", config);
}

export function getUser() {
    return axios.get("http://127.0.0.1:8000/api/User", config);
}


async function getUserName() {
    try {
       const response = await getUser();
       return response.data.user.name; // Assurez-vous que la structure de la réponse correspond à celle-ci
    } catch (error) {
       console.error("Failed to fetch user data", error);
       return null;
    }
   }
   export function forgotPassword (email)  {
    return axios.post("http://127.0.0.1:8000/api/password/email", { email },config);
  }

  export function resetPassword (email, token, password, password_confirmation)  {
    return axios.post("http://127.0.0.1:8000/api/password/reset", { email, token, password, password_confirmation },config);
  };
  export function register_client ( name,email, password, password_confirmation ,domain)  {
    return axios.post("http://127.0.0.1:8000/api/register_client", { email, name, password, password_confirmation ,domain },config);
  };

  export function updateClient ( clientId, clientData)  {
    return axios.put(`http://127.0.0.1:8000/api/client/${clientId}`, clientData,config);
  };

  export function getClientId ()  {
    return axios.get("http://127.0.0.1:8000/api/getClientId",config);
  };

  export function getSalonId ()  {
    return axios.get("http://127.0.0.1:8000/api/getSalonId",config);
  };

  export function updateSalon ( salonId, salonData)  {
    return axios.put(`http://127.0.0.1:8000/api/salon/${salonId}`, salonData,config);
  };

  export function getEmployeInfo (id)  {
    return axios.get(`http://127.0.0.1:8000/api/getEmployeInfo/${id}`,config);
  };

  export function UpdateEmploye ( EmployeId, EmployeData)  {
    return axios.put(`http://127.0.0.1:8000/api/employe/${EmployeId}`, EmployeData,config);
  };
  export function getAccessoireInfo (id)  {
    return axios.get(`http://127.0.0.1:8000/api/accessory/${id}`,config);
  };
  export function UpdateAccessoire( AccesoireId, AccessoireData)  {
    return axios.put(`http://127.0.0.1:8000/api/accessory/${AccesoireId}`, AccessoireData,config);
  };
  export function getCoiffureInfo (id)  {
    return axios.get(`http://127.0.0.1:8000/api/hairstyle/${id}`,config);
  };
  export function UpdateCoiffure( CoiffureId, CoiffureData)  {
    return axios.put(`http://127.0.0.1:8000/api/hairstyle/${CoiffureId}`, CoiffureData,config);
  };

 
 

  