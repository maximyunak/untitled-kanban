import type {ITaskWithBoardId} from "~/types/kanban";
import {useSortOptions} from "~/shared/sort-options";

export const useTasks = () => {
  type TaskGroup = {
    tasks: ITaskWithBoardId[];
    totalPages: number;
    perPage: number;
    totalTasks: number;
    currentPage: number
  }
  const data = ref<{
    completed: TaskGroup
    unCompleted: TaskGroup
  } | null>(null)
  const {$api} = useNuxtApp()
  const sortOptions = useSortOptions()
  const sortData = reactive<{
    completed: typeof sortOptions[number],
    unCompleted: typeof sortOptions[number]
  }>({
    completed: sortOptions[0],
    unCompleted: sortOptions[0],
  })

  const completedPage = ref(1)
  const unCompletedPage = ref(1)

  const comparator = (a: ITaskWithBoardId, b: ITaskWithBoardId, on: 'deadline' | 'createdAt', direction: "asc" | "desc"): number => {
    const timeA = a[on] ? new Date(a[on]).getTime() : 0;
    const timeB = b[on] ? new Date(b[on]).getTime() : 0;

    return direction === "asc" ?
      timeA - timeB
      : timeB - timeA
  }

  const completedTasks = computed<ITaskWithBoardId[]>(() => {
    const tasks = data.value?.completed.tasks ?? []

    switch (sortData.completed.value) {
      case "deadline_asc":
        return [...tasks].sort((a: ITaskWithBoardId, b: ITaskWithBoardId) => comparator(a, b, "deadline", "asc"))
      case "deadline_desc":
        return [...tasks].sort((a: ITaskWithBoardId, b: ITaskWithBoardId) => comparator(a, b, "deadline", "desc"))
      case "created_asc":
        return [...tasks].sort((a: ITaskWithBoardId, b: ITaskWithBoardId) => comparator(a, b, "createdAt", 'asc'))
      case "created_desc":
        return [...tasks].sort((a: ITaskWithBoardId, b: ITaskWithBoardId) => comparator(a, b, "createdAt", 'desc'))
      default:
        return tasks
    }
  })

  const unCompletedTasks = computed<ITaskWithBoardId[]>(() => {
    const tasks = data.value?.unCompleted.tasks ?? []

    switch (sortData.unCompleted.value) {
      case "deadline_asc":
        return [...tasks].sort((a: ITaskWithBoardId, b: ITaskWithBoardId) => comparator(a, b, "deadline", "asc"))
      case "deadline_desc":
        return [...tasks].sort((a: ITaskWithBoardId, b: ITaskWithBoardId) => comparator(a, b, "deadline", "desc"))
      case "created_asc":
        return [...tasks].sort((a: ITaskWithBoardId, b: ITaskWithBoardId) => comparator(a, b, "createdAt", 'asc'))
      case "created_desc":
        return [...tasks].sort((a: ITaskWithBoardId, b: ITaskWithBoardId) => comparator(a, b, "createdAt", 'desc'))
      default:
        return tasks
    }
  })

  const fetchData = async () => {
    data.value = {
      completed: await $api<TaskGroup>(
        `/tasks/my/completed?page=${completedPage.value}`
      ),
      unCompleted: await $api<TaskGroup>(
        `/tasks/my/uncompleted?page=${unCompletedPage.value}`
      )
    }
  }

  return {
    data,
    fetchData,
    completedTasks,
    unCompletedTasks,
    sortData,
    completedPage,
    unCompletedPage
  }
}