import axios, { AxiosInstance } from 'axios'
import { Data } from '../types/axiosType'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({
    path: path.resolve(process.cwd(), process.env.NODE_ENV === "development" ? '.env.development' : '.env'),
});

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
    const key = process.env.JSONBIN_SECRET_KEY
    const binID = process.env.JSONBIN_BIN_ID

    if (!key || !binID) {
        throw new Error('Missing JSONBIN_SECRET_KEY or JSONBIN_BIN_ID')
    }

    instance = axios.create({
        baseURL: 'https://api.jsonbin.io/v3/b/' + binID,
        headers: { 
            'X-Master-Key': key 
        }
    });
}
