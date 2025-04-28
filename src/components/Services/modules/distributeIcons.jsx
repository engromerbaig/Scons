// Function to distribute icons across rows
export const distributeIcons = (icons, rows = 3, maxFirstRow = 5) => {
    if (!icons?.length) return [];
    
    // First row gets less than half of total icons
    const firstRowCount = Math.min(maxFirstRow, Math.floor(icons.length / 2));
    const remainingIcons = icons.length - firstRowCount;
    
    // Distribute remaining icons between the rest of the rows
    const remainingRows = rows - 1;
    const baseCountPerRow = Math.floor(remainingIcons / remainingRows);
    const extraIcons = remainingIcons % remainingRows;

    // Create rows dynamically
    const iconRows = [];
    iconRows.push(icons.slice(0, firstRowCount)); // First row
    let startIndex = firstRowCount;
    for (let i = 0; i < remainingRows; i++) {
        const rowCount = baseCountPerRow + (i < extraIcons ? 1 : 0);
        iconRows.push(icons.slice(startIndex, startIndex + rowCount));
        startIndex += rowCount;
    }

    return iconRows.filter(row => row.length > 0); // Only return rows with icons
};
