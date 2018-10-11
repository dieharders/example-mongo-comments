import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Needed for animations
import { FormsModule }   from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { AppRoutingModule }     from './app-routing/app-routing.module';

import { AppComponent } from './app.component';
import { CommentsComponent } from './comments-list/comments-list.component';
import { LoadingSpinnerComponent } from './animations/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    CommentsComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule // Add for animations
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }