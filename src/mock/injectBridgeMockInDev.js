import { BridgeMock } from '@bridgelauncher/api-mock';

export default function injectBridgeMockInDev () {
    console.log('window', window)
    if (import.meta.env.DEV && !window.Bridge) {
        window.Bridge = new BridgeMock();
    }
}