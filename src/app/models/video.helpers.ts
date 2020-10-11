import { IAuthor } from "./author.interface";
import { ICategory } from "./category.interface";
import { IVideo, IVideoExtended } from "./video.interface";

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
