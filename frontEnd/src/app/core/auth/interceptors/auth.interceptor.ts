import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const jwToken = getJwtToken();
  if(jwToken){
    req.clone({
      setHeaders : {
        Authorization : 'Bearer ${jwToken}',
      }
    })
  }
  return next(req);
};


function getJwtToken() : string | null {
  return localStorage.getItem('token');
}