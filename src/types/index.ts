export interface PostSingle {
  category: string;
  tag: string[];
  date: string;
  name: string;
  postImg: string;
  isTop?: boolean;
  cover_url: string;
  post_url: string;
}
export interface TagSingle {
  posts: PostSingle[];
  num: number;
  name: string;
}
export interface CategorySingle {
  posts: PostSingle[];
  name: string;
  num: number;
}
export interface ArchiveMonthSingle {
  month: string;
  posts: string[];
}
export interface ArchiveSingle {
  monthInfos: ArchiveMonthSingle[];
  year: string;
}
