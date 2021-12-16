const todoReducer = (
    prevState = {
        menu : ['Belum Selesai', 'Selesai'],
        taskList : [],
        taskBelumSelesai : [],
        taskSelesai : []
    }, action) => {
    switch (action.type) {
        case "SET_TASK" :
            let newTaskList = [...action.payload];
            return {
                ...prevState,
                taskList : newTaskList,
            };
        case "TASK_SELESAI" : {
            let newTaskSelesai = [...action.payload];
            return {
                ...prevState,
                taskSelesai: newTaskSelesai,
            }
        }
        case "TASK_BELUM_SELESAI" : {
            let newTaskBlmSelesai = [...action.payload];
            return {
                ...prevState,
                taskBelumSelesai: newTaskBlmSelesai,
            }
        }
        default:
            return {
                ...prevState,
            };
    }
}

export default todoReducer;