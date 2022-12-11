import { ListerProject } from "../../models/listers";

export default function EvalProjects(payload: ListerProject) {
  const val = {
    ProjectName: payload.name,
    ProjectType: payload.projectType,
    ProjectDescription: payload.description,
    CO2Tonnes: payload.cO2Tonnes,
    ExternalLinks: payload.externalLink.name,
    Tags:
      payload.tags && payload.tags.length
        ? payload.tags[0].name?.split(",")
        : [],
  };
  return val;
}
