import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

function makeUpperCase(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// props name, image, speed, health, fuel, rating
function RocketCard({ name, image, speed, health, fuel, rating }) {
  return (
    <div className="hv h-screen">
      <div className="mb-20 mt-20 bg-gradient-to-br from-green-300 via-blue-500 to-purple-600 text-white p-4 text-2xl font-bold rounded-lg">
        Select your rocket!
      </div>
      <div className="flex flex-col items-center w-64 h-96 ">
        <div class="block max-w-lg w-96 h-auto  p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {makeUpperCase(name)}
          </h5>
          <div className="flex flex-row min-h-40 m-5 justify-center items-center h-16 mt-20">
            <img className="h-40" src={`rockets/single/${image}.png`}></img>
          </div>

          <div class="grid grid-cols-1 divide-y mt-24">
            <p class="text-gray-700 dark:text-gray-400 text-lg">
              Speed: {speed}
            </p>
            <p class="text-gray-700 dark:text-gray-400 text-lg">
              Health: {health}
            </p>
            <p class="text-gray-700 dark:text-gray-400 text-lg">Fuel: {fuel}</p>
            <p class="text-gray-700 dark:text-gray-400 text-lg">
              Overall Rating: {rating}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export { RocketCard };

// onclick of card, set local storage of retrievedRocket to be the prop values
