import app from "ags/gtk4/app"
import { Astal, Gtk, Gdk } from "ags/gtk4"
import { createPoll } from "ags/time"


const clock = createPoll("", 1000, "date")

function Left(){
  return(
    <box class="arch-container">
      <label class="arch-logo" label="󰣇"></label>
     </box>
  )
}

function Right(){
  return(
    <box class="clock-container">
      <label class="clock" label={clock}></label>
     </box>
  )
}

export default function Bar(gdkmonitor:Gdk.Monitor) {
   const {TOP,LEFT,RIGHT} =Astal.WindowAnchor

  return (
    <window 
      visible
      name="bar" 
      class="Bar" 
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={TOP | LEFT | RIGHT}
      application={app}
    >
      <centerbox class="main-container">
       <Left/> 
       <box/>
       <Right/>
      </centerbox>
      
    </window>
  )
}
