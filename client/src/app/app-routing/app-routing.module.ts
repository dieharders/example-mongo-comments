import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommentsComponent } from '../comments-list/comments-list.component';

const routes: Routes = [
   {
     path: 'comments',
     component: CommentsComponent
   },
   {
     path: '',
     redirectTo: 'comments',
     pathMatch: 'full'
   },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}