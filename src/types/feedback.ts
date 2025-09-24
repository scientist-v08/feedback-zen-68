export interface Feedback {
  id: string;
  name: string;
  email: string;
  rating: number;
  category: string;
  comments: string;
  date: string;
  createdAt: Date;
}

export interface FeedbackFilters {
  dateFrom?: string;
  dateTo?: string;
  rating?: number;
  category?: string;
}

export interface FeedbackStats {
  totalCount: number;
  averageRating: number;
  ratingDistribution: Record<number, number>;
  categoryDistribution: Record<string, number>;
}