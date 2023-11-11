export class UserService {

    static getUser() {
        return localStorage.getItem("user") ?? sessionStorage.getItem("user");
    }

}