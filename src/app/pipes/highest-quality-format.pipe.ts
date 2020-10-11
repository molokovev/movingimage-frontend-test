import { Pipe, PipeTransform } from "@angular/core";
import { IFormat } from "../models/format.interface";

@Pipe({
  name: "highestQualityFormat",
})
export class HighestQualityFormatPipe implements PipeTransform {
  transform(value: { [index: string]: IFormat }): string {
    const formats = Object.values(value);

    const highestFormat = formats.reduce(
      (result, next) => {
        const resIsHigher =
          getResNumberFromString(next.res) >=
          getResNumberFromString(result.res);
        const sizeIsBigger = next.size >= result.size;

        if (resIsHigher && sizeIsBigger) {
          return next;
        }
        return result;
      },
      { res: "0", size: 0 }
    );

    const label = Object.keys(value)[formats.indexOf(highestFormat)];
    return `${label} ${highestFormat.res}`;
  }
}

function getResNumberFromString(res: string): number {
  try {
    return parseInt(res);
  } catch (e) {
    const numPart = res.slice(0, res.indexOf("p"));
    return parseInt(numPart);
  }
}
