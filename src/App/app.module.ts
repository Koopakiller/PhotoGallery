import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./Components/App";
import { PhotoService } from "./Services/PhotoService";
import { LibraryIndexComponent } from "./Components/LibraryIndex";
import { LibraryComponent } from "./Components/Library";
import { ScrollToDirective } from "./Directives/ScrollTo";

const appRoutes: Routes = [
  { path: "", component: LibraryIndexComponent },
  { path: "Library/:library/Photo/:photo", component: LibraryComponent },
  { path: "Library/:library", component: LibraryComponent },
  { path: "**", redirectTo: "/" }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
    ),
    HttpModule,
    BrowserModule,
    FormsModule,
  ],
  declarations: [
    AppComponent,
    LibraryIndexComponent,
    LibraryComponent,
    ScrollToDirective
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    PhotoService
  ],
})
export class AppModule {
}
