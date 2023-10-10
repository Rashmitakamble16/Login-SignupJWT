import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable } from 'rxjs';
import { ArticleInterface } from './article.interface';

@Injectable({
  providedIn: 'root'
})
export class ArticleServiceService {
 // private baseUrl: string = 'https://localhost:44383/api/User/GetUsersByName?UserName_like=${searchValue}'

  constructor(private http: HttpClient) { }
   
  getArticles(searchValue: string): Observable<ArticleInterface[]> {
    return this.http.get<any> (
      //`https://localhost:44383/api/User`
     `https://localhost:44383/api/User/GetUsersByName?UserName_like=${searchValue}`
    )
  }
}

