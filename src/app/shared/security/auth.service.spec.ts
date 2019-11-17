// @ts-ignore
import {LoginComponent} from './login.component';

class MockAuthService {
  authenticated = false;
  isAuthenticated() {
    return this.authenticated;
  }
}

describe('Component: Authentication', () => {

  let component: LoginComponent;
  let service: MockAuthService;

  beforeEach(() => {
    service = new MockAuthService();
    component = new LoginComponent(service);
  });

  afterEach(() => {
    service = null;
    component = null;
  });


  it('should return true from isAuthenticated when there is a token', () => {
    service.authenticated = false;
    expect(component.needsLogin()).toBeTruthy();
  });

  it('should return false from isAuthenticated when there is a token', () => {
    service.authenticated = true;
    expect(component.needsLogin()).toBeFalsy();
  });
});
