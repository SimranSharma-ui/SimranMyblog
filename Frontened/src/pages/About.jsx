import React from "react";

function About() {
  return (
    <div className="container mx-auto my-12 p-4 space-y-9">
      <h1 className="text-2xl font-bold mb-6">About</h1>
      <p>
        This is{" "}
        <strong className="text-blue-800 font-semibold hover:scale-105 duration-500">
          Simran Sharma
        </strong>{" "}
        is a passionate trainee developer specializing in the MERN stack
        (MongoDB, Express.js, React, and Node.js). Eager to expand her skills,
        she is dedicated to learning modern web development technologies and
        creating dynamic, user-friendly applications. As she gains hands-on
        experience in building full-stack solutions, Simran is focused on
        mastering both frontend and backend development, with a keen interest in
        building efficient, scalable web applications. Her enthusiasm for coding
        and problem-solving drives her to continuously improve and contribute to
        innovative projects.
      </p>
      <h2 className="font-semibold text-blue-800 text-xl">
        Technical Expertise:
      </h2>
      <p>
        Front-End: Highly proficient in modern JavaScript frameworks,
        particularly React.js, with a strong ability to build dynamic and
        interactive user interfaces. Skilled in HTML5, CSS3, and responsive
        design principles, ensuring seamless and visually appealing experiences
        across various devices and screen sizes. Back-End: Well-versed in
        server-side development with Node.js and Express.js, creating robust,
        scalable applications. Experienced in database management, with
        expertise in both SQL (MySQL) and NoSQL (MongoDB) databases, enabling
        efficient data storage, retrieval, and management for high-performance
        applications.
      </p>
    </div>
  );
}

export default About;
