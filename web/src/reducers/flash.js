import { ADD_FLASH_MESSAGE,DELETE_FLASH_MESSAGE } from "../constants"
import shortid from "shortid"
import findIndex from "lodash/findIndex"

export default function flash(state=[],action){
    switch(action.type){
        case ADD_FLASH_MESSAGE:
            // 强调了一个事情：每一条数据都应该有唯一id
            return [
                ...state,
                {
                    id:shortid.generate(),
                    // id:Math.random().toString().slice(2),
                    type:action.message.type,
                    text:action.message.text
                }
            ];
        case DELETE_FLASH_MESSAGE:
            const index = findIndex(state,{id:action.id})
            if(index > -1){
                return [
                    ...state.slice(0,index),
                    ...state.slice(index+1)
                ]
            }
            return state;
        default:
            return state;
    }
}