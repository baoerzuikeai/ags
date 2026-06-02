import Hyprland from "gi://AstalHyprland"
import {createBinding,For} from "ags"
import { Gtk } from "ags/gtk4";



export default function Workspaces() {
    const hypr = Hyprland.get_default();
    const proccessworkspaces = (arr:Array<Hyprland.Workspace>) => {
        return arr.filter(ws => ws.id > 0).sort((a,b)=> a.id - b.id)
    }

    const workspaceslist = createBinding(hypr,"workspaces")(proccessworkspaces)

    return (
        <box class="workspace-pill-container" spacing={6} valign={Gtk.Align.CENTER}>
            <For each = {workspaceslist}>
                {(ws)=>(
                    <button
                        class ={createBinding(hypr,"focusedWorkspace")((focused) =>
                             focused?.id === ws.id ? "workspace-dot active" : "workspace-dot")}
                        onClicked={() => ws.focus()}     
                    ></button>
                )}
            </For>

        </box>
    )
}