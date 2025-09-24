import { useState, useEffect } from "react";
import { FeedbackFilters } from "@/components/dashboard/FeedbackFilters";
import { FeedbackTable } from "@/components/dashboard/FeedbackTable";
import { FeedbackStats } from "@/components/dashboard/FeedbackStats";
import { FeedbackService } from "@/services/feedbackService";
import { Feedback, FeedbackFilters as FilterType, FeedbackStats as StatsType } from "@/types/feedback";

const Dashboard = () => {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [filters, setFilters] = useState<FilterType>({});
  const [stats, setStats] = useState<StatsType>({
    totalCount: 0,
    averageRating: 0,
    ratingDistribution: {},
    categoryDistribution: {},
  });

  useEffect(() => {
    // Initialize storage with sample data
    FeedbackService.initializeStorage();
    loadData();
  }, []);

  useEffect(() => {
    loadData();
  }, [filters]);

  const loadData = () => {
    const filteredFeedback = FeedbackService.getFilteredFeedback(filters);
    const feedbackStats = FeedbackService.getFeedbackStats(filters);
    
    setFeedback(filteredFeedback);
    setStats(feedbackStats);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Customer Feedback Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Monitor and analyze customer satisfaction across all touchpoints
          </p>
        </div>
      </div>

      <FeedbackStats stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <FeedbackFilters filters={filters} onFiltersChange={setFilters} />
        </div>
        
        <div className="lg:col-span-3">
          <FeedbackTable feedback={feedback} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;