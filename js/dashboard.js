async function loadAnalytics() {

    const filters = {
        startDate: document.getElementById("startDate").value,
        endDate: document.getElementById("endDate").value,
        age: document.getElementById("ageFilter").value,
        gender: document.getElementById("genderFilter").value
    };

    const data = await apiRequest("/analytics", "POST", filters);

    console.log("Analytics Data:", data);

    // BAR
    const barLabels = data.bar.map(item => item.feature_name);
    const barValues = data.bar.map(item => Number(item.total));

    const ctxBar = document.getElementById("barChart").getContext("2d");

    new Chart(ctxBar, {
        type: "bar",
        data: {
            labels: barLabels,
            datasets: [{
                label: "Feature Usage",
                data: barValues,
                backgroundColor: "rgba(75,192,192,0.7)"
            }]
        }
    });

    // LINE
    const lineLabels = data.line.map(item => item.date);
    const lineValues = data.line.map(item => Number(item.count));

    const ctxLine = document.getElementById("lineChart").getContext("2d");

    new Chart(ctxLine, {
        type: "line",
        data: {
            labels: lineLabels,
            datasets: [{
                label: "Clicks Over Time",
                data: lineValues,
                borderColor: "blue",
                fill: false
            }]
        }
    });
}