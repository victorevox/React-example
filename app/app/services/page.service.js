import request, { fromObjectToQueryParams } from "utils/request";

const api_route = '/api/page';

export class PageService {
    constructor() {
        console.log("Page service initted");
        
    }

    getByQuery(query) {
        query = fromObjectToQueryParams(query);
        return new Promise((resolve, reject) => {
            request(`${api_route}${ query? '?' + query : ''}`, {
                method: "GET",
            }).then(response => {
                resolve(response);
            }).catch(err => reject(err))
        })
    }

    create(page) {
        return new Promise((resolve, reject) => {
            request(api_route, {
                method: "POST",
                body: JSON.stringify(page)
            }).then(response => {
                resolve(response);
            }).catch(err => reject(err))
        })
    }

    update(page) {
        return new Promise((resolve, reject) => {
            let id = page && page._id;
            if(id) {
                request(`${api_route}/${id}`, {
                    method: "PUT",
                    body: JSON.stringify(page)
                }).then( response => {
                    resolve(response);
                }).catch(err => reject(err));
            } else {
                throw new Error("Resource to update must contain _id property");
            }
        })
    }
}
