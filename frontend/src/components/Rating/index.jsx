import React from "react";
export default function Rating({ avg_rating, class_name }) {
  return (
    <div class={class_name}>
      {[1, 2, 3, 4, 5]
        .filter((i) => i <= avg_rating)
        .map((value) => (
          <i key={value} class="fa fa-star"></i>
        ))}
      {[1, 2, 3, 4, 5]
        .filter((i) => i > avg_rating)
        .map((value) => (
          <i key={value} class="fa fa-star-o"></i>
        ))}
    </div>
  );
}
