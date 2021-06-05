
const initialState ={
    allPatients :null,
    allOperations:null,
    allIllnesses:null,
    patientsCount:0,
    operationsCount:0,
    paginatePatients:null
};

const allPatientsReducer = (state = initialState,action) => {
    switch(action.type)
    {
        case "GET_PATIENTS":

            return {...state, allPatients:action.p,patientsCount:action.c};
         
        case "GET_OPERATIONS":
            return {...state, allOperations:action.o,operationsCount:action.c};
        case "GET_ILLNESSES":
            return {...state, allIllnesses:action.i};    
        case "GET_DATA":
            
            return {...state,paginatePatients:action.patientss}
    }
    return state;
}

export default allPatientsReducer;