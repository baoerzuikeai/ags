import app from "ags/gtk4/app"
import main from "./main.scss"
import Bar from "./widget/Bar"

app.start({
  css: main,
  main() {
    app.get_monitors().map(Bar)
  },
})
