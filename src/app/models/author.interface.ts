import { IVideo } from "./video.interface";

export interface IAuthor {
  id: number;
  name: string;
  videos: IVideo[];
}
