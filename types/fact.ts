interface Category {
  id: string;
  title: string;
  facts: Fact[];
  icon: string;
  color: string;
  color_light: string;
  color_dark: string;
  image_url: string;
}

interface Fact {
  id: string;
  title: string;
  content: string;
  category_title: string;
  category_image_url: string;
  icon: string;
  color: string;
  user_vote: string;
  user_bookmark: boolean;
}

export type { Category, Fact };