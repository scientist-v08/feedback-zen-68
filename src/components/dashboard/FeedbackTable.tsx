import { Feedback } from "@/types/feedback";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StarRating } from "@/components/ui/star-rating";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface FeedbackTableProps {
  feedback: Feedback[];
}

export function FeedbackTable({ feedback }: FeedbackTableProps) {
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "Product Quality": "bg-blue-100 text-blue-800",
      "Customer Service": "bg-green-100 text-green-800", 
      "Shipping": "bg-yellow-100 text-yellow-800",
      "Website Experience": "bg-purple-100 text-purple-800",
      "Pricing": "bg-orange-100 text-orange-800",
      "Other": "bg-gray-100 text-gray-800",
    };
    return colors[category] || colors["Other"];
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Customer Feedback</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold">Customer</TableHead>
                <TableHead className="font-semibold">Rating</TableHead>
                <TableHead className="font-semibold">Category</TableHead>
                <TableHead className="font-semibold">Date</TableHead>
                <TableHead className="font-semibold">Comments</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {feedback.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-black">
                    No feedback found matching your filters.
                  </TableCell>
                </TableRow>
              ) : (
                feedback.map((item) => (
                  <TableRow key={item.id} className="hover:bg-muted/30 transition-smooth">
                    <TableCell>
                      <div>
                        <div className="font-medium text-foreground">{item.name}</div>
                        <div className="text-sm text-black">{item.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <StarRating rating={item.rating} readonly size="sm" />
                    </TableCell>
                    <TableCell>
                      <Badge className={getCategoryColor(item.category)}>
                        {item.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-black">
                      {new Date(item.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs truncate text-black">
                        {item.comments}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}