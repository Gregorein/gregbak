type ProjectProps = {
  params: {
    project: string
  }
}

const Project = ({
  params
}: ProjectProps) => (
  <div>
    here be Project::{params.project}
  </div>
)

export default Project
