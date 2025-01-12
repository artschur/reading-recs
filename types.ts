export interface InfluentialPerson {
  id: number;
  name: string;
  description: string | null;
  yearBorn: number | null;
  field: string | null;
  occupation: string;
  profilePic: string | null;
  visible: boolean;
  recommendationsCount: number;
}

export interface Book {
  id: number;
  title: string;
  publishedYear: number;
  rating: number;
  numberOfRecommendations: number;
  description: string | null;
  authorName: string;
  genreName: string;
}

export interface PartialBooks extends Omit<Book, "genreName"> {}
