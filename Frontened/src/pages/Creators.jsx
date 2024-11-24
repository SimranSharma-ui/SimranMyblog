import axios from "axios";
import React, { useEffect, useState } from "react";

function Creators() {
  const [creators, setCreators] = useState([]);
  console.log(creators);
  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/user/api/Alladmins",
          {
            withCredentials: true,
          }
        );
        setCreators(data.admins);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCreators();
  }, []);

  return (
    <div className="flex flex-wrap justify-center items-center my-16 bg-gray-50">
      {creators.map((creator) => (
        <div
          key={creator._id}
          className="max-w-xs w-full m-4 p-4 bg-white rounded-xl shadow-xl transform transition-all hover:scale-105 hover:shadow-2xl"
        >
          <div className="relative">
            <img
              src={creator.photo.url}
              alt="avatar"
              className="w-full h-48 object-cover rounded-lg"
            />
            <div className="absolute inset-x-0 bottom-0 transform translate-y-1/2">
              <img
                src={creator.photo.url}
                alt="avatar"
                className="w-20 h-20 rounded-full mx-auto border-4 border-white shadow-lg"
              />
            </div>
          </div>
          <div className="text-center mt-8">
            <h2 className="text-2xl font-semibold text-gray-800">
              {creator.name}
            </h2>
            <p className="text-gray-500 text-sm mt-2">{creator.email}</p>
            <p className="text-gray-500 text-sm mt-1">{creator.phone}</p>
            <p className="text-gray-500 text-sm mt-1">{creator.role}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Creators;
