import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  user:any; //data type any
  base_url = 'http://127.0.0.1:8000' //API direction from cine
  header_login = new HttpHeaders().set('Content-Type', 'application/json')
  options_login = {headers:this.header_login}
  header_token:any;
  options_token:any;

  constructor(private http:HttpClient, private router:Router) { } //http is the alias to call it

  login(data:any){
    let url = `${this.base_url+'/token'}`
    let credentials = JSON.stringify(data)
    return this.http.post(url, credentials, this.options_login).pipe(catchError(this.handleError<any>()))
  }

  get(end_point:string):Observable<any []>{
    let url=`${this.base_url+'/'+end_point+'/'}`
    return this.http.get(url,this.options_token).pipe(catchError(this.handleError<any>()))
  }

  post(end_point:string, data:any){
    let url = `${this.base_url+'/'+end_point+'/'}`
    let info = JSON.stringify(data)
    return this.http.post(url, info, this.options_token).pipe(catchError(this.handleError<any>()))
  }

  update(end_point:string, data:any, id:any){
    let url = `${this.base_url+'/'+end_point+'/'+id+'/'}`
    let info = JSON.stringify(data)
    return this.http.patch(url, info, this.options_token).pipe(catchError(this.handleError<any>()))
  }

  add_token(token:string){
    this.header_token=new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization','Token '+token)
    this.options_token ={headers:this.header_token}
  }

  logout(){
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
