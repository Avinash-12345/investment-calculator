import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css',
})
export class UserInputComponent {
  @Output() calculated = new EventEmitter<any[]>();

  investment = {
    AnnualInvestment: '',
    initialinvestment: '',
    expectedreturn: '',
    duration: '',
  };
  submitted = false;

  calculateInvestment(form: any) {
    const result: any[] = []; // ✅ Declare the result array

    let total = Number(this.investment.initialinvestment);
    let totalInterest = 0;
    let investedCapital = Number(this.investment.initialinvestment);
    const annualInvestment = Number(this.investment.AnnualInvestment);
    const expectedReturn = Number(this.investment.expectedreturn);

    for (let year = 1; year <= Number(this.investment.duration); year++) {
      const interest = total * (expectedReturn / 100);
      total += interest + annualInvestment;
      investedCapital += annualInvestment;
      totalInterest += interest;

      result.push({
        year,
        investmentValue: total,
        yearlyInterest: interest,
        totalInterest,
        investedCapital,
      });
    }

    this.calculated.emit(result);
  }
}