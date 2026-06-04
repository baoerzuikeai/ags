import { createPoll } from "ags/time"
import { Gtk } from "ags/gtk4"

const clock = createPoll("", 1000, "date +%H:%M:%S")

export default function Clock() {
    const calendar = Gtk.Calendar.new()
    const calendarPopover = Gtk.Popover.new()
    calendarPopover.set_child(calendar)
    return (
        <menubutton
            popover={calendarPopover}
        >
            <box spacing={4}>
                <label label="󰃭" class="clock-icon" /> {/* 日历/时钟图标 */}
                <label label={clock}></label>
            </box>
        </menubutton>

    )
}