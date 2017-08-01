import { Injectable } from '@angular/core';
import {
  Http,
  RequestOptionsArgs,
  Request,
  Response,
  ConnectionBackend,
  RequestOptions
} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


// Credit: https://scotch.io/@kashyapmukkamala/using-http-interceptor-with-angular2

@Injectable()
export class HttpInterceptorService extends Http {

  private lastRequest = new BehaviorSubject(null);

  constructor(
      protected _backend: ConnectionBackend,
      protected _defaultOptions: RequestOptions) {
    super(_backend, _defaultOptions);
  }

  setCustomHeaders(options?: RequestOptionsArgs): RequestOptionsArgs {
    return options;
  }

  request(request: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    const customOptions = this.setCustomHeaders(options);
    return super.request(request, customOptions)
        .flatMap((value: Response, index: number) => {
          if (request instanceof Request) {
            // Get = 0,
            // Post = 1,
            // Put = 2,
            // Delete = 3,
            // Options = 4,
            // Head = 5,
            // Patch = 6,
            if (request.method === 2 || request.method === 1) { // PUT / POST
              this.lastRequest.next(value);
            }
          }
          return Observable.of(value);
        })
        .catch(this.catchError(this));
  }

  private catchError(self: HttpInterceptorService) {
    return (error: any) => {
      if ((error.json()) && (error.json().error)) {
        this.lastRequest.next({error: error});
      }
      return Observable.throw(error);
    };
  }

  getLastResponse() {
    return this.lastRequest.asObservable();
  }
}

