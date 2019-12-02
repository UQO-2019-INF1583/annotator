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


  it('Loading to be true', () => {
    service.authenticated = true;
    expect(component.loading = true);
  });

  xit('canLogin returns false when the user is not authenticated', () => {
    service.authenticated = false;
    // @ts-ignore
    expect(component.handleError().toBe('email required'));
  });
});
