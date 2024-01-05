export interface IPostSection {
  title: string;
  text?: string;
  isSpoiler?: false;
  isNsfw?: false;
}

export interface IPollSection {
  options?: string[];
}

export interface ILinkSection {
    url?: string;
}

export interface IImagesVideosSection {
  file?: Express.Multer.File
}

export interface IFlair {
  flair?: string
}