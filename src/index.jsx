import { render } from "preact";

import App from "./App";

render(<App />, document.getElementById("app"));

// Check if HMR is enabled and handle updates
if (import.meta.webpackHot) {
    import.meta.webpackHot.accept()
}