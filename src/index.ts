import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2BtnSpinnerComponent } from './Ng2BtnSpinner.component';
import { HttpInterceptorService } from './Ng2BtnSpinner.service';
import { HttpModule, XHRBackend, RequestOptions, Http } from '@angular/http';

export function httpClientFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions): Http {
  return new HttpInterceptorService(xhrBackend, requestOptions);
}

@NgModule({
  imports: [
    HttpModule,
    CommonModule
  ],
  declarations: [
    Ng2BtnSpinnerComponent
  ],
  exports: [
    Ng2BtnSpinnerComponent
  ],
  providers: [
    {
      provide: HttpInterceptorService,
      useFactory: httpClientFactory,
      deps: [
        XHRBackend,
        RequestOptions
      ]
    }
  ]
})
export class Ng2BtnSpinnerModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: Ng2BtnSpinnerModule,
      providers: [HttpInterceptorService]
    };
  }
}
