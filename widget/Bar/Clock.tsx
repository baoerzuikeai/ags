import {createPoll} from "ags/time"

const clock = createPoll("", 1000, "date +%H:%M:%S")

export default function Clock(){
    return (
       < label label={clock}></label>
    )
}