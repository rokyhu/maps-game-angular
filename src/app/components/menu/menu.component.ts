import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ThemeOption } from '../../../assets/theme-option.model';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @Input() themeOptions: Array<ThemeOption>;
  @Output() themeChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {}

  changeTheme(themeToSet: string) {
    this.themeChange.emit(themeToSet);
  }
}
