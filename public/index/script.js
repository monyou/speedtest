function startTest() {
    const s = new Speedtest();

    s.onupdate = function (data) {
        document.getElementById("dlText").textContent =
            (data.dlStatus * 10).toFixed(2) || "0.00";
        document.getElementById("ulText").textContent =
            (data.ulStatus / 10).toFixed(2) || "0.00";
        document.getElementById("pingText").textContent =
            data.pingStatus || "0.00";
        document.getElementById("jitterText").textContent =
            data.jitterStatus || "0.00";
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
