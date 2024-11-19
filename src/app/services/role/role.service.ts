import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Role } from '../../models/role/role.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private apiUrl = `${environment.apiUrl}/${environment.prefix}`;
  constructor(
    private httpClient: HttpClient,
  ) { }
  token:any= localStorage.getItem('token');




 getRoles(){
  console.log(this.token);
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': "Bearer "+ localStorage.getItem('token')
    });

        const httpOptions = {
          headers: headers_object
        };
    return this.httpClient.get<any>(`${this.apiUrl}/roles`,httpOptions);
  }




  insertRole(role: Role): Observable<Role> {
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': "Bearer "+ localStorage.getItem('token')
    });
    const httpOptions = {
      headers: headers_object
    };
    return this.httpClient.post<Role>(`${this.apiUrl}/addRole`, role, httpOptions);
  }

  

  updateRole(data: Role): Observable<Role> {
    const headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + localStorage.getItem('token')
    });

    const httpOptions = {
      headers: headers_object
    };
    return this.httpClient.put<Role>(`${this.apiUrl}/updateRole/${data.id}`, data, httpOptions);
  }



  deleteRole(id: any): Observable<any> {
    const headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + localStorage.getItem('token')
    });

    const httpOptions = {
      headers: headers_object
    };
    return this.httpClient.delete<any>(`${this.apiUrl}/deleteRole/${id}`, httpOptions);
  }

  getRoleById(id: any): Observable<Role> {
    const headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + localStorage.getItem('token')
    });

    const httpOptions = {
      headers: headers_object
    };
    return this.httpClient.get<Role>(`${this.apiUrl}/role/${id}`, httpOptions);
  }

}
  
