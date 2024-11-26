import { useUser } from '@clerk/clerk-react';
import { Trophy, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

function UserDashboard() {
  const { user } = useUser();

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Dashboard</CardTitle>
        <Trophy className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4 mb-4">
          <div>
            <p className="text-sm text-muted-foreground">Welcome back,</p>
            <p className="text-2xl font-bold">{user?.fullName || 'Learner'}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Activity className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-sm font-medium">Adaptive Score</h3>
            </div>
            <p className="text-2xl font-bold">720</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Trophy className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-sm font-medium">Progress</h3>
            </div>
            <p className="text-2xl font-bold">85%</p>
          </div>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <div className="mt-8 w-full bg-secondary text-secondary-foreground hover:bg-secondary/80 px-4 py-2 rounded-md text-center text-sm cursor-pointer">
              View Detailed Progress
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Detailed Progress</DialogTitle>
            </DialogHeader>
            {/* Add more detailed progress information here */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Skill Breakdown</h4>
                <ul className="space-y-1 text-sm">
                  <li>Mathematics: 85%</li>
                  <li>Science: 78%</li>
                  <li>History: 92%</li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Recent Achievements</h4>
                <ul className="space-y-1 text-sm">
                  <li>🏆 Advanced Math Mastery</li>
                  <li>🌟 3 Consecutive Quizzes Completed</li>
                </ul>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}

export default UserDashboard;
