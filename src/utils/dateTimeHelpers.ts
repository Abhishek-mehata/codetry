// Helper function to format time as 'hh:mm AM/PM'
export const formatTime = (time?: string): string => {
    if (!time) return "N/A";
    const [hourStr, minuteStr] = time.split(":");
    let hour = parseInt(hourStr, 10);
    const minute = minuteStr || "00";
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    return `${hour}:${minute} ${ampm}`;
};

// Helper function to format date as 'Weekday, Month Day, Year'
export const formatDate = (date?: string): string => {
    if (!date) return "N/A";
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}; 