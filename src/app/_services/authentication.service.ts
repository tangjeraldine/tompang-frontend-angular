import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'; 
import { catchError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private role: string = '';
  private id: string = '';
  private expiry: string = '';
  private signature: string = '';

  baseHref: string = 'http://localhost:8080';

  constructor(
    private http: HttpClient,
    private _cookieService: CookieService
  ) {}

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

  clearCredentials(): void {
    this.role = '';
    this.id = '';
    this.expiry = '';
    this.signature = '';
    this._cookieService.set('header_role', '');
    this._cookieService.set('header_id', '');
    this._cookieService.set('header_expiry', '');
    this._cookieService.set('header_signature', '');
  }

  isCredentialsEmpty(): boolean {
    this.role = this._cookieService.get('header_role');
    this.id = this._cookieService.get('header_id');
    this.expiry = this._cookieService.get('header_expiry');
    this.signature = this._cookieService.get('header_signature');

    return this.signature == '';
  }

  setCredentials(data:any) {
    this.role = data.header_role;
    this.id = data.header_id; 
    this.expiry = data.header_expiry;
    this.signature = data.header_signature;

    this._cookieService.set('header_role', this.role);
    this._cookieService.set('header_id', this.id);
    this._cookieService.set('header_expiry', this.expiry);
    this._cookieService.set('header_signature', this.signature);
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
  
  register(formObj:any){

    return this.http.post(this.baseHref + "/authenticate", formObj).pipe(
      catchError((error) => {
        throw "ERROR"; 
      })
    );
  }
}