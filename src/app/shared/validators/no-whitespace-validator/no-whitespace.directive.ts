import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Validator, AbstractControl, Validators, NG_VALIDATORS } from '@angular/forms';

import { NoWhitespaceValidator } from './no-whitespace.validator';

/**
 * This validator works like "required" but it does not allow whitespace either
 *
 * @export
 * @class NoWhitespaceDirective
 * @implements {Validator}
 */
@Directive({
  // Le selecteur appNoSpacesOnly sera utilisé dans les "inputs" HTML comme un attribut
  selector: '[appNoSpacesOnly]',
  // Le provider NG_VALIDATORS doit être indiqué pour que le sélecteur appNoSpaces marche
  providers: [{ provide: NG_VALIDATORS, useExisting: NoWhitespaceDirective, multi: true }]
})
/*  Classe permettant une intégration facile de la validation avec les formulaires Angular */
export class NoWhitespaceDirective implements Validator {

  private valFn = NoWhitespaceValidator();
  validate(control: AbstractControl): { [key: string]: any } {
    return this.valFn(control);
  }
}