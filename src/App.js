import React, { useEffect, useRef } from 'react';
import './styles.css';

function App() {
    const logsElem = useRef(null);

    useEffect(() => {
        const connectToLogs = () => {
            const url = 'https://cloud.dev/api/applications/management/logs/6683ada0006fb581989736ab'; // Replace with your actual endpoint

            const eventSource = new EventSource(url);

            eventSource.onmessage = (event) => {
                const logLine = event.data.trim();
                if (logsElem.current) {
                    logsElem.current.innerHTML += logLine + '\n';
                    logsElem.current.scrollTop = logsElem.current.scrollHeight; // Scroll to bottom
                }
            };

            eventSource.onerror = (err) => {
                console.error('EventSource error:', err);
                eventSource.close();
                if (logsElem.current) {
                    logsElem.current.innerHTML += 'Error fetching logs.\n';
                }
            };
        };

        connectToLogs();
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <h1>Live Pod Logs</h1>
                <pre id="logs" ref={logsElem}></pre>
            </header>
        </div>
    );
}

export default App;
