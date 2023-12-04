"use client"

import useProjectCounter from "util/useProjectCounter"

type ProjectViewCheckType = {
  id: string
}

const ProjectViewCheck = ({
  id
}: ProjectViewCheckType) => {
  const { add } = useProjectCounter()
  add(id)

  return null
}

export default ProjectViewCheck