import { RouterModule } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { SellerComponent } from "./components/seller/seller.component";

type PathMatch = "full" | "prefix" | undefined;

const appRoutes = [
  
    { path: 'login', component: LoginComponent},
    { path: 'home', component: HomeComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'seller', component: SellerComponent},
    { path: '', redirectTo: '/login',pathMatch:'full' as PathMatch},
    { path: '**', redirectTo: '/login',pathMatch:'full' as PathMatch}
  ];
  export const routing = RouterModule.forRoot(appRoutes);