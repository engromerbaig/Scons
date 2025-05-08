import React from "react";
import Button from "../../components/Button/Button";

const LoadMoreControls = ({
  showLoadMore,
  showShowLess,
  handleLoadMore,
  handleShowLess,
  buttonContainerRef,
}) => {
  return (
    <>
      {(showLoadMore || showShowLess) && (
        <div
          ref={buttonContainerRef}
          className="flex flex-col md:flex-row gap-4 items-center justify-center pb-20"
        >
          {showLoadMore && (
            <Button
              name="Load More"
              bgColor="bg-black"
              textColor="white"
              className="px-4 py-2"
              fontSize="text-sm"
              onClick={handleLoadMore}
            />
          )}
          {showShowLess && (
            <Button
              name="Show Less"
              bgColor="bg-black"
              textColor="white"
              className="px-4 py-2"
              fontSize="text-sm"
              onClick={handleShowLess}
            />
          )}
        </div>
      )}
    </>
  );
};

export default LoadMoreControls;