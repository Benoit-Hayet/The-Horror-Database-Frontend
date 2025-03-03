import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private authUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) {}

  register(
    firstName: string,
    lastName: string,
    birthdate: string,
    username: string,
    email: string,
    role: string,
    password: string,
  ) {
    const body = {
      firstName,
      lastName,
      birthdate,
      username,
      email,
      role,
      password,
    };
    return this.http.post(this.authUrl + '/register', body);
  }

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post<any>(this.authUrl + '/login', body, {
      responseType: 'text' as 'json',
    });
  }

  saveToken(token: string): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('token', token);
    }
  }

  getToken(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('token');
    }
    return null; // Retourner null si localStorage n'est pas disponible
  }

  cleartoken(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('token');
    }
  }

  isLoggedIn(): boolean {
    const token = this.getToken();

    if (!token) {
      return false;
    }

    if (token.split('.').length !== 3) {
      this.cleartoken();
      return false;
    }

    try {
      const decodedToken: any = jwtDecode(token);
      const expiryDate = new Date(decodedToken.exp * 1000);
      if (expiryDate < new Date()) {
        this.cleartoken();
        return false;
      }
      return true;
    } catch (error) {
      this.cleartoken();
      return false;
    }
  }

  getDecodedToken(): any {
    const token = this.getToken();
    if (!token) return null;
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Erreur lors du décodage du token:', error);
      return null;
    }
  }

  getUserRole(): string | null {
    const decodedToken = this.getDecodedToken();
    if (
      decodedToken &&
      decodedToken.roles &&
      Array.isArray(decodedToken.roles)
    ) {
      // Extraction de la première autorité dans le tableau
      const role = decodedToken.roles[0]?.authority;
      return role || null; // Retourne la valeur ou null si non trouvée
    }
    return null;
  }

  getUserId(): string | null {
    const decodedToken = this.getDecodedToken();
    if (decodedToken && decodedToken.userId) {
      const id = decodedToken.userId;
      return id || null;
    }
    return null;
  }
}
