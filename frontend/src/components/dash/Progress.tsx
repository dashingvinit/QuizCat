import LineChart from './demo-line';
import RadarChart from './demo-radar';

function Progress() {
  return (
    <div className="h-screen p-4 items-center">
      <h2 className="font-bold text-2xl mb-4">Progress visualization</h2>
      <div className="flex w-full gap-4 ">
        <div className="w-1/2">
          <LineChart />
        </div>
        <div className="w-1/2">
          <RadarChart />
        </div>
      </div>
    </div>
  );
}

export default Progress;
