import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss'],
})
export class PdfComponent implements OnInit {
  constructor(public _service: UserService) {}
  pdfSrc: string;
  ngOnInit(): void {
    this.pdfSrc = this._service.pdfLink;
    console.log(this.pdfSrc);
  }
}
