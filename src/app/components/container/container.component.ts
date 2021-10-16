import { Component, OnInit } from '@angular/core';
import '@cds/core/icon/register.js';
import {
  ClarityIcons,
  userIcon,
  bugIcon,
  infoCircleIcon,
  bellIcon,
  folderIcon,
} from '@cds/core/icon';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css'],
})
export class ContainerComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    ClarityIcons.addIcons(
      userIcon,
      bugIcon,
      infoCircleIcon,
      bellIcon,
      folderIcon
    );
  }
}
