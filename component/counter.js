import { store } from '../store/store.js';

function couterComponent() {

    function increase() {
        console.log('increase');
        store.dispatch({ type: 'INCREMENT' });
    }

    function decrease() {
        console.log('decrease');
        store.dispatch({ type: 'DECREMENT' });
    }


    function render() {
        console.log('re-render couterComponent');
        const { counter: counterState } = store.getState();

        // Add the HTML to the document
        console.log("counterState", counterState);

        let template = `
            <h1>Count: ${counterState?.count} </h1>
            <button id="increase">Increase</button>
            <button id="decrease">Decrease</button>
            `;


        document.querySelector('#counter').innerHTML = template;

        document.getElementById('increase').onclick = increase;
        document.getElementById('decrease').onclick = decrease;
    }

    render(); //first rendering


    const selectedState = state => state?.counter?.count;
    
    store.subscribe(render, selectedState);

    // called when component is unmounted / destroyed
    return () => {
        console.log('unmount');
        // handle unsubscribe store or clean up event listener
        document.getElementById('increase').onclick = null;
        document.getElementById('decrease').onclick = null;
    }
}

export { couterComponent };