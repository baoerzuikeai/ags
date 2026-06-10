import Hyprland from "gi://AstalHyprland"
import {createBinding,For} from "ags"
import { Gtk } from "ags/gtk4";
import { execAsync } from "ags/process"


function dispatchLua(luaExpression: string): void {
    // 2>&1 将标准错误重定向到标准输出，逼着 execAsync 能够抓到 Lua 的运行时报错
    execAsync(`sh -c "hyprctl eval '${luaExpression}' 2>&1"`)
        .then((output) => {
            // 如果内核返回了包含 error 关键字的脏数据，说明 Lua 语句内部执行失败了
            if (output && output.includes("error")) {
                print(`[Hyprland Lua 报错] ❌ 执行失败:\n${output.trim()}`);
            } else if (output && output.trim().length > 0) {
                // 打印其他正常的内核反馈（调试用）
                print(`[Hyprland 内核反馈]: ${output.trim()}`);
            }
        })
        .catch((err) => {
            // 这里捕获的是系统级错误（比如找不到 hyprctl 命令）
            print(`[系统级错误] 💥 进程拉起失败: ${err}`);
        });
}


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
                       onClicked={() => dispatchLua(`hl.dispatch(hl.dsp.focus({ workspace = '${ws.id}' }))`)}
                    ></button>
                )}
            </For>

        </box>
    )
}