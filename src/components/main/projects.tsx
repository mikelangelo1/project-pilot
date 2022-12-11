/* eslint-disable no-unused-vars */
import { useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import { useUser } from "../../context/userCtx";
import { ProjectsUrl, ProjectUrl } from "../../lib/common/endpoints";
import EvalProjects from "../../lib/helperFunctions/evalProject";
import { fetcher } from "../../lib/helperFunctions/fetcher";
import { ListerProject } from "../../models/listers";
import Project from "./project";
import ProjectEntry from "./projectEntry";

// import icons needed for the logic

interface ProjectsPropType {
  // eslint-disable-next-line no-unused-vars
  status: "active" | "pending" | "draft" | "rejected";
}

const Projects = ({ status }: ProjectsPropType) => {
  // const data = {}
  const { data } = useSWR(ProjectsUrl);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState<any>(null);
  const [projects, setProjects] = useState<ListerProject[]>([]);

  useEffect(() => {
    if (data && data.data) {
      setProjects(data.data);
    }
  }, [data]);

  const fetchProject = (id: number, project: ListerProject) => {
    setInitialValues(EvalProjects(project));
    setIsModalVisible(true);
    // return;
    // fetcher(`${ProjectUrl}/${id}`)
    //   .then((res) => {
    //     if (!res.successful) return;
    //     setInitialValues(() => EvalProjects(res.data));
    //     setIsModalVisible(true);
    //   })
    //   .catch(() => {
    //     setInitialValues(EvalProjects(project));
    //     setIsModalVisible(true);
    //   });
  };

  const onSelectProject = (project: ListerProject) => {
    if (status === "draft") {
      fetchProject(project.projectId, project);
    }
    // console.warn(project);
  };

  const getProject: ListerProject[] = useMemo(() => {
    if (status === "active") {
      return projects.filter((project) => project.approved);
    }
    if (status === "pending") {
      return projects.filter(
        (project) => !project.archived && !project.drafted && !project.approved
      );
    }
    if (status === "draft") {
      return projects.filter((project) => project.drafted);
    }
    return projects.filter((project) => project.archived);
  }, [projects, status]);

  return (
    <>
      <ProjectEntry
        initialValues={initialValues}
        setIsModalVisible={setIsModalVisible}
        isModalVisible={isModalVisible}
      />

      <div className="flex gap-2 flex-wrap">
        {!!getProject.length &&
          getProject.map((proj) => (
            <Project
              status={status}
              key={proj.projectId}
              project={proj}
              selectProject={onSelectProject}
            />
          ))}

        {!getProject.length && (
          <p className="text-center m-auto mt-10 opacity-80 text-base">
            No projects available &#x1F61E;
          </p>
        )}
      </div>
    </>
  );
};
export default Projects;
