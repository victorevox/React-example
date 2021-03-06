import request, { fromObjectToQueryParams } from "utils/request";

const api_route = '/api/post';

export class PostService {
    constructor() {
        console.log("Post service initted");
        
    }

    getByQuery(query) {
        query = fromObjectToQueryParams(query);
        return new Promise((resolve, reject) => {
            request(`${api_route}${query? '?' + query : ''}`, {
                method: "GET",
            }).then(response => {
                resolve(response);
            }).catch(err => reject(err))
        })
    }

    create(post) {
        return new Promise((resolve, reject) => {
            request(api_route, {
                method: "POST",
                body: JSON.stringify(post)
            }).then(response => {
                resolve(response);
            }).catch(err => reject(err))
        })
    }

    update(post) {
        return new Promise((resolve, reject) => {
            let id = post && post._id;
            if(id) {
                request(`${api_route}/${id}`, {
                    method: "PUT",
                    body: JSON.stringify(post)
                }).then( response => {
                    resolve(response);
                }).catch(err => reject(err));
            } else {
                throw new Error("Resource to update must contain _id property");
            }
        })
    }
}
