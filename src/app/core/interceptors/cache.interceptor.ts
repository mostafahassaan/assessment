import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

/**
 * Intercepts HTTP requests and caches GET responses for future use.
 */
@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  private cache = new Map<string, HttpResponse<any>>();

  /**
   * Intercepts HTTP requests and caches GET requests for faster subsequent responses.
   * @param req - The HTTP request being intercepted.
   * @param next - The next HTTP handler in the chain.
   * @returns An observable of the HTTP event.
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // If the request is not a GET request, pass it through the chain
    if (req.method !== 'GET') {
      return next.handle(req);
    }

    // If the request URL is cached, serve the cached response
    const cachedResponse = this.cache.get(req.url);
    if (cachedResponse) {
      return of(cachedResponse.clone());
    }

    // Otherwise, pass the request through the chain and cache the response
    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          this.cache.set(req.url, event.clone());
        }
      })
    );
  }
}
