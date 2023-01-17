import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
}) 
export class AuthenticationService {   
  private role:string = "";
  private id:string = "";
  private expiry:string="";
  private signature:string="";

  baseHref:string = "http://localhost:8080"; 
 
  constructor(private http:HttpClient) {}
  
  getRole() {
    return this.role;
  }
  
  isCustomerRole():boolean {
    return this.role == "customer";
  } 

  isAdminRole():boolean {
    return this.role == "admin";
  }

  getId():string {
    return this.id;
  }

  clearCredentials():void {
    this.role = "";
    this.id = "";
    this.expiry = "";
    this.signature = ""; 
  }

  isCredentialsEmpty():boolean { 
    return (this.signature=="");
  }

  setCredentials(data:any) {
    this.role = data.header_role;
    this.id = data.header_id; 
    this.expiry = data.header_expiry;
    this.signature = data.header_signature;
  }  

  generateAuthParamsStr():string {
    var paramsStr = (new URLSearchParams(this.generateAuthHeaders())).toString();  
    return paramsStr;
  }

  generateAuthHeaders():any {
    var obj:any = {header_role: this.role, header_id:this.id, header_expiry:this.expiry, header_signature: this.signature};
    return obj;
  }
 
  login(email:string, password:string, role:string) { 
    var form_data = new FormData();
    form_data.append("email", email);
    form_data.append("password", password);
    form_data.append("role", role);

    return this.http.post(this.baseHref + "/authenticate", form_data).pipe(
      catchError((error) => {
        throw "ERROR"; 
      })
    );
  }   
}