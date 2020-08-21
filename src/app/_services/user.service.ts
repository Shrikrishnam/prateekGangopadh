import { Injectable } from "@angular/core";
import { Headers, Http, RequestOptions, Response } from "@angular/http";
import { map } from "rxjs/operators";

const httpOptions = {
    headers: new Headers({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    }),
};

@Injectable({ providedIn: "root" })
export class UserService {
    public static BaseUrl = "http://localhost:6565/";

    constructor(private http: Http) {}
    postfitnessdata(data) {
        return this.http
            .post(UserService.BaseUrl + "allfriends", data, httpOptions)
            .pipe(
                map((response: Response) => {
                    console.log(response);
                    return response;
                })
            );
    }
    getfitnessdata() {
        return this.http
            .get(UserService.BaseUrl + "allfriends", httpOptions)
            .pipe(map((response: Response) => response.json()));
    }
    deleteAppointment(id) {
        return this.http.delete(
            UserService.BaseUrl + "allfriends/" + id,
            httpOptions
        );
    }
    getOneAppointment(id: number) {
        return this.http
            .get(UserService.BaseUrl + "allfriends/" + id, httpOptions)
            .pipe(map((response: Response) => response.json()));
    }
    editAppointment(app) {
        return this.http.patch(
            UserService.BaseUrl + "allfriends/" + app.id,
            app
        );
    }

    postContact(data) {
        return this.http
            .post(UserService.BaseUrl + "contactinfo", data, httpOptions)
            .pipe(
                map((response: Response) => {
                    return response;
                })
            );
    }
    getAllContacts() {
        return this.http
            .get(UserService.BaseUrl + "contactinfo", httpOptions)
            .pipe(map((response: Response) => response.json()));
    }
    deleteContact(id) {
        return this.http.delete(
            UserService.BaseUrl + "contactinfo/" + id,
            httpOptions
        );
    }
}
