export const addTask = () => {
    return {
        type: "ADD_TASK",
    }
}

export const addTaskSelesai = (payload) => {
    return {
        type : "TASK_SELESAI",
        payload
    }
}

export const addTaskBelumSelesai = (payload) => {
    return {
        type : "TASK_BELUM_SELESAI",
        payload
    }
}

export const setTask = (payload) =>{
    return {
        type : "SET_TASK",
        payload
    }
}