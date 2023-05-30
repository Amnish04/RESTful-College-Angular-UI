import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
    private _loading: boolean = false;
    private loadingInterval: any;
    waitTime = 0; // Seconds

    constructor() { }

    set loading(loading: boolean) {
        this._loading = loading;

        if (loading && !this.loadingInterval) {
            this.loadingInterval = setInterval(() => {
                ++this.waitTime;
            }, 1000 * 1);
        }
        else {
            clearInterval(this.loadingInterval);
            this.loadingInterval = null;
            this.waitTime = 0;
        }
    }

    get loading(): boolean {
        return this._loading;
    }

    get showTooltip() {
        return this.waitTime > 2;
    }
}
