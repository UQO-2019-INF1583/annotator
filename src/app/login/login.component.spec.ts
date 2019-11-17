import {LoginComponent} from './login.component';
// @ts-ignore
import {AuthService} from './auth.service';

describe('Component: Authentication', () => {

  let component: LoginComponent;
  let service: AuthService;

  beforeEach(() => {
    service = new AuthService();
    // @ts-ignore
    component = new LoginComponent(service);
  });

  afterEach(() => {
    localStorage.removeItem('token');
    service = null;
    component = null;
  });


  it('Login returns false when the user is not authenticated', () => {
    expect(component.needsLogin()).toBeTruthy();
  });

  it('Login returns false when the user is not authenticated', () => {
    localStorage.setItem('token', '12345');
    expect(component.needsLogin()).toBeFalsy();
  });
});
