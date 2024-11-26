'use client';

import { TrendingUp } from 'lucide-react';
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts';

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
  { skill: 'Mathematics', proficiency: 186 },
  { skill: 'Science', proficiency: 305 },
  { skill: 'History', proficiency: 237 },
  { skill: 'Language', proficiency: 203 },
  { skill: 'Geography', proficiency: 209 },
  { skill: 'Critical Thinking', proficiency: 214 },
];

const chartConfig = {
  proficiency: {
    label: 'Skill Level',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

export default function QuizSkillsRadarChart() {
  return (
    <Card>
      <CardHeader className="items-center pb-4">
        <CardTitle>Quiz Skills Performance</CardTitle>
        <CardDescription>User Skill Proficiency Across Different Domains</CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[365px]">
          <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <PolarGrid gridType="circle" radialLines={false} />
            <PolarAngleAxis dataKey="skill" />
            <Radar
              dataKey="proficiency"
              fill="var(--color-proficiency)"
              fillOpacity={0.6}
              dot={{
                r: 4,
                fillOpacity: 1,
              }}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Skills Performance Improving by 5.2% <TrendingUp className="h-4 w-4" />
        </div>
        <div className="flex items-center gap-2 leading-none text-muted-foreground">
          Overall Skill Assessment
        </div>
      </CardFooter>
    </Card>
  );
}
