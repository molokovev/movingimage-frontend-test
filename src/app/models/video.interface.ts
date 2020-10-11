import { IFormat } from "./format.interface";

export interface IVideo {
  id: number;
  catIds: number[];
  name: string;
  formats: {
    [index: string]: IFormat;
  };
  releaseDate: string;
}
