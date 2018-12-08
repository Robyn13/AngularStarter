import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { ReturnObject } from './models/base.models';

@Injectable()
export class HydrationInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
      map(event => {
        if (event instanceof HttpResponse && !!!request.params['responseObject']) {
          return <HttpEvent<any>> {
            ...event,
            body: this.hydrateReturnObject(request.params['responseObject'], event.body)
          };
        }
        return event;
      })
    );
  }

  private hydrateReturnObject<T>(ctor: {new(): T}, result: T|T[]) {
    if (!!!result) {
      return null;
    }

    const createObject = (object: T) => {
      return new ReturnObject().register(ctor, object);
    };

    if (Array.isArray(result)) {
      return (result.map(row => {
        return createObject(row);
      }));
    }
    return createObject(result);
  }
}