'use client';

import { TrendingUp } from 'lucide-react';
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartData = [
  { month: 'January', beginners: 186, advanced: 80 },
  { month: 'February', beginners: 305, advanced: 200 },
  { month: 'March', beginners: 237, advanced: 120 },
  { month: 'April', beginners: 73, advanced: 190 },
  { month: 'May', beginners: 209, advanced: 130 },
  { month: 'June', beginners: 214, advanced: 140 },
];

const chartConfig = {
  beginners: {
    label: 'Beginner Quizzes',
    color: 'hsl(var(--chart-1))',
  },
  advanced: {
    label: 'Advanced Quizzes',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

export default function QuizPerformanceChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quiz Performance Tracker</CardTitle>
        <CardDescription>User Quiz Engagement: January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Line
              dataKey="beginners"
              type="natural"
              stroke="var(--color-beginners)"
              strokeWidth={2}
              dot={{
                fill: 'var(--color-beginners)',
              }}
              activeDot={{
                r: 6,
              }}
            />
            <Line
              dataKey="advanced"
              type="natural"
              stroke="var(--color-advanced)"
              strokeWidth={2}
              dot={{
                fill: 'var(--color-advanced)',
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Quiz Participation Trending up by 5.2% <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Comparing Beginner and Advanced Quiz Completions
        </div>
      </CardFooter>
    </Card>
  );
}
