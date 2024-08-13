import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedUsers, User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://reqres.in/api/users';

  constructor(private http: HttpClient) {}

  /**
   * Retrieves a paginated list of users.
   * 
   * @param page - The page number to retrieve.
   * @returns An observable that emits a `PaginatedUsers` object.
   */
  getUsers(page: number): Observable<PaginatedUsers> {
    return this.http.get<PaginatedUsers>(`${this.apiUrl}?page=${page}`);
  }

  /**
   * Retrieves the details of a user.
   * 
   * @param id - The ID of the user.
   * @returns An observable that emits an object containing the user data.
   */
  getUserDetails(id: number): Observable<{ data: User }> {
    return this.http.get<{ data: User }>(`${this.apiUrl}/${id}`);
  }
}

