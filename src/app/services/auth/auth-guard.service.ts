import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Toaster } from '@app/services/toaster/toaster.service';
import { AuthService } from './authentication.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
  	public auth: AuthService,
  	public router: Router,
  	public toaster: Toaster
  ) {}

  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
    	this.toaster.error("Erro na permissão de acesso. Favor efetuar o login!");
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
