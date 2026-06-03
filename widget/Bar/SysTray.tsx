import AstalTray from "gi://AstalTray"
import {createBinding,For} from "ags"
import { Gtk } from "ags/gtk4";

export default function SysTray() {
    const tray = AstalTray.Tray.get_default();

    const itemsBinding = createBinding(tray,"items")

  const init = (btn: Gtk.MenuButton, item: AstalTray.TrayItem) => {
    btn.menuModel = item.menuModel
    btn.insert_action_group("dbusmenu", item.actionGroup)
    item.connect("notify::action-group", () => {
      btn.insert_action_group("dbusmenu", item.actionGroup)
    })
  }
    return (
        <box class="systray" spacing={4} valign={Gtk.Align.CENTER}>
            <For each={itemsBinding}>
                {(item) => (
                  <menubutton
                    class="systray-item"
                    $={(self) => init(self, item)}
                  >
                    <image class="systray-item-icon" gicon={createBinding(item, "gicon")}></image>
                  </menubutton>
                )}
            </For>
        </box>
    )

}