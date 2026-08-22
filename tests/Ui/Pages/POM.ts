import { Page } from '@playwright/test';
import Actions from '../../../Utilities/Actions';
import {LoginPage} from './LoginPage';
import {RegisterPage} from './Register';



export class POM {
   private readonly page: Page;
   private readonly Actions: Actions;
   private readonly Login: LoginPage;
   private readonly register: RegisterPage;

   constructor(page: Page) {
       this.page = page;
       this.Actions = new Actions(page);
       this.Login = new LoginPage(page);
       this.register = new RegisterPage(page);

   }
   //*********************methods   *****************************  
   getLoginPage() {
    return this.Login;
   }
   getAction() {
    return this.Actions;
   
   }
   getRegisterPage() { 
    return this.register;
   }

      
   };
