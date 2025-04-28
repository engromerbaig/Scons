const ProgressBar = ({ currentIndex, length }) => {
    return (
      <div className="relative w-1/2 h-1 bg-gray-300 rounded">
        <div
          className="h-1 bg-blue rounded transition-all"
          style={{
            width: `${((currentIndex % length) + 1) / length * 100}%`,
          }}
        ></div>
      </div>
    );
  };
  
  export { ProgressBar };
  