import { Component } from '@angular/core';

import { JobService } from '../job.service/job.service';

@Component({
  selector: 'page-job-notification',
  templateUrl: 'job-notification.component.html'
})
export class JobNotificationComponent {

  constructor(private jobService : JobService) {

  }

}
