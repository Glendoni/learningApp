import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelectModule } from 'ng2-select';
import { SharedModule } from '../../shared/shared.module';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { LockComponent } from './lock/lock.component';
import { AuthGuard } from '../../_guards';
import { RecoverComponent } from './recover/recover.component';
import { Signupv2Component } from './signupv2/signupv2.component';
import { Signinv2Component } from './signinv2/signinv2.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { CommunityComponent } from './community/community.component';
import { UserComponent } from './user/user.component';
import { RecentPracticesComponent } from './recent-practices/recent-practices.component';
import { CommunityOfflineComponent } from './community-offline/community-offline.component';
import { CommunityQualifiedComponent } from './community-qualified/community-qualified.component';
 

  const routes: Routes = [
      
       {
        path: '',
        component: UserComponent, canActivate: [AuthGuard],
        children: [
       { path: 'home', component: HomeComponent },      
    //{ path: 'search', component: SearchComponent },
             { path: 'recent', component: RecentPracticesComponent },
    { path: 'community/:id', component: CommunityComponent }
            ]
       },
      { path: 'signin', component: SigninComponent },
     { path: 'signup', component: SignupComponent },
      { path: 'lock', component: LockComponent },
     { path: 'recover', component: RecoverComponent },
 ];

@NgModule({
    imports: [
        SharedModule,
        SelectModule,
         RouterModule.forChild(routes)
    ],
    declarations: [
        SigninComponent,
        SignupComponent,
        LockComponent,
        RecoverComponent,
        Signupv2Component,
        Signinv2Component,
        HomeComponent,
        SearchComponent,
        CommunityComponent,
        UserComponent,
        RecentPracticesComponent,
        CommunityOfflineComponent,
        CommunityQualifiedComponent
    ],
    exports: [
        RouterModule,
        SigninComponent,
        SignupComponent,
        LockComponent,
        RecoverComponent
    ]
})
export class UserModule { }