import axios from "axios";

const token = localStorage.getItem("token");

const config = {
    headers: {
        "Authorization": "Bearer " + token
    }
};

const BASE_URL = "https://hair-api-main-production.up.railway.app/api/"; // URL de l'API déployée

export function login(email, password) {
    return axios.post(`${BASE_URL}/login`, {
        "email": email,
        "password": password
    });
}

export function loginWithToken(token) {
    return axios.post(`${BASE_URL}/login-with-token/${token}`, null, {});
}

export function logout() {
    return axios.post(`${BASE_URL}/logout`, {}, config);
}

export function register(name, email, password, password_confirmation, user_type) {
    return axios.post(`${BASE_URL}/register`, {
        "name": name,
        "email": email,
        "password": password,
        "password_confirmation": password_confirmation,
        "user_type": user_type
    });
}

export function verifyEmail(userId, verificationHash) {
    return axios.get(`${BASE_URL}/verify/${userId}/${verificationHash}`, config);
}

export function client(address, phone_number, birth_date, gender, notes) {
    return axios.post(`${BASE_URL}/client`, {
        address: address,
        phone_number: phone_number,
        birth_date: birth_date,
        gender: gender,
        notes: notes
    }, config);
}

export function getClients() {
    return axios.get(`${BASE_URL}/salon`, config);
}

export function getUser() {
    return axios.get(`${BASE_URL}/User`, config);
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

export function forgotPassword(email) {
    return axios.post(`${BASE_URL}/password/email`, { email }, config);
}

export function resetPassword(email, token, password, password_confirmation) {
    return axios.post(`${BASE_URL}/password/reset`, { email, token, password, password_confirmation }, config);
}

export function register_client(name, email, password, password_confirmation, domain) {
    return axios.post(`${BASE_URL}/register_client`, { email, name, password, password_confirmation, domain }, config);
}

export function updateClient(clientId, clientData) {
    return axios.put(`${BASE_URL}/client/${clientId}`, clientData, config);
}

export function getClientId() {
    return axios.get(`${BASE_URL}/getClientId`, config);
}

export function getSalonId() {
    return axios.get(`${BASE_URL}/getSalonId`, config);
}

export function updateSalon(salonId, salonData) {
    return axios.put(`${BASE_URL}/salon/${salonId}`, salonData, config);
}

export function getEmployeInfo(id) {
    return axios.get(`${BASE_URL}/getEmployeInfo/${id}`, config);
}

export function UpdateEmploye(EmployeId, EmployeData) {
    return axios.put(`${BASE_URL}/employe/${EmployeId}`, EmployeData, config);
}

export function getAccessoireInfo(id) {
    return axios.get(`${BASE_URL}/accessory/${id}`, config);
}

export function UpdateAccessoire(AccessoireId, AccessoireData) {
    return axios.put(`${BASE_URL}/accessory/${AccessoireId}`, AccessoireData, config);
}

export function getCoiffureInfo(id) {
    return axios.get(`${BASE_URL}/hairstyle/${id}`, config);
}

export function UpdateCoiffure(CoiffureId, CoiffureData) {
    return axios.put(`${BASE_URL}/hairstyle/${CoiffureId}`, CoiffureData, config);
}
