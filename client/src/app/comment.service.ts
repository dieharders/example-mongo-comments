import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from './commentSchema';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  checkUrl () {
    let url = window.location.hostname;
    //console.log('URL: ' + url);
    if (url.search('localhost') > -1) {
      return 'http://localhost:8080/'; // For testing locally
    } else {
      return 'https://example-restapi-server.herokuapp.com/'; // Prod server
    }
  }
  private commentsUrl = this.checkUrl() + 'api/comments';  // URL to web api
  constructor(
    private http: HttpClient
  ) { }

  getComments (): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.commentsUrl)
  }

  getComment (id: string): Observable<Comment> {
    const url = `${this.commentsUrl}/${id}`;
    return this.http.get<Comment>(url);
  }

  addComment (comment: Comment): Observable<any> {
    return this.http.post<Comment>(this.commentsUrl, comment, httpOptions);
  }

  deleteComment (comment: Comment | string): Observable<Comment> {
    const id = typeof comment === 'string' ? comment : comment._id;
    const url = `${this.commentsUrl}/${id}`;
    
    return this.http.delete<Comment>(url, httpOptions);
  }

  updateComment (comment: Comment): Observable<any> {
    return this.http.put(this.commentsUrl, comment, httpOptions);
  }
}