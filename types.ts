export interface InfluentialPerson {
  id: string;
  name: string;
  description: string;
  yearBorn: number;
  field: string;
  occupation: string;
  profilePic: string;
  visible: boolean;
  recommendationsCount: number;
}

export interface Book {
  id: number;
  title: string;
  publishedYear: number;
  rating: number;
  numberOfRecommendations: string;
  description: string;
  authorName: string;
  genreName: string;
}
