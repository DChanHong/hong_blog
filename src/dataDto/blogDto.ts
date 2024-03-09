export interface blogListRes {
  id: number;
  title: string;
  category: string;
  content: string;
  creator: string;
  intro: string;
  tags: string[];
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  thumbnail_img_link: string;
}

//
export interface blogAttributesDto {
  title: string;
  category: string;
  content: string;
  creator: string;
  intro: string;
  tags: string[];
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  thumbnail_img_link: string;
}
// 안 씀
export interface blogListDto {
  attributes: blogAttributesDto;
  id: number;
}
