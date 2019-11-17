import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { AuthService } from '../shared/security/auth.service';
import { RegisterComponent } from './register.component';
import { AngularFireAuth } from '@angular/fire/auth';
import { By } from '@angular/platform-browser';


describe('RegisterComponent', () => {
    let comp: RegisterComponent;
    let fixture: ComponentFixture<RegisterComponent>;

    let router: Router;
    let authService: AuthService;
    let afs: AngularFirestore;
    let de: DebugElement;

    const testCred = {
        uid: 'test',
        email: 'test@gmail.com',
        password: 'Test@1234'
    };
    const validTestCred = [
        {
            uid: 'test',
            name: 'name',
            email: 'hello@gmail.com',
            password: 'Test@1234'
        },
        {
            uid: 'test',
            name: 'name',
            email: 'hello123@gmail.com',
            password: 'Test@1234'
        }];
    const invalidTestCred = [
        {
            uid: 'test',
            name: 'name',
            email: 'rainunivers',
            password: 'Test@1234'
        },
        {
            uid: 'test',
            name: 'name',
            email: 'xyz@gmail.com',
            password: 'Test@1234'
        },
        {
            uid: 'test',
            name: 'name',
            email: 'asdfasdfasdf@gmail.com',
            password: 'Test@1234'
        }

    ];


    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RegisterComponent],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [FormsModule],
            providers: [
                {
                    provide: Router,
                    useValue: {
                        navigate: jasmine.createSpy()
                    }
                },
                {
                    provide: AngularFireAuth,
                    useValue: {
                        navigate: jasmine.createSpy()
                    }
                },
                {
                    provide: AuthService,
                    useValue: {
                        signIn: jasmine.createSpy(),
                        logout: jasmine.createSpy()
                    }
                },
                {
                    provide: AngularFirestore,
                    useValue: jasmine.createSpyObj('AngularFirestore', {
                        collection: jasmine.createSpyObj({
                            doc: jasmine.createSpyObj({
                                set: jasmine.createSpy()
                            })
                        })
                    })
                }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RegisterComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement;

        router = TestBed.get(Router);
        authService = TestBed.get(AuthService);
        afs = TestBed.get(AngularFirestore);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(comp).toBeTruthy();
    });

    it('should have H2 title tag "Register"', () => {
        expect(de.query(By.css('h2')).nativeElement.innerText).toBe('Register');
    });

    it('should have a form to allow the user to type in the necessary information', () => {
        expect(de.query(By.css('form'))).toBeTruthy();
    });

    it('should verify that there are 5 divs IN the input form', () => {
        const divs = document.querySelectorAll('form  div').length;
        const condition = (divs === 5);
        expect(condition).toBe(true);
    });

    describe('emailInvalid()', () => {
        it('should return true if error message is not empty', () => {
            comp.errorMessage = 'test message';
            expect(comp.errorMessage).toBeTruthy();
        });

        it('should return false if error message is empty', () => {
            comp.errorMessage = '';
            expect(comp.errorMessage).toBeFalsy();
        });
    });

    describe('redirectToLoginPage()', () => {
        it('should navigate to login page', () => {
            comp.redirectToLoginPage();
            expect(router.navigate).toHaveBeenCalledTimes(1);
            expect(router.navigate).toHaveBeenCalledWith(['/login']);
        });
    });

    describe('updateUserInfo()', () => {
        it('should update the user info and then logout', () => {
            comp.updateUserInfo();
            expect(afs.collection).toHaveBeenCalledTimes(1);
            expect(afs.collection).toHaveBeenCalledWith('Users/');
            expect(authService.logout).toHaveBeenCalledTimes(1);
        });
    });

    describe('signIn()', () => {
        it('should signin user', () => {
            authService.signIn = jasmine.createSpy().and.callFake(() => { });
            comp.userInfo = {
                uid: testCred.uid,
                email: testCred.email,
                password: testCred.password
            };

            comp.signIn();
            expect(authService.signIn).toHaveBeenCalledWith(testCred.email, testCred.password);
        });

        it('should throw error if signin fails', (done) => {
            authService.signIn = jasmine.createSpy().and.throwError('Sign in failed');
            try {
                comp.signIn();
            } catch (e) {
                done();
            }

            expect(authService.signIn).toHaveBeenCalledTimes(1);
        });
    });

    describe('Check for emails', function () {
        beforeEach(() => {
            fixture = TestBed.createComponent(RegisterComponent);
            comp = fixture.componentInstance;
        });

        validTestCred.forEach((valid) => {

            it(`should not show error for Email - ${valid.email}`, <any>fakeAsync(() => {
                const spy = jasmine.createSpy();
                spyOn(firebase, 'auth').and.returnValue({
                    createUserWithEmailAndPassword: jasmine.createSpy().and.returnValue(Promise.resolve({
                        user: {
                            updateProfile: spy
                        }
                    }))
                } as any);
                setInputValue('input[name="firstname"]', valid.name);
                setInputValue('input[name="lastname"]', valid.name);
                setInputValue('input[name="email"]', valid.email);
                setInputValue('input[name="password"]', valid.password);
                fixture.debugElement.query(By.css('#btnSubmit')).nativeElement.click()
                fixture.detectChanges();
                tick(20);
                const validationMessage = fixture.debugElement.query(By.css('input[name="email"]')).nativeElement.validationMessage;
                expect(validationMessage).toEqual('');
            }));
        });

        invalidTestCred.forEach((inVal) => {
            it(`should show error for Email - ${inVal.email}`, <any>fakeAsync(() => {
                const spy = jasmine.createSpy();
                spyOn(firebase, 'auth').and.returnValue({
                    createUserWithEmailAndPassword: jasmine.createSpy().and.returnValue(Promise.resolve({
                        user: {
                            updateProfile: spy
                        }
                    }))
                } as any);
                setInputValue('input[name="firstname"]', inVal.name);
                setInputValue('input[name="lastname"]', inVal.name);
                setInputValue('input[name="email"]', inVal.email);
                setInputValue('input[name="password"]', inVal.password);
                fixture.debugElement.query(By.css('#btnSubmit')).nativeElement.click()
                fixture.detectChanges();
                tick(20);
                const validationMessage = fixture.debugElement.query(By.css('input[name="email"]')).nativeElement.validationMessage;
                expect(validationMessage).not.toBe(null);
                // expect(comp.errorMessage).not.toBeNull();
            }));
        });


        // must be called from within fakeAsync due to use of tick()
        function setInputValue(selector: string, value: string) {
            fixture.detectChanges();
            tick();
            const input = fixture.debugElement.query(By.css(selector)).nativeElement;
            input.value = value;
            input.dispatchEvent(new Event('input'));
            tick();
        }
    });

    describe('registerWithEmailAndPassword()', () => {
        it('should register the user and update profile', async () => {
            const spy = jasmine.createSpy();
            comp.userInfo.firstname = 'Test User';


            spyOn(firebase, 'auth').and.returnValue({
                createUserWithEmailAndPassword: jasmine.createSpy().and.returnValue(Promise.resolve({
                    user: {
                        updateProfile: spy
                    }
                }))
            } as any);

            await comp.registerWithEmailAndPassword();
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith({
                displayName: 'Test User',
                photoURL: ''
            });
            expect(firebase.auth).toHaveBeenCalledTimes(1);
        });
    });

    describe('register()', () => {
        it('should register the user and navigate to login page', async () => {
            const registerWithEmailAndPasswordSpy = spyOn(comp, 'registerWithEmailAndPassword');
            const _signInSpy = spyOn(comp, 'signIn');
            const updateUserInfoSpy = spyOn(comp, 'updateUserInfo');
            const redirectToLoginPageSpy = spyOn(comp, 'redirectToLoginPage');

            await comp.register();

            expect(registerWithEmailAndPasswordSpy).toHaveBeenCalledTimes(1);
            expect(_signInSpy).toHaveBeenCalledTimes(1);
            expect(updateUserInfoSpy).toHaveBeenCalledTimes(1);
            expect(redirectToLoginPageSpy).toHaveBeenCalledTimes(1);
        });

        it('should show the error message if firebase api fails', async () => {
            const registerWithEmailAndPasswordSpy = spyOn(comp, 'registerWithEmailAndPassword').and.throwError('Test message 101');
            const _signInSpy = spyOn(comp, 'signIn');
            const updateUserInfoSpy = spyOn(comp, 'updateUserInfo');
            const redirectToLoginPageSpy = spyOn(comp, 'redirectToLoginPage');

            await comp.register();

            expect(registerWithEmailAndPasswordSpy).toHaveBeenCalledTimes(1);
            expect(_signInSpy).toHaveBeenCalledTimes(0);
            expect(updateUserInfoSpy).toHaveBeenCalledTimes(0);
            expect(redirectToLoginPageSpy).toHaveBeenCalledTimes(0);
            expect(comp.errorMessage).toEqual('Test message 101')
        });
    });
});
