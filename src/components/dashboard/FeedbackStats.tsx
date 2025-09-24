import { FeedbackStats as StatsType } from "@/types/feedback";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Star, MessageSquare, TrendingUp } from "lucide-react";

interface FeedbackStatsProps {
  stats: StatsType;
}

const RATING_COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#10b981'];
const CATEGORY_COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b', '#6b7280'];

export function FeedbackStats({ stats }: FeedbackStatsProps) {
  const ratingData = Object.entries(stats.ratingDistribution)
    .map(([rating, count]) => ({
      rating: `${rating} Star${rating !== '1' ? 's' : ''}`,
      count,
      fill: RATING_COLORS[parseInt(rating) - 1],
    }))
    .sort((a, b) => parseInt(b.rating) - parseInt(a.rating));

  const categoryData = Object.entries(stats.categoryDistribution)
    .map(([category, count], index) => ({
      category,
      count,
      fill: CATEGORY_COLORS[index % CATEGORY_COLORS.length],
    }))
    .sort((a, b) => b.count - a.count);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      {/* Summary Cards */}
      <Card className="shadow-card border-l-4 border-l-primary">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Feedback</p>
              <p className="text-3xl font-bold text-primary">{stats.totalCount}</p>
            </div>
            <MessageSquare className="w-8 h-8 text-primary" />
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-card border-l-4 border-l-success">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Average Rating</p>
              <div className="flex items-center gap-2">
                <p className="text-3xl font-bold text-success">{stats.averageRating}</p>
                <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              </div>
            </div>
            <TrendingUp className="w-8 h-8 text-success" />
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-card border-l-4 border-l-accent">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Top Category</p>
              <p className="text-lg font-bold text-accent">
                {categoryData[0]?.category || 'N/A'}
              </p>
              <p className="text-sm text-muted-foreground">
                {categoryData[0]?.count || 0} submissions
              </p>
            </div>
            <div className="w-8 h-8 bg-gradient-accent rounded-full flex items-center justify-center">
              <Star className="w-4 h-4 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rating Distribution Chart */}
      <Card className="md:col-span-2 shadow-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Rating Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ratingData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="rating" 
                className="text-sm text-muted-foreground"
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                className="text-sm text-muted-foreground"
                tick={{ fontSize: 12 }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: 'var(--radius)',
                  boxShadow: 'var(--shadow-card)',
                }}
              />
              <Bar dataKey="count" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Category Distribution Chart */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="count"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={({ category, count }) => `${category}: ${count}`}
                labelLine={false}
                fontSize={10}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: 'var(--radius)',
                  boxShadow: 'var(--shadow-card)',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}