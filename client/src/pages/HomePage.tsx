import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <section className="h-screen grid place-content-center">
        <div className="max-w-[58rem] flex flex-col items-center mx-auto">
          <h1 className="text-center text-5xl font-bold leading-[4rem] text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-teal-400 to-green-500">
            Dive into a World of Images
            <br />
            Discover and Delight!
          </h1>
          <p className="text-center my-10 text-xl mx-auto">
            Say goodbye to cluttered galleries! With our seamless image
            exploration, view your favorite visuals in organized file galleries
            or grouped formats. Enjoy hassle-free browsing—quick, easy, and no
            account needed!
          </p>

          <Link className="btn py-7 text-lg btn-primary" to={"/explore"}>
            Explore now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
