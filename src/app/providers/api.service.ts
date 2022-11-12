import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router';
import {catchError, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  user:any; //data type any
  base_url = 'http://127.0.0.1:8000' //API direction from cine
  header_login = new HttpHeaders().set('Content-Type', 'application/json')
  options_login = {headers:this.header_login}

  constructor(private http:HttpClient,private router:Router) { } //http is the alias to call it

  login(data:any){
    let url = `${this.base_url+'/token'}`
    let credentials = JSON.stringify(data)
    return this.http.post(url, credentials, this.options_login).pipe(catchError(this.handleError<any>()))
  }

  logOut(){
    this.user = ''
    this.router.navigate(['/login'])
  }

  private handleError<T> (result?: T) {
    return (error: any): Observable<T> => {
      console.log(error.error)
      return of(result as T);
    };
  }
}
