import { IAuthor } from "./author.interface";
import { ICategory } from "./category.interface";
import { IVideo, IVideoExtended } from "./video.interface";
import { HighestQualityFormatPipe } from "../pipes/highest-quality-format.pipe";
import { DatePipe } from "@angular/common";

export function extendVideo(
  vid: IVideo,
  author: IAuthor,
  categories: ICategory[]
): IVideoExtended {
  return {
    ...vid,
    authorName: author.name,
    categoryNames: categories
      .filter((c) => vid.catIds.includes(c.id))
      .map((x) => x.name),
  };
}

export function stringifyVideoForSearch(vid: IVideoExtended): string {
  return JSON.stringify([
    vid.name,
    vid.authorName,
    vid.categoryNames.join(),
    new HighestQualityFormatPipe().transform(vid.formats),
    new DatePipe("en-EN").transform(vid.releaseDate, ReleaseDateDisplayFormat),
  ]);
}

export const ReleaseDateDisplayFormat = "dd.MM.yyyy";
