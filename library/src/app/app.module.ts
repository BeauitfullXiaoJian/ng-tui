import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { TUIModule, CollapseModule, TabModule, CssloadModule, TUIService, DropdownModule } from '../../projects/ng-tui/src/public_api';
import { AppRoutingModule } from './app.routing';
import { ToolsUIConfig } from './config/tui-config';

@NgModule({
    declarations: [
        AppComponent
    ],
    entryComponents: [],
    imports: [
        BrowserModule,
        FormsModule,
        TUIModule.forRoot(ToolsUIConfig),
        CollapseModule,
        TabModule,
        DropdownModule,
        CssloadModule,
        AppRoutingModule
    ],
    providers: [TUIService],
    bootstrap: [AppComponent]
})
export class AppModule { }
