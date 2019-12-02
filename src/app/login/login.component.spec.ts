import {LoginComponent} from './login.component';
import {error} from '@angular/compiler/src/util';

class MockAuthService {
  authenticated = false;

  isAuthenticated() {
    return this.authenticated;
  }
}

fdescribe('Component: Login', () => {

  let component: LoginComponent;
  let service: MockAuthService;

  beforeEach(() => {
    service = new MockAuthService();
    // @ts-ignore
    component = new LoginComponent(service);
  });

  afterEach(() => {
    service = null;
    component = null;
  });

//1er test
  it('Verification Loading pour etre a true', () => {
    service.authenticated = true;
    expect(component.loading=true ).toBe(true,true);
  });//fin premier test

// 2eme test
  it('Verification ErrorMessage = "Email Required"', () => {
    service.authenticated = false;
    // @ts-ignore
    expect(component.errorMessage='Email Required').toBe("Email Required");
  });//fin 2eme test

});
