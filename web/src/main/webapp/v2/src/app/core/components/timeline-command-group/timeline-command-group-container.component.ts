import { Component, OnInit, OnDestroy } from '@angular/core';
import * as moment from 'moment-timezone';
import { Subject, Observable, combineLatest, merge } from 'rxjs';

import { StoreHelperService, NewUrlStateNotificationService } from 'app/shared/services';
import { map } from 'rxjs/operators';

@Component({
    selector: 'pp-timeline-command-group-container',
    templateUrl: './timeline-command-group-container.component.html',
    styleUrls: ['./timeline-command-group-container.component.css'],
})
export class TimelineCommandGroupContainerComponent implements OnInit, OnDestroy {
    private unsubscribe: Subject<void> = new Subject();
    pointingTime$: Observable<string>;
    constructor(
        private storeHelperService: StoreHelperService,
        private newUrlStateNotificationService: NewUrlStateNotificationService,
    ) {}
    ngOnInit() {
        this.connectStore();
    }
    ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
    private connectStore(): void {
        this.pointingTime$ = combineLatest(
            this.storeHelperService.getDateFormat(this.unsubscribe, 0),
            this.storeHelperService.getTimezone(this.unsubscribe),
            merge(
                this.newUrlStateNotificationService.onUrlStateChange$.pipe(
                    map((urlService: NewUrlStateNotificationService) => {
                        return urlService.getEndTimeToNumber();
                    })
                ),
                this.storeHelperService.getInspectorTimelineSelectedTime(this.unsubscribe)
            )
        ).pipe(
            map(([dateFormat, timezone, pointingTime]: [string, string, number]) => {
                return moment(pointingTime).tz(timezone).format(dateFormat);
            })
        );
    }
}
