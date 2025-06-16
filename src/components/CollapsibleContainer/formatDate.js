export const formatDate = (dateString) => {
    if (!dateString) return 'N/A'; // Handle null/undefined cases
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return 'N/A'; // Handle invalid dates
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('en-US', options); // e.g., "16 June 2025"
    } catch {
        return 'N/A';
    }
};