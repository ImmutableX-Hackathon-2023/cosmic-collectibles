import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

const upgrades = {
  Speed: "Increase your speed to evade meteors.",
  Health: "Increase your ability to battle meteors!",
  Fuel: "Stay in space for longer! Collect more stars!",
};
// props name, image, speed, health, fuel, rating
export default function Upgrade() {
  const rocketJSON = localStorage.getItem("retrievedRocket");
  const rocket = JSON.parse(rocketJSON);

  const allRocketJSON = localStorage.getItem("allRocket");
  const allRocket = allRocketJSON;
  const [upgrade, setUpgrade] = useState(
    "Increase your speed to evade meteors."
  );
  console.log(allRocket);

  async function upgradeFunction(toUpgrade) {
    try {
      const upgrade = await fetch(`http://localhost:4000/push`, {
        method: "POST",
        mode: "cors",
        headers: {
          // wallet_address: localStorage.getItem("wallet_address"),
          wallet_address: "0x3017D0C5E6B5fA7cEBF9F9aF40750025982a5B05",
        },
        body: {
          id: "",
          name,
          description,
          image_url,
          health,
          fuel,
          speed,
          rating,
        },
      });
      const rocketjson = await upgrade.json();
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  return (
    <div className="hv h-screen w-screen flex  justify-center align-center ">
      <div>
        <div className="w-[600px] justify-center align-center text-center mb-20 mt-20 bg-gradient-to-br from-green-300 via-blue-500 to-purple-600 text-white p-4 text-2xl font-bold rounded-lg">
          Hooray! You can upgrade your rocket!
        </div>
        {console.log(localStorage.getItem("wallet_address"))}
        <div className=" flex flex-col items-center justify-items-center ">
          <div className="block max-w-lg w-96 h-auto  p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
            {console.log(localStorage.getItem("retrievedRocket").name)}
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Name: {rocket.name}
            </h5>
            <div className="flex flex-row min-h-40 m-5 justify-center items-center h-16 mt-20">
              <img
                className="h-40 jumpy"
                src={`rockets/single/${rocket.name}.png`}
              ></img>
            </div>

            <div className="grid grid-cols-1 divide-y mt-24">
              <p className="text-gray-700 dark:text-gray-400 text-lg">
                Speed: {rocket.speed}
              </p>
              <p className="text-gray-700 dark:text-gray-400 text-lg">
                Health: {rocket.health}
              </p>
              <p className="text-gray-700 dark:text-gray-400 text-lg">
                Fuel: {rocket.fuel}
              </p>
              <p className="text-gray-700 dark:text-gray-400 text-lg">
                Overall Rating: {rocket.rating}
              </p>
            </div>
          </div>
        </div>
        <>
          <div className="flex flex-row mt-10 items-center text-white font-bold">
            <select
              className="scale-[100%]  bg-blue-500 text-white font-bold py-2 px-4 rounded"
              value={upgrade}
              onChange={(e) => setUpgrade(e.target.value)}
            >
              {Object.entries(upgrades).map((c) => (
                <option value={c[1]}>{c[0]}</option>
              ))}
            </select>
            <h2 className="px-2">{`Selected Upgrade: ${upgrade}`}</h2>
          </div>
        </>
        <div className="flex justify-center">
          <button
            className="scale-[165%] mt-10 bg-blue-500 text-white font-bold py-2 px-4 rounded "
            onClick={() => upgradeFunction()}
          >
            Mint the upgrade!
          </button>
        </div>
      </div>
    </div>
  );
}

// onclick of card, set local storage of retrievedRocket to be the prop values
