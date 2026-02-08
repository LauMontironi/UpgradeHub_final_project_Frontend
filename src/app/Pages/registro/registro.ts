import { Component, signal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import Swal from 'sweetalert2'; 

@Component({
  selector: 'app-registro',
  imports: [ReactiveFormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {

  // signal
  inputType = signal<string>('password');

  // FormGroup para manejar el formulario de registro:
  registroForm: FormGroup = new FormGroup({
    nombre: new FormControl(null, [
      Validators.required
    ]),
    apellido: new FormControl(null, [
      Validators.required
    ]),
    email: new FormControl('example@example.com', [
      Validators.required,
      Validators.pattern(/^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/),
    ]),
    dni: new FormControl(null, [
      Validators.required,
      this.dniValidator.bind(this), Validators.required
      ]),
    telefono: new FormControl('', [Validators.required]),
    fechaNacimiento: new FormControl('dd-mm-aa', [
      Validators.required
    ]),
    alergias: new FormControl(''),
    password: new FormControl('', [
      Validators.required
    ]),
    confirmPassword: new FormControl('', [
      Validators.required
    ]),
  }, { // este validador para que sirva para todo el formulario se pasa como otro argumento
    validators: [this.passwordMatchValidator.bind(this)]
  });

  // funciones
  onSubmit() {
    // if (this.registroForm.valid) {
      console.log(this.registroForm.value);
      Swal.fire({
        title: 'Registro exitoso',
        text: '¡Usuario registrado correctamente!',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      });
      this.registroForm.reset();
    
  }

  dniValidator(control: AbstractControl): ValidationErrors | null {
    const value: string = control.value;
    //Si el campo está vacío, retornamos null (la validación de 'requerido' se hace aparte)
    if (!value) return null;
    const letras_posibles: string = 'TRWAGMYFPDXBNJZSQVHLCKET';
    
    // Convertir a mayúsculas para aceptar tanto mayúsculas como minúsculas .trim(): Elimina espacios al inicio/final
    const dniUpperCase: string = value.toUpperCase().trim();
    // el metodo test nos dice si la expresion regular se cumple o no, devuelve true:
    if (/^[XYZ\d]\d{7}[a-zA-Z]$/.test(dniUpperCase)) {
      let dni_para_calculo = dniUpperCase
      .replace('X', '0')
      .replace('Y', '1')
      .replace('Z', '2');
      const numero_extraido = dni_para_calculo.substring(0, 8);
      const resto = +(numero_extraido) % 23;
      const letra_correcta = letras_posibles[resto];
      const dni_letter = dniUpperCase.at(-1);
            
      if (dni_letter === letra_correcta) {
        return null;
      } else {
        return { letraIncorrecta: true };
      }
    } else {
      return { formatoInvalido: true };
    }
  }

  passwordMatchValidator(form: AbstractControl): ValidationErrors | null {
    // con el metodo get extraigo el control completo de password ahora por ej
    const password = form.get('password')?.value;
    const repitePassword = form.get('confirmPassword')?.value;

    // Si coinciden, devolvemos null (todo ok)
    // Si no coinciden, devolvemos un objeto de error
    return password === repitePassword ? null : { passwordMismatch: true };
  }

  checkError(fieldName: string, errorName: string) {
    return this.registroForm.get(fieldName)?.hasError(errorName) && this.registroForm.get(fieldName)?.touched
  }

  // Verificar errores a nivel del FormGroup
  checkFormError(errorName: string) {
    return this.registroForm.hasError(errorName) && (this.registroForm.get('password')?.touched || this.registroForm.get('confirmPassword')?.touched)
  }

  cambiarTipoInput() {
    this.inputType.update(val => val === 'password' ? 'text' : 'password');
  }




}