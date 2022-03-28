import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss'],
})
export class AdminPanelComponent implements OnInit {
  public careers: any = [];
  constructor(private _service: UserService, private _router: Router) {}

  ngOnInit(): void {
    this.loadApplications();
  }
  delete(doc: any) {
    console.log(doc);
    this.careers = this.careers.filter((item) => item._id !== doc._id);
    this._service.deleteApplication(doc._id).subscribe(
      (res: any) => {
        if (res.status === 'success') {
          Swal.fire({
            icon: 'success',
            title: 'Deleted',
          });
        }
      },
      (error: any) => {
        console.log(error.error);
      }
    );
  }

  viewResume(link) {
    console.log(link);
    this._service.pdfLink = link;
    this._router.navigate(['/pdf']);
  }
  loadApplications() {
    this._service.loadApplication().subscribe(
      (res: any) => {
        console.log(res);
        if (res.status === 'success') {
          this.careers = res.data.data;
        }
      },
      (err: any) => {}
    );
  }
}
