let barChart = null;
let lineChart = null;

async function loadAnalytics() {

    const filters = {
        startDate: document.getElementById("startDate").value,
        endDate: document.getElementById("endDate").value,
        age: document.getElementById("ageFilter").value,
        gender: document.getElementById("genderFilter").value
    };

    const data = await apiRequest("/analytics", "POST", filters);

    console.log("Analytics Data:", data);

    const barCanvas = document.getElementById("barChart");
    const lineCanvas = document.getElementById("lineChart");

    const ctxBar = barCanvas.getContext("2d");
    const ctxLine = lineCanvas.getContext("2d");

    // 🔥 Destroy old charts
    if (barChart) barChart.destroy();
    if (lineChart) lineChart.destroy();

    // BAR
    barChart = new Chart(ctxBar, {
        type: "bar",
        data: {
            labels: data.bar.map(i => i.feature_name),
            datasets: [{
                label: "Feature Usage",
                data: data.bar.map(i => Number(i.total)),
                backgroundColor: "rgba(75,192,192,0.7)"
            }]
        }
    });

    // LINE
    lineChart = new Chart(ctxLine, {
        type: "line",
        data: {
            labels: data.line.map(i => i.date),
            datasets: [{
                label: "Clicks Over Time",
                data: data.line.map(i => Number(i.count)),
                borderColor: "blue",
                fill: false
            }]
        }
    });
}