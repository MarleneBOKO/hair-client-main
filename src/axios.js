import axios from "axios";

const config = {
    headers:{
        "authorization": "Bearer " + localStorage.getItem("token")
    }
}

export function getProject(id){
    return  axios.get("http://localhost:8000/api/projects/" + id, config)
    .then(function (response){
        return response;
    })
    .catch(function(error){
        throw error;
    })
}

