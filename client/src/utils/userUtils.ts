/**
 * Get user initials from email address (max 2 characters, uppercase).
 *
 * @example
 *   getUserInitials('john.doe@example.com') // 'JD'
 *   getUserInitials('jane@example.com')     // 'JA'
 *   getUserInitials(undefined)              // '??'
 */
export function getUserInitials(email: string | undefined | null): string {
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