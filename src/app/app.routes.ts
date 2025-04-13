import { Routes } from '@angular/router';
import { StoryListComponent } from './components/story-list/story-list/story-list.component';

export const routes: Routes = [
    { path: 'stories', component: StoryListComponent },
    { path: '', redirectTo: '/stories', pathMatch: 'full' }
];
