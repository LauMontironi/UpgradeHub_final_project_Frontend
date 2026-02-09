import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reservas.html',
  styleUrls: ['./reservas.css'],
})
export class Reservas {
  loading = false;
  message = '';
  success = false;

  sedes = ['UpgradeFood Centro', 'UpgradeFood Norte', 'UpgradeFood Playa'];

  horas = [
    '12:30', '13:00', '13:30', '14:00', '14:30', '15:00',
    '20:00', '20:30', '21:00', '21:30', '22:00', '22:30'
  ];

  personasList = [1, 2, 3, 4, 5, 6, 7, 8];

  minDate = this.formatDate(new Date());

  // 👇 IMPORTANTE: no uses this.fb aquí arriba
  form: any;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      sede: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      personas: ['', Validators.required],

      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellidos: ['', [Validators.required, Validators.minLength(2)]],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9+()\s-]{7,}$/)]],
      email: ['', [Validators.required, Validators.email]],

      comentarios: [''],
      acepta: [false, Validators.requiredTrue],
    });
  }

  showError(controlName: string): boolean {
    const c = this.form.get(controlName);
    return !!c && c.invalid && (c.touched || c.dirty);
  }

  reset() {
    this.form.reset({
      sede: '',
      fecha: '',
      hora: '',
      personas: '',
      nombre: '',
      apellidos: '',
      telefono: '',
      email: '',
      comentarios: '',
      acepta: false,
    });
    this.message = '';
    this.success = false;
  }

  async onSubmit() {
    this.message = '';
    this.success = false;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.message = 'Revisa los campos marcados.';
      return;
    }

    this.loading = true;

    try {
      await new Promise((r) => setTimeout(r, 700));
      this.success = true;
      this.message = 'Reserva enviada. Te confirmaremos lo antes posible.';
      this.reset();
    } catch {
      this.success = false;
      this.message = 'No se pudo enviar la reserva. Inténtalo de nuevo.';
    } finally {
      this.loading = false;
    }
  }

  private formatDate(d: Date): string {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }
}
