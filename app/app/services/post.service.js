import request from "utils/request";

const api_route = '/api/post';

export class PostService {
    constructor() {
        console.log("Post service initted");
        
    }

    getByQuery(query) {
        return new Promise((resolve, reject) => {
            request(api_route, {
                method: "GET"
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
}
