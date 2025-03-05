import axios from "axios"


const token = localStorage.getItem("token");

const config = {
    headers: {
        "Authorization": "Bearer " + token
    }
};


export function create_salon(
    salon_name, address, phone_number, email, password, description, image, website,
    creation_date, last_update_date, longitude, latitude, percent, percent_cancel, heure_debut, heure_fin
) {
    const formdata = new FormData();

    formdata.append("salon_name", salon_name);
    formdata.append("address", address);
    formdata.append("phone_number", phone_number);
    formdata.append("email", email);
    formdata.append("password", password);
    formdata.append("description", description);

    if (image && image instanceof File) {
        formdata.append("image", image, image.name); // Assurez-vous que 'image' est un objet File
    }

    formdata.append("website", website);
    formdata.append("creation_date", creation_date);
    formdata.append("last_update_date", last_update_date);
    formdata.append("longitude", longitude);
    formdata.append("latitude", latitude);
    formdata.append("percent", percent);
    formdata.append("percent_cancel", percent_cancel);
    formdata.append('heure_debut', heure_debut);
    formdata.append('heure_fin', heure_fin);

    const configuration = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    };

    return axios.post("https://hair-api-main-production.up.railway.app/api/salon", formdata, config, configuration);
}


export function createDocument(ifu, type_photo, photo1, photo2) {
    const formData = new FormData();
    formData.append("ifu", ifu);
    formData.append("type_photo", type_photo);
    formData.append("photo1", photo1);
  
    if (type_photo !== "Passeport") {
      formData.append("photo2", photo2);
    }
  
    return axios.post("https://hair-api-main-production.up.railway.app/api/ActiveSalonInfo",  formData, config)
  }



export function create_employe_salon(name, skills, description, image, hiring_date, departure_date, work_hours, salary, status, phone, email){
    const formdata = new FormData()
    formdata.append("name", name)
    formdata.append("skills", skills)
    formdata.append("description", description)
    if (image) {
        formdata.append("image", image, image.name)
    }
    formdata.append("hiring_date", hiring_date)
    formdata.append("departure_date", departure_date)
    formdata.append("work_hours", work_hours)
    formdata.append("salary", salary)
    formdata.append("status", status)
    formdata.append("phone", phone)
    formdata.append("email", email)

   
    return axios.post("https://hair-api-main-production.up.railway.app/api/employe",  formdata, config)
}


export function create_type_coif_salon(name, description, nb_employe, category,price, image, coiffure_id ){
    const formdata = new FormData()
    formdata.append("name", name)
    formdata.append("description", description)
    formdata.append("nb_employe", nb_employe)
    formdata.append("category", category)
    formdata.append("price", price)
    formdata.append("image", image)
        formdata.append("coiffure_id", coiffure_id)
    return axios.post("https://hair-api-main-production.up.railway.app/api/hairstyle",  formdata, config)
}
export function acce_coif(hairstyle_type_id, salon_id,  accessory_id, nb_accessory){
    return axios.post("https://hair-api-main-production.up.railway.app/api/accessoirehairstyle", {
        hairstyle_type_id: hairstyle_type_id,
        salon_id: salon_id,
        accessory_id: accessory_id,
        nb_accessory: nb_accessory,
        
    }, config)
} 

export function emp_coif(hairstyle_type_id,  employe_id, duration){
    return axios.post("https://hair-api-main-production.up.railway.app/api/employehairstyles", {
        hairstyle_type_id: hairstyle_type_id,
        employe_id: employe_id,
        duration: duration,
        
    }, config)
} 

export const getAvailableEmployees = () => {
    return fetch("https://hair-api-main-production.up.railway.app/api/rdv", config).then(response => response.json());
   };
   
   export function create_rdv(date_and_time, notes, hairstyle_type_id, price, usesOwnAccessories, accessories, employes, selectedHour) {
    // Concaténer la date et l'heure ici
    const datetime = `${date_and_time.split('T')[0]} ${selectedHour}`;
  
    return axios.post("https://hair-api-main-production.up.railway.app/api/rdv", {
      date_and_time: datetime,
      notes: notes,
      hairstyle_type_id: hairstyle_type_id,
      price: price,
      usesOwnAccessories: usesOwnAccessories,
      accessories: accessories,
      employes: employes
    }, config);
  }
  
  
export function storeEvaluation (note , comment , id_service_history,user_id)  {
    return axios.post("https://hair-api-main-production.up.railway.app/api/review", { note,comment,id_service_history,user_id },config);
  };


  export function accessoire( name, description,  price) {
    return axios.post("https://hair-api-main-production.up.railway.app/api/accessory", {
        name: name,
        description: description,
        price: price,
        
    }, config);
}

export const getCoiffures = () => {
    return axios.get('https://hair-api-main-production.up.railway.app/api/hairstyle', config);
};

export const getAccessoires = () => {
    return axios.get('https://hair-api-main-production.up.railway.app/api/accessory', config);
};

export const assignAccessoireToCoiffure = (data) => {
    return axios.post('https://hair-api-main-production.up.railway.app/api/assign-accessoire', data);
};