import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "toLocalDateString"
})
export class ToLocalDateStringPipe implements PipeTransform {
  transform(value: Date): string {
    return `${value.getDate()}.${value.getMonth()}.${value.getFullYear()}`;
  }
}
