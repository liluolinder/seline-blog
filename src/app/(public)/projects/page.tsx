import { getAllProjects } from '@/lib/projects'
import { ProjectsClient } from './ProjectsClient'

export default function ProjectsPage() {
  const projects = getAllProjects()
  return <ProjectsClient projects={projects} />
}
