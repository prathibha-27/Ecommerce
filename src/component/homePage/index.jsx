import React from "react";

function HomePage() {
  return (
    <div className="home-page">
      {/* <img
        src="https://manipaldigital.info/wp-content/uploads/2021/06/image-optimization-for-ecommerce-use-banner.jpg"
        style={{
          width: "1820px",
          height: "500px",
        }}
      /> */}
      <img
        src="https://en.pimg.jp/071/400/534/1/71400534.jpg"
        style={{
          width: "1700px",
          height: "760px",
          objectFit: "contain",
        }}
      />
    </div>
  );
}

export default HomePage;
