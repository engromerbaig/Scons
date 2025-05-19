import Heading from "../../components/Heading/Heading";
import { theme } from "../../theme";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import BodyText from "../../components/BodyText/BodyText";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const Deliverables = ({ deliverables , heading }) => {
  // Generate equal percentages for each deliverable
  const dataCount = deliverables.length;
  const percentage = dataCount > 0 ? 100 / dataCount : 0;

  // Define colors for each segment
  const colors = [
    "#28ed70", // neon
    "#89CFF0", // updated charcoal
    "#000000", // black
    "#ECE9DF", // beige
    "#B8C3C4", // heroBlue
  ];

  // Chart data
  const chartData = {
    labels: deliverables,
    datasets: [
      {
        data: deliverables.map(() => percentage),
        backgroundColor: deliverables.map((_, index) => colors[index % colors.length]),
        borderWidth: 0,
        cutout: "60%", // Makes it a donut chart
      },
    ],
  };

  // Chart options
  const chartOptions = {
    plugins: {
      legend: {
        position: "bottom", // Default position for smaller screens
        align: "start", // Left-align legend text
        labels: {
          font: {
            size: 14,
            family: "Manrope",
          },
          color: "#000",
          padding: 20, // Vertical gap between legend items
          boxWidth: 20,
          // Enable text wrapping for long labels
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
        // For xl and above, move legend to right
        position: window.innerWidth >= 1280 ? "right" : "bottom",
        maxWidth: window.innerWidth >= 1280 ? 200 : undefined, // Limit legend width on xl
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
        bottom: 40, // Increase vertical gap between chart and legend
        right: window.innerWidth >= 1280 ? 220 : 0, // Space for legend on right for xl
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
    //   text="We deliver results that matter. Our focus is on outcomes, not just outputs. We ensure that every project we undertake is aligned with your goals and delivers tangible value."
text={`Throughout the ${heading}'s project, our team successfully achieved the following key deliverables and impactful outcomes:`}
      className="max-w-3xl"
              centered={false}

      />


        </div>


      <div className="w-full max-w-md mx-auto xl:flex xl:items-center xl:max-w-4xl xl:gap-8">
        <div className="relative h-96 xl:h-[600px] xl:flex-1">
          <Doughnut data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Deliverables;