import {  Subject } from "rxjs";

export class DataService {
    private afterParsedDataSubject = new Subject<any>()
    getAfterParsedDataSubject() {
        return this.afterParsedDataSubject;
    }
}