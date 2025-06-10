const sanitizeUsersData = (usersData) => {
    if (!usersData) return null;

    return {
        firstName: usersData.firstName || '',
        lastName: usersData.lastName || '',
        email: usersData.email || '',
        phoneNumber: usersData.phoneNumber || '',
        location: usersData.location || '',
        staffID: usersData.staffID|| '',
        numberOfCustomers: usersData.numberOfCustomers || 0
    };
};

module.exports = {
    sanitizeUsersData
};
