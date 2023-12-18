import {Routes} from '@angular/router';

export const memberRoutes:Routes=[
  {
    path: 'detail/:id',
    loadComponent: () => import('./page/member-detail-page/member-detail-page.component')
      .then(c => c.MemberDetailPageComponent)
  }
]
