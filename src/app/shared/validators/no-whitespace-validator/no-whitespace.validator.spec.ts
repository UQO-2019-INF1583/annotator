import { AbstractControl } from '@angular/forms';
import { NoWhitespaceValidator } from './no-whitespace.validator';

describe('Whitespace Validator', () => {

    const validatorFn = NoWhitespaceValidator();
    /* Test lorsque la chaîne de caractères est vide. (chaîne invalide) */
    it('empty string is invalid', () => {
        const control = { value: '' }
        const result = validatorFn(control as AbstractControl)
        expect(result !== null).toBe(true);
    });
    /* Test lorsque la chaîne de caractères est composée d'espaces seulement. (chaîne invalide) */
    it('spaces only are invalid', () => {
        const control = { value: '    ' }
        const result = validatorFn(control as AbstractControl)
        expect(result !== null).toBe(true);
    });
    /* Test lorsque la chaîne de caractères est nulle. (chaîne invalide) */
    it('null is invalid', () => {
        const control: any = { value: null }
        const result = validatorFn(control as AbstractControl)
        expect(result !== null).toBe(true);
    });
    /* Test lorsque la chaîne de caractères est composée de texte avec des espaces. (chaîne valide) */
    it('text with spaces is valid', () => {
        const control = { value: 'Texte valide avec espaces' }
        const result = validatorFn(control as AbstractControl)
        expect(result).toBe(null);
    });
    /* Test lorsque la chaîne de caractères est composée de texte seulement. (chaîne valide) */
    it('text without spaces is valid', () => {
        const control = { value: 'TexteSansEspaces' }
        const result = validatorFn(control as AbstractControl)
        expect(result).toBe(null);
    });

});