const PROJECT_COUNT = "viewedProjects"

const useProjectCounter = () => {
  const add = (id: string) => {
    if (!localStorage.getItem(PROJECT_COUNT)) {
      localStorage.setItem(PROJECT_COUNT, id)

      return
    }

    const list = localStorage.getItem(PROJECT_COUNT)

    if (!list.includes(id)) {
      localStorage.setItem(PROJECT_COUNT, `${list}|${id}`)
    }
  }

  const count = (defaultValue?: number) => {
    if (!localStorage.getItem(PROJECT_COUNT)) {

      return String(defaultValue)
    }
    
    const list = localStorage.getItem(PROJECT_COUNT).split("|")

    return String(defaultValue - list.length)
  }

  return {
    add,
    count
  }
}

export default useProjectCounter
