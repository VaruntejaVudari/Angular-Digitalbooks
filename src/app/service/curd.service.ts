import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, pipe, throwError } from 'rxjs';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class CurdService {
  [x: string]: any;

  //nodejs API
  REST_API:String ="http://localhost/8000/api";
  //set Http Header.
  httpHeaders =new HttpHeaders().set('Content-Type','Application/json')

  constructor(private httpClient:HttpClient) { }
  //add recorders
  AddBook(data:Book):Observable<any>{
    let API_URL ='${this.REST_API}/add-book';
    return this.httpClient.post(API_URL,data).pipe(catchError(this['handlerError']));
  }
  //get All books details
  getBooks(){
    return this.httpClient.get('${this.REST_API}');
  }
  //get Single book
  getBook(id:any) :Observable<any>{
    let API_URL ='${this.REST_API}/read-book/${id}';
    return this.httpClient.get(API_URL,{headers:this.httpHeaders}).pipe(map((res:any)=>{
      return res || {}
    }),
    catchError(this.handleError)
    )
  }
  //update Book data
  updateBook(id:any,data:any):Observable<any>{
    let API_URL ='${this.REST-API}/update-book/${id}';
    return this.httpClient.put(API_URL,data,{headers:this.httpHeaders}).pipe(
      catchError(this.handleError)
    )
  }
  //Delete Book data
  deleteBook(id:any,data:any):Observable<any>{
    let API_URL ='${this.REST-API}/delete-book/${id}';
    return this.httpClient.delete(API_URL,{headers:this.httpHeaders}).pipe(
      catchError(this.handleError)
    )
  }

  //Error
  handleError(error:HttpErrorResponse){
    let errorMessage ='';
    if(error.error instanceof ErrorEvent){
      //Handle client  side error
      errorMessage = error.error.message;

    }else{
      //handle server side error
      errorMessage ='Error Code:${error.status}\nMessage:${error.message}';

    }
    console.log(errorMessage);
    return throwError(errorMessage);
    
  }
}