function formatSpeed(speed) {
    let result = Number(speed);
    if (result < 10) return result.toFixed(2);
    if (result < 100) return result.toFixed(1);
    return result.toFixed(0);
}

function startTest() {
    const s = new Speedtest();

    s.onupdate = function (data) {
        document.getElementById("dlText").textContent = formatSpeed(
            data.dlStatus
        );
        document.getElementById("ulText").textContent = formatSpeed(
            data.ulStatus
        );
        document.getElementById("pingText").textContent = formatSpeed(
            data.pingStatus
        );
        document.getElementById("jitterText").textContent = formatSpeed(
            data.jitterStatus
        );
        switch (data.testState) {
            case -1:
                document.getElementById("stateText").textContent =
                    "Not Started";
                break;
            case 0:
                document.getElementById("stateText").textContent = "Starting";
                document.getElementById("startTest").disabled = true;
                break;
            case 1:
                document.getElementById("stateText").textContent =
                    "Download Test";
                break;
            case 2:
                document.getElementById("stateText").textContent =
                    "Ping + Jitter Test";
                document.getElementById("startTest").disabled = true;
                break;
            case 3:
                document.getElementById("stateText").textContent =
                    "Upload Test";
                break;
            case 4:
                document.getElementById("stateText").textContent = "Finished";
                document.getElementById("startTest").disabled = false;
                break;
            case 5:
                document.getElementById("stateText").textContent = "Aborted";
                document.getElementById("startTest").disabled = false;
                break;
            default:
                document.getElementById("stateText").textContent =
                    "Unknown State";
                document.getElementById("startTest").disabled = false;
        }
    };

    s.start();
}
