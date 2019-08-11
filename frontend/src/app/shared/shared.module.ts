import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FancySwitchComponent } from './components/fancy-switch/fancy-switch.component';
import { LandingpageComponent } from './components/landingpage/landingpage.component';
import { LogoComponent } from './components/logo/logo.component';
import { ImageFallbackDirective } from './directives/image-fallback.directive';
import { MarkdownEditorComponent } from './components/markdown-editor/markdown-editor.component';

import { MarkdownModule } from 'ngx-markdown';
import { FilterPipe } from './pipes/filter.pipe';
import { AutosizeSvgDirective } from './directives/autosize-svg.directive';

@NgModule({
  declarations: [
    FancySwitchComponent,
    LandingpageComponent,
    LogoComponent,
    ImageFallbackDirective,
    MarkdownEditorComponent,
    FilterPipe,
    AutosizeSvgDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    MarkdownModule.forRoot()
  ],
  exports: [
    FancySwitchComponent,
    LandingpageComponent,
    LogoComponent,
    ImageFallbackDirective,
    MarkdownEditorComponent,
    FilterPipe,
    AutosizeSvgDirective
  ]
})
export class SharedModule { }
