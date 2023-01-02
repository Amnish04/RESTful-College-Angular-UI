import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
    private _loading: boolean = false;

    constructor() { }

    set loading(loading: boolean) {
        this._loading = loading;
    }

    get loading(): boolean {
        return this._loading;
    }
}
