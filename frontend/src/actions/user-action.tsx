
import axios from 'axios'

//For Dev Apis

// const baseUrl: any = 'https://xeccpcy808.execute-api.us-east-1.amazonaws.com/dev'

//For Prod Apis
const baseUrl: any = 'https://xeccpcy808.execute-api.us-east-1.amazonaws.com/prod'

export function addUser(payload: any) {
    return new Promise((resolve, reject) =>
        axios.post(`${baseUrl}/create-user`, payload, {
        }).then((response: any) => {
            const data = response.data
            if (data.status && data.status == 200) {
                return resolve(data);
            }
            return resolve(data);
        })
            .catch((err: any) => {
                reject(err);
            })
    );
}


export function getUserList(page: number, limit: number) {
    return new Promise((resolve, reject) =>
        axios.get(`${baseUrl}/list?page=${page}&limit=${limit}`, {
        }).then((response: any) => {
            const data = response.data
            console.log('data', response)
            if (data.status && data.status == 200) {
                return resolve(data);
            }
            return resolve(data);
        })
            .catch(err => {
                reject(err);
            })
    );
}

export function getUserDetails(id: string) {
    return new Promise((resolve, reject) =>
        axios.put(`${baseUrl}/user-details/${id}`, {
        }).then((response: any) => {
            const data = response.data
            console.log('data', response)
            if (data.status && data.status == 200) {
                return resolve(data);
            }
            return resolve(data);
        })
            .catch(err => {
                reject(err);
            })
    );
}

export function getUserUpdate(id: string) {
    return new Promise((resolve, reject) =>
        axios.put(`${baseUrl}/update/${id}`, {
        }).then((response: any) => {
            const data = response.data
            console.log('data', response)
            if (data.status && data.status == 200) {
                return resolve(data);
            }
            return resolve(data);
        })
            .catch(err => {
                reject(err);
            })
    );
}