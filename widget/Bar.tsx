import app from "ags/gtk4/app"
import { Astal, Gdk,Gtk } from "ags/gtk4"
import { createPoll } from "ags/time"
import GLib from "gi://GLib"
import Hyprland from "gi://AstalHyprland"
import { createBinding, For } from "ags"


const clock = createPoll("", 1000, "date +%H:%M:%S")


function Logout(){
  return (
    <button class="logout-btn"
      onClicked={()=>{
        GLib.spawn_command_line_async("wlogout --protocol layer-shell -T 400 -B 400 -L 600 -R 600")
      }}
    >
      <label label=""></label>
    </button>
  )
}

function Workspaces() {
  const hypr = Hyprland.get_default()

  // 1. 处理工作区排序
  const processWorkspaces = (arr: Array<Hyprland.Workspace>) => {
    return arr.filter(ws => ws.id > 0).sort((a, b) => a.id - b.id)
  }
  const workspacesList = createBinding(hypr, "workspaces")(processWorkspaces)

  // 2. 🎯 核心黑科技：动态计算滑块的 margin-left 来实现物理滑动
  const indicatorCss = createBinding(hypr, "focusedWorkspace")((focused) => {
    const arr = processWorkspaces(hypr.get_workspaces());
    const index = arr.findIndex(ws => ws.id === focused?.id);
    const safeIndex = Math.max(0, index); // 防止刚启动时找不到焦点
    
    // 【数学魔法】
    // 假设每个按钮宽度是 30px，按钮之间的 spacing 是 4px
    // 那么滑块每次滑动的步长就是 30 + 4 = 34px
    return `margin-left: ${safeIndex * 34}px;`;
  })

  return (
    // 外层容器：轨道的底槽
    <box class="workspace-track">
      <overlay>
        
        {/* 底层 (Base)：一个纯粹的色块，它会根据 indicatorCss 左右滑动 */}
        <box halign={Gtk.Align.START} valign={Gtk.Align.CENTER}>
          <box class="indicator-block" css={indicatorCss} />
        </box>

        {/* 顶层 (Overlay)：实际的透明按钮和数字，盖在滑块上面 */}
        <box class="workspace-buttons" spacing={4}>
          <For each={workspacesList}>
            {(ws) => (
              <button
                class={createBinding(hypr, "focusedWorkspace")((focused) =>
                  focused?.id === ws.id ? "workspace-btn active" : "workspace-btn"
                )}
                onClicked={() => ws.focus()}
              >
                <label label={ws.id.toString()}></label>
              </button>
            )}
          </For>
        </box>
        
      </overlay>
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
    >\
    <centerbox>
      <box $type="start">

        <label class="arch-logo" label=""></label>
      </box>
      <box $type="center">
                <Workspaces/>
      </box>
      <box $type="end">
        <label label={clock}></label>
        <Logout/>
      </box>
    </centerbox>    
    </window>
  )
}
