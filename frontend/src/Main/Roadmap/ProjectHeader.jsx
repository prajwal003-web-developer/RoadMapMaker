import React from "react";

const ProjectHeader = ({ project }) => {
  if (!project ) return null; 

  return (
    <div className=" shadow text-xl  font-semibold text-blue-400">
    {project?.name}
    </div>
  );
};

export default ProjectHeader;
