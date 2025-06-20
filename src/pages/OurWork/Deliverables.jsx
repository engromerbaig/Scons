import Heading from "../../components/Heading/Heading";
import { theme } from "../../theme";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import BodyText from "../../components/BodyText/BodyText";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const Deliverables = ({ deliverables, heading, status }) => {
  // Generate equal percentages for each deliverable
  const dataCount = deliverables.length;
  const percentage = dataCount > 0 ? 100 / dataCount : 0;

  // Define colors for each segment
const colors = [
  "#00C5FF", // bright cyan/blue (main theme)
  "#28ed70", // neon green
  "#000000", // black
  "#FF6F61", // coral red
  "#FFD700", // gold/yellow
  "#6A5ACD", // slate blue
  "#FF00FF", // magenta (high contrast with green/blue)
  "#00FFAA", // aqua green (pops against red/yellow/black)
  "#FF4500", // orange-red (deep, contrasts with blue/green)
  "#8A2BE2", // blue violet (bold, contrasts well with yellow/coral)
];


  // Chart data
  const chartData = {
    labels: deliverables,
    datasets: [
      {
        data: deliverables.map(() => percentage),
        backgroundColor: deliverables.map((_, index) => colors[index % colors.length]),
        borderWidth: 2,
        borderColor: "#fff",
        cutout: "60%",
        spacing: 20,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    plugins: {
      legend: {
        position: window.innerWidth >= 1280 ? "right" : "bottom",
        align: "start",
        labels: {
          font: {
            size: 10,
            family: "Manrope",
          },
          color: "#000",
          padding: 15,
          boxWidth: 30,
          usePointStyle: false,
          generateLabels: (chart) => {
            return chart.data.labels.map((label, index) => ({
              text: label,
              fillStyle: chart.data.datasets[0].backgroundColor[index],
              hidden: false,
              index,
              lineWidth: 0,
            }));
          },
        },
        maxWidth: window.innerWidth >= 1280 ? 200 : undefined,
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context) => {
            const label = context.label || "";
            const firstTwoWords = label.split(" ").slice(0, 2).join(" ");
            return `${firstTwoWords}`;
          },
        },
      },
    },
    layout: {
      padding: {
        bottom: 40,
        right: window.innerWidth >= 1280 ? 220 : 0,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div
      className={`flex flex-col gap-4 ${theme.layoutPages.paddingBottom} ${theme.layoutPages.paddingHorizontal}`}
    >
      <div className="flex flex-col pb-10">
        <Heading
          text="Deliverables & Outcomes"
          centered={false}
          color="text-black"
          lineHeight="leading-none"
        />
        <BodyText
          text={`Throughout the ${heading} project, our team ${
            status === "Completed" ? "successfully achieved" : "targets to successfully achieve"
          } the following key deliverables and impactful outcomes:`}
          className="max-w-3xl"
          centered={false}
        />
      </div>

      <div className="w-full max-w-md mx-auto xl:flex xl:items-start xl:max-w-4xl xl:gap-8">
        <div className="relative h-[450px] xl:h-[600px] xl:flex-1">
          <Doughnut data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Deliverables;
