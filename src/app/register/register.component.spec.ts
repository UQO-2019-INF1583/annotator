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

    // Creation du tableau des FAKE profiles qui sont  enregistrés
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

    // Creation du tableau des FAKE profiles qui sont pas enregistrés
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

    describe('Minimun one button to save user registration should be one the page ', () => {
        it('should have a minimun of one button on the page  and it should be <Register>', () => {
            const buttons = fixture.debugElement
                .queryAll(By.css('button'));
            expect(buttons.length >= 1).toBeTruthy();
        });
        it('The page should contain one "Register" button', () => {
            const buttons = fixture.debugElement
                .queryAll(By.css('button'));
            const nativeButton: HTMLButtonElement = buttons[0].nativeElement;
            expect(nativeButton.textContent).toBe('Register');
        });
    });

    // Tester les deux cas possible de la fonction emailInvalid()
    describe('emailInvalid()', () => {
        // Doit retourner True si le message d'erreur n'est pas vide
        it('should return true if error message is not empty', () => {
            comp.errorMessage = 'test message';
            expect(comp.errorMessage).toBeTruthy();
        });
        // Doit retourner False si le message d'erreur est vide
        it('should return false if error message is empty', () => {
            comp.errorMessage = '';
            expect(comp.errorMessage).toBeFalsy();
        });
    });

    // Tester si le code redirige l'utilisateur après l'enregistrement
    describe('redirectToLoginPage()', () => {
        // Accéder à la page de connexion
        it('should navigate to login page', () => {
            comp.redirectToLoginPage();
            expect(router.navigate).toHaveBeenCalledTimes(1);
            expect(router.navigate).toHaveBeenCalledWith(['/login']);
        });
    });

    // Tester is la mise à jour des informations utilisateur fonctionne correctement
    describe('updateUserInfo()', () => {
        // Devrait mettre à jour les informations de l'utilisateur puis se déconnecter
        it('should update the user info and then logout', () => {
            comp.updateUserInfo();
            expect(afs.collection).toHaveBeenCalledTimes(1);
            expect(afs.collection).toHaveBeenCalledWith('Users/');
            expect(authService.logout).toHaveBeenCalledTimes(1);
        });
    });

    // Test pour chercher les messages d'erreur valides et non valides.
    describe('Check for emails', function () {
        beforeEach(() => {
            fixture = TestBed.createComponent(RegisterComponent);
            comp = fixture.componentInstance;
        });

        validTestCred.forEach((valid) => {

            // Ne devrait pas montrer d'erreur pour Email
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

            // Devrait montrer une erreur pour Email
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
                fixture.debugElement.query(By.css('#btnSubmit')).nativeElement.click();
                fixture.detectChanges();
                tick(20);
                const validationMessage = fixture.debugElement.query(By.css('input[name="email"]')).nativeElement.validationMessage;
                expect(validationMessage).not.toBe(null);
                // expect(comp.errorMessage).not.toBeNull();
            }));
        });


        // Doit être appelé depuis fakeAsync en raison de l'utilisation de tick ()
        function setInputValue(selector: string, value: string) {
            fixture.detectChanges();
            tick();
            const input = fixture.debugElement.query(By.css(selector)).nativeElement;
            input.value = value;
            input.dispatchEvent(new Event('input'));
            tick();
        }
    });

    // Test pour vérifier s que la fonction registre / inscription fonctionne correctement
    describe('registerWithEmailAndPassword()', () => {

        // Devrait enregistrer l'utilisateur et mettre à jour le profil
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

    // Test pour vérifier que le registre de fonction fonctionne correctement
    describe('register()', () => {

        // Devrait enregistrer l'utilisateur et accéder à la page de connexion
        it('should register the user and navigate to login page', async () => {
            const registerWithEmailAndPasswordSpy = spyOn(comp, 'registerWithEmailAndPassword');
            const updateUserInfoSpy = spyOn(comp, 'updateUserInfo');
            const redirectToLoginPageSpy = spyOn(comp, 'redirectToLoginPage');

            await comp.register();

            expect(registerWithEmailAndPasswordSpy).toHaveBeenCalledTimes(1);
            expect(updateUserInfoSpy).toHaveBeenCalledTimes(1);
            expect(redirectToLoginPageSpy).toHaveBeenCalledTimes(1);
        });

        // Devrait afficher le message d'erreur si firebase API échoue
        it('should show the error message if firebase api fails', async () => {
            const registerWithEmailAndPasswordSpy = spyOn(comp, 'registerWithEmailAndPassword').and.throwError('Test message 101');
            const updateUserInfoSpy = spyOn(comp, 'updateUserInfo');
            const redirectToLoginPageSpy = spyOn(comp, 'redirectToLoginPage');

            await comp.register();

            expect(registerWithEmailAndPasswordSpy).toHaveBeenCalledTimes(1);
            expect(updateUserInfoSpy).toHaveBeenCalledTimes(0);
            expect(redirectToLoginPageSpy).toHaveBeenCalledTimes(0);
            expect(comp.errorMessage).toEqual('Test message 101')
        });
    });
});
