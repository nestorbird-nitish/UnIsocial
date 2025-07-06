

export const checkIsCurrentUser = async (username) => {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`http://localhost:3000/api/users/${username}/is-current-user`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to verify user');
        }

        return data.isCurrentUser;
    } catch (error) {
        console.error('Error checking current user:', error.message);
        return false; // fallback to false on error
    }
};
