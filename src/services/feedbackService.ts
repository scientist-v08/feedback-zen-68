import { Feedback, FeedbackFilters, FeedbackStats } from '@/types/feedback';

const STORAGE_KEY = 'customer-feedback';

// Sample data for initial load
const sampleFeedback: Feedback[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    rating: 5,
    category: 'Product Quality',
    comments: 'Excellent product quality and fast delivery. Very satisfied with my purchase!',
    date: '2024-01-15',
    createdAt: new Date('2024-01-15T10:30:00Z'),
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'mike.chen@email.com',
    rating: 4,
    category: 'Customer Service',
    comments: 'Good customer service, though response time could be improved.',
    date: '2024-01-12',
    createdAt: new Date('2024-01-12T14:20:00Z'),
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily.r@email.com',
    rating: 3,
    category: 'Shipping',
    comments: 'Package arrived on time but packaging could be better.',
    date: '2024-01-10',
    createdAt: new Date('2024-01-10T16:45:00Z'),
  },
  {
    id: '4',
    name: 'David Smith',
    email: 'david.smith@email.com',
    rating: 5,
    category: 'Product Quality',
    comments: 'Outstanding quality and excellent value for money. Will definitely order again!',
    date: '2024-01-08',
    createdAt: new Date('2024-01-08T09:15:00Z'),
  },
  {
    id: '5',
    name: 'Lisa Wang',
    email: 'lisa.wang@email.com',
    rating: 2,
    category: 'Website Experience',
    comments: 'Website was confusing to navigate. Checkout process needs improvement.',
    date: '2024-01-05',
    createdAt: new Date('2024-01-05T11:30:00Z'),
  },
];

export class FeedbackService {
  static initializeStorage(): void {
    const existing = localStorage.getItem(STORAGE_KEY);
    if (!existing) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleFeedback));
    }
  }

  static getAllFeedback(): Feedback[] {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      this.initializeStorage();
      return sampleFeedback;
    }
    
    const feedback = JSON.parse(data);
    return feedback.map((item: any) => ({
      ...item,
      createdAt: new Date(item.createdAt),
    }));
  }

  static getFilteredFeedback(filters: FeedbackFilters): Feedback[] {
    const allFeedback = this.getAllFeedback();
    
    return allFeedback.filter(feedback => {
      if (filters.dateFrom && feedback.date < filters.dateFrom) return false;
      if (filters.dateTo && feedback.date > filters.dateTo) return false;
      if (filters.rating && feedback.rating !== filters.rating) return false;
      if (filters.category && feedback.category !== filters.category) return false;
      return true;
    });
  }

  static addFeedback(feedback: Omit<Feedback, 'id' | 'createdAt'>): Feedback {
    const allFeedback = this.getAllFeedback();
    const newFeedback: Feedback = {
      ...feedback,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    
    const updatedFeedback = [newFeedback, ...allFeedback];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFeedback));
    
    return newFeedback;
  }

  static getFeedbackStats(filters?: FeedbackFilters): FeedbackStats {
    const feedback = filters ? this.getFilteredFeedback(filters) : this.getAllFeedback();
    
    const totalCount = feedback.length;
    const averageRating = totalCount > 0 
      ? feedback.reduce((sum, f) => sum + f.rating, 0) / totalCount 
      : 0;
    
    const ratingDistribution = feedback.reduce((acc, f) => {
      acc[f.rating] = (acc[f.rating] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);
    
    const categoryDistribution = feedback.reduce((acc, f) => {
      acc[f.category] = (acc[f.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return {
      totalCount,
      averageRating: Math.round(averageRating * 10) / 10,
      ratingDistribution,
      categoryDistribution,
    };
  }

  static getCategories(): string[] {
    return ['Product Quality', 'Customer Service', 'Shipping', 'Website Experience', 'Pricing', 'Other'];
  }
}