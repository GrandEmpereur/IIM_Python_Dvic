import axios, { AxiosInstance } from 'axios'
import { Data } from '../types/axiosType'


/* Creating an instance of the axios object and assigning it to the variable 'instance'. */
let instance = null as AxiosInstance | null
updateAxiosInstance()

/**
 * It returns a promise that resolves to the data property of the response object returned by the get
 * method of the instance object
 * @returns The response.data.record is being returned.
 */
export async function getBin() {
    const response = await instance.get('/latest');
    return response.data.record;
}

/**
 * CreateBin is an async function that takes a Data object as a parameter, makes a PUT request to the /
 * endpoint, and returns the response data.
 * @param {Data} data - Data = {
 * @returns The response data.
 */
export async function CreateBin(data: Data) {
    const response = await instance.put('/', data);
    return response.data;
}


/**
 * This function creates an axios instance with a baseURL and a header, and then assigns that instance
 * to the variable 'instance'.
 */
export async function updateAxiosInstance() {
    const key = "\$2b\$10\$KuOAMdG1jiZBJe92jjJe5.vrohu.y3Qh5MguyGbdE6CwGfbGYxgQ2"
    const binID = "63ff4fe7ebd26539d0876d5a"

    instance = axios.create({
        baseURL: 'https://api.jsonbin.io/v3/b/' + binID,
        headers: { 
            'X-Master-Key': key 
        }
    });
}
