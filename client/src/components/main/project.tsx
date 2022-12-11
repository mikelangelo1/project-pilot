/* eslint-disable no-unused-vars */
import { ListerProject } from "../../models/listers";

// import icons needed for the logic
type Status = "active" | "pending" | "draft" | "rejected";

interface ProjectPropType {
  // eslint-disable-next-line no-unused-vars
  project: ListerProject;
  status: Status;
  selectProject: (param: ListerProject) => void;
}

const Project = ({ status, project, selectProject }: ProjectPropType) => (
  <div className="border rounded border-primary-lower p-4 flex flex-col gap-y-4 w-[300px] min-h-[200px] justify-center">
    <h2 className="text-tertiary-high text-sm font-800 font-header">
      {project.name}
    </h2>
    <p className="my-2">{project.description[0].details}</p>
    <button
      className="bg-tertiary-low px-4 py-1 pointer"
      type="button"
      onClick={() => selectProject(project)}
    >
      {status === "draft" && <span>Complete Project</span>}
      {status !== "draft" && <span>View Project</span>}
    </button>
  </div>
);
export default Project;
