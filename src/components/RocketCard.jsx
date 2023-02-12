import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

function makeUpperCase(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// props name, image, speed, health, fuel, rating
function RocketCard({ name, image, speed, health, fuel, rating }) {
  return (
    <div className="hv h-screen w-screen flex  justify-center align-center ">
      <div>
        <div className="justify-center align-center text-center mb-20 mt-20 bg-gradient-to-br from-green-300 via-blue-500 to-purple-600 text-white p-4 text-2xl font-bold rounded-lg">
          Your Rocket's current state!
        </div>
        <div className=" flex flex-col items-center justify-items-center ">
          <div className="block max-w-lg w-96 h-auto  p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {makeUpperCase(name)}
            </h5>
            <div className="flex flex-row min-h-40 m-5 justify-center items-center h-16 mt-20">
              <img className="h-40" src={`${image}`}></img>
            </div>

            <div className="grid grid-cols-1 divide-y mt-24">
              <p className="text-gray-700 dark:text-gray-400 text-lg">
                Speed: {speed}
              </p>
              <p className="text-gray-700 dark:text-gray-400 text-lg">
                Health: {health}
              </p>
              <p className="text-gray-700 dark:text-gray-400 text-lg">
                Fuel: {fuel}
              </p>
              <p className="text-gray-700 dark:text-gray-400 text-lg">
                Overall Rating: {rating}
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            className="mt-40 bg-blue-500 text-white font-bold py-2 px-4 rounded "
            onClick={() => (window.location.href = "/galaxy-quest/game")}
          >
            Start Game!
          </button>
        </div>
      </div>
    </div>
  );
}

export { RocketCard };

// onclick of card, set local storage of retrievedRocket to be the prop values
