import app from "ags/gtk4/app"
import { Astal, Gdk, Gtk } from "ags/gtk4"
import Logout from "./Logout"
import Clock from "./Clock"
import Workspaces from "./Workspaces"

export default function Bar(gdkmonitor: Gdk.Monitor) {
    const { TOP, LEFT, RIGHT } = Astal.WindowAnchor

    return (
        <window
            visible
            name="bar"
            class="Bar"
            gdkmonitor={gdkmonitor}
            exclusivity={Astal.Exclusivity.EXCLUSIVE}
            anchor={TOP | LEFT | RIGHT}
            application={app}
        >\
            <centerbox>
                <box $type="start">

                    <label class="arch-logo" label=""></label>
                </box>
                <box $type="center">
                    <Workspaces />
                </box>
                <box $type="end" halign={Gtk.Align.END}>
                   <box class="system-module" spacing={4} valign={Gtk.Align.CENTER}>
                        <Clock />
                        
                    </box>
                    <Logout />
                </box>
            </centerbox>
        </window>
    )
}
