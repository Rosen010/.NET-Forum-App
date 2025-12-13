/**
 * Get user initials from email address
 * @param {string} email - User's email address
 * @returns {string} Uppercase initials (max 2 characters)
 * 
 * @example
 * getUserInitials('john.doe@example.com') // returns 'JD'
 * getUserInitials('jane@example.com') // returns 'JA'
 */
export function getUserInitials(email) {
    if (!email || typeof email !== 'string' || !email.trim()) {
        return '??';
    }
    
    // Get the part before @ symbol
    const username = email.split('@')[0];
    
    // Split by common separators (., _, -)
    const parts = username.split(/[._-]/);
    
    if (parts.length >= 2) {
        // If we have multiple parts, take first letter of first two parts
        return (parts[0][0] + parts[1][0]).toUpperCase();
    } else {
        // If single word, take first two letters
        return username.slice(0, 2).toUpperCase();
    }
}