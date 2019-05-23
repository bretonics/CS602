import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from "./components/welcome/welcome.component";
import { LoginComponent } from './components/login/login.component';
import { OpenComponent } from './components/open/open.component';
import { AccountComponent } from './components/account/account.component';
import { DepositComponent } from './components/deposit/deposit.component';
import { WithdrawComponent } from './components/withdraw/withdraw.component';
import { TransactionsComponent } from './components/transactions/transactions.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  // { path: '', redirectTo: '', pathMatch: 'full' },
  // { path: 'login', component: LoginComponent },
  { path: 'account', component: AccountComponent },
  { path: 'account/open', component: OpenComponent },
  { path: 'deposit', component: DepositComponent },
  { path: 'withdraw', component: WithdrawComponent },
  { path: 'transactions', component: TransactionsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
