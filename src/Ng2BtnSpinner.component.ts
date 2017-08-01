import {
  HostListener,
  Component,
  Input,
  EventEmitter,
  Output,
  AfterContentChecked,
  ViewChild, OnDestroy
} from '@angular/core';
import {
  HttpInterceptorService
} from './Ng2BtnSpinner.service';
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'ng2-btn-spinner',
  styleUrls: ['./Ng2BtnSpinner.component.scss'],
  template: `
      <button #btnSpinner
              [disabled]="btnDisabled"
              type="button"
              (click)="onClick"
              [ngClass]="{'loading': loading, 'not-active': btnWhite}"
              class="btn btn-primary btn-spinner">
          <span>{{btnTitle}}</span>
      </button>
  `
})
export class Ng2BtnSpinnerComponent
    implements AfterContentChecked, OnDestroy {

  @ViewChild('btnSpinner') m;

  @Input() btnTitle: string;
  @Input() btnDisabled?: boolean = false;
  @Input() btnWhite?: boolean = false;

  @Output() btnClick: EventEmitter<null> = new EventEmitter();

  private subscription: Subscription;
  private isVisible: boolean = false;
  private isClicked: boolean = false;
  private loadingTimer: any = null;
  private error: boolean = false;

  public loading: boolean = false;

  constructor(private httpInterceptorService: HttpInterceptorService) {
    this.loadingTimer = null;
    console.log('dddddd');
  }

  initSpinner() {
    this.btnDisabled = false;
    this.loadingTimer = null;
    this.isClicked = false;
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    clearTimeout(this.loadingTimer);
  }

  ngAfterContentChecked(): void {
    if (this.isVisible === false && this.m.nativeElement.offsetParent != null) {
      this.isVisible = true;
      this.initSpinner();
    } else if (this.isVisible === true && this.m.nativeElement.offsetParent == null) {
      this.isVisible = false;
    }
  }

  processLoading() {
    this.btnDisabled = true;
    this.loading = true;
    this.subscription = this.httpInterceptorService
        .getLastResponse()
        .subscribe((res: any) => {
          if (res && res.error) {
            this.btnDisabled = false;
            this.isClicked = false;
            this.error = true;
          } else { // only one click if success
            this.btnDisabled = true;
            this.isClicked = true;
            this.error = false;
          }
          this.clearLoader();
        });
  }

  async clearLoader() {
    this.loadingTimer = setTimeout(() => {
      this.loading = false;
    }, 5000);
  }

  @HostListener('click', ['$event'])
  public onClick(event: Event) {
    if (this.btnDisabled) {
      event.preventDefault();
      return false;
    }
    if (!this.isClicked) { // Handle only one click if success
      this.btnClick.emit(null);
      this.isClicked = true;
      this.processLoading();
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
