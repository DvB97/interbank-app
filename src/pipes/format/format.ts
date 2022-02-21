import { Pipe, PipeTransform } from "@angular/core";

/**
 * Generated class for the FormatPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: "format"
})
export class FormatPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: number, ...args) {
    var number = value;
    var width = 3;
    var numberOutput = Math.abs(number); /* Valor absoluto del número */
    var length = number.toString().length; /* Largo del número */
    var zero = "0"; /* String de cero */

    if (width <= length) {
      if (number < 0) {
        return "-" + numberOutput.toString();
      } else {
        return numberOutput.toString();
      }
    } else {
      if (number < 0) {
        return "-" + zero.repeat(width - length) + numberOutput.toString();
      } else {
        return zero.repeat(width - length) + numberOutput.toString();
      }
    }
  }
}
