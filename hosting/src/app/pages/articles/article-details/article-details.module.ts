import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CardsModule } from '@shared/cards/cards.module';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MarkdownViewerModule } from '@shared/markdown-viewer/markdown-viewer.module';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { ArticleDetailsRoutingModule } from './article-details-routing.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HeadingsModule } from '@shared/headings/headings.module';

@NgModule({
  declarations: [DetailsComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatChipsModule,
    HeadingsModule,
    MatProgressSpinnerModule,
    MarkdownViewerModule,
    MatButtonModule,
    CardsModule,
    ArticleDetailsRoutingModule,
  ],
})
export class ArticleDetailsModule {}
