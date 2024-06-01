export interface BlogEntity {
  Idx: number;
  title: string | null;
  img_src: string | null;
  created_at: Date | null;
  tags: string | null;
  detail_link: string | null;
  intro: string | null;
}
