import Glib from "gi://GLib"


export default function Logout(){
  return (
    <button class="logout-btn"
      onClicked={()=>{
        Glib.spawn_command_line_async("wlogout --protocol layer-shell -T 400 -B 400 -L 600 -R 600")
      }}
    >
      <label label=""></label>
    </button>
  )
}