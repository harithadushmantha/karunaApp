
const initialState = {
    currentPage:"",
    Link:""
}
const navigationReducer = (state = initialState,action)=>{
    switch(action.type)
    {
        case "TEST":
            return {...state,currentPage:action.currentPage};
        case "LINK":
            {
                return {...state, Link:action.l};
            }
        
    }
    return state;
}
export default navigationReducer;