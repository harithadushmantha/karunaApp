const initialState = {
    type:""
}

const PostOpsTypeReducer = (state = initialState, action) =>{
    switch(action.type){
        case "UPDATE_POSTOPS":
        return {...state,type:action.s}
    }

    return state;
}
export default PostOpsTypeReducer;