import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StoryListComponent } from './components/story-list/story-list/story-list.component';

@Component({
  selector: 'app-root',
  imports: [StoryListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
