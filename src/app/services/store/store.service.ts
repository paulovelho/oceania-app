import { Injectable, Output, EventEmitter } from "@angular/core";

@Injectable()
export class Store {

  @Output() newLogin = new EventEmitter<any>();

  constructor(
  ) {
    this.init();
  }

  private init(): void {
    this.loadUserFromStorage();
  }

  public setClient(client: string): void {
    localStorage.setItem("client", client);
  }
  public getClient(): string | null {
    return localStorage.getItem("client") || null;
  }

  public setToken(token: string): void {
    localStorage.setItem("token", token);
  }
  public getToken(): string | null {
    return localStorage.getItem("token") || null;
  }

  /* USER STORE */
  private user: any = null;
  private loadUserFromStorage(): void {
    let localUser = localStorage.getItem("user");
    if(!localUser || localUser == "undefined") return;
    this.user = JSON.parse(localUser);
  }
  private saveUserInStorage(user: any): void {
    localStorage.setItem("user", JSON.stringify(user));
    this.newLogin.emit(user);
  }
  public setLoggedUser(user: any): void {
    this.user = user;
    this.saveUserInStorage(user);
  }
  public getLoggedUser(): any {
    return this.user;
  }
  public isLogged(): boolean {
    let user = this.getLoggedUser();
    let token = this.getToken();
    if(!user || !token) return false;
    return (user.email != null);
  }

  public clean(): void {
    this.user = null;
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }


}
