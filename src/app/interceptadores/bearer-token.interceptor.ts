import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { from, lastValueFrom, Observable } from 'rxjs';
import { UtilService } from '../service/util.service';

// needs to add this function because getting the token is async
const addBearerToken = async (
  req: HttpRequest<any>,
  next: HttpHandlerFn,
): Promise<HttpEvent<any>> => {
  const angularFireAuth = inject(AngularFireAuth);
  const firebaseUser = await angularFireAuth.currentUser;
  const token = await firebaseUser?.getIdToken();
  console.log('entrouuuuuuuuu no intercepiton', token);
  if (token) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
  }
  return lastValueFrom(next(req));
};

export const bearerTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const utilService = inject(UtilService);
  // only add the bearer token to requests to the backend
  // Note that you can customize it to only add the bearer token to certain requests

  if (req.url.startsWith(utilService.getUrlBackend())) {
    return from(addBearerToken(req, next));
  } else {
    return next(req);
  }
};
