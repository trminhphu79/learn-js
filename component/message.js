import { store } from '../store/store.js';

function messageComponent() {
    function render() {
        console.log('re-render messageComponent');
        document.querySelector('#message').innerHTML = `
            <h1>Message list: </h1>
            ${store.getState().messages.messages.join('</br>')}
        `;
    }

    render(); //first rendering

    const selectedState = state => state?.messages?.messages;
    store.subscribe(render, selectedState);
    return () => {
        // handle unsubscribe store or clean up event listener
    }
}

export { messageComponent };