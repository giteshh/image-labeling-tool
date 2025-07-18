const checkboxData = [
    "potential_elephant",
    "train",
    "vehicle",
    "thermal_pop",
    "river",
    "stationary_walking",
    "walking",
    "repeating_impacts",
    "stationary_noise",
    "noise_burst",
    "glitch_fibre_break",
    "in_doubt",
    "sonic_beam",
    "no_class",
    "Missing_classification"
];

const container = document.getElementById("checkboxContainer");

checkboxData.forEach((item, index) => {
    const wrapper = document.createElement("div");
    wrapper.className = "checkbox-wrapper-47";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "cb";
    checkbox.id = `cb-${item}`;

    const label = document.createElement("label");
    label.setAttribute("for", `cb-${item}`);
    // Format label text: e.g., "thermal_pop" → "Thermal Pop"
    label.textContent = item.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase());

    wrapper.appendChild(checkbox);
    wrapper.appendChild(label);
    container.appendChild(wrapper);
});

