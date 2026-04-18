function trackEvent(feature) {
    apiRequest("/track", "POST", {
        feature_name: feature
    });
}

// Track each filter separately
document.getElementById("ageFilter").addEventListener("change", () => {
    trackEvent("age_filter");
});

document.getElementById("genderFilter").addEventListener("change", () => {
    trackEvent("gender_filter");
});

document.getElementById("startDate").addEventListener("change", () => {
    trackEvent("date_filter");
});

document.getElementById("endDate").addEventListener("change", () => {
    trackEvent("date_filter");
});