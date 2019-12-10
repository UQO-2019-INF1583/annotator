import { AbstractControl, ValidatorFn } from '@angular/forms';

/* Fonction validant qu'une chaîne de caractères d'un contrôle
   ne soit pas composée d'espaces seulement
 */
export function NoWhitespaceValidator(): ValidatorFn {

  return (control: AbstractControl): { [key: string]: any } => {

    // Vérification pour voir si la chaîne de caratères reçue est composée seulement d'espaces
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    /* Si c'est une chaîne de caractères valide, on retourne un null indiquant que la valeur est valide
       Dans le cas contraire, on retourne un objet d'erreur de validation ('whitespace' état le code de l'erreur) */
    return isValid ? null : { 'whitespace': true };

  };
}