const Star = ({ rating }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        if (rating >= star) {
          return (
            <i
              key={star}
              className="ri-star-fill text-yellow-400 text-lg"
            ></i>
          );
        } else if (rating >= star - 0.5) {
          return (
            <i
              key={star}
              className="ri-star-half-fill text-yellow-400 text-lg"
            ></i>
          );
        } else {
          return (
            <i
              key={star}
              className="ri-star-line text-yellow-400 text-lg"
            ></i>
          );
        }
      })}
    </div>
  );
};

export default Star 