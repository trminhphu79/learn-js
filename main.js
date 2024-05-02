import { messageComponent } from "./component/message.js";
import { couterComponent } from "./component/counter.js";


(function () {
    function App() {


        function render() {
            const root = document.getElementById('app');

            const template = `
                <div id="app">
                    <div id="counter">
                        <h1>Counter App</h1>
                    </div>
                    <div id="message"></div>
                </div>
            `;

            root.innerHTML = template;
        }

        render();

        couterComponent();
        messageComponent();
    }

    App();
})();