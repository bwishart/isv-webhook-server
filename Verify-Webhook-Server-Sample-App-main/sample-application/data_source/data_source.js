// 
// Copyright contributors to the IBM Security Verify Bridge for Authentication Sample App project
// 

data_source = {
    scott1111: {
        id: 1,
        password: "scott11111",
        displayName: "Scott",
        givenName: "Scott",
        SN: "Admin",
        emailAddress: "scott1111@yopmail.com",
        cn: "Scott Admin",
        category: "device",
        score: "90",
        action: "ACTION_MFA_ALWAYS",
        employee_number: "AG38US",
        mobile_number: "111-222-3333",
        accountLocked: false,
        passwordExpired: false,
        groups: [
            {
                'name': 'developer',
                'id': '608000GTNH'
            }, 
            {
                'name': 'admin',
                'id': '608000GTNF'
            }
        ]
    },
    alice2222: {
        id: 2,
        password: "alice22222",
        displayName: "Alice",
        givenName: "Alice",
        SN: "Developer",
        emailAddress: "alice2222@yopmail.com",
        cn: "Alice Developer",
        category: "device",
        score: "0",
        action: "ACTION_ALLOW",
        employee_number: "CS22US",
        mobile_number: "555-555-5555",
        accountLocked: false,
        passwordExpired: false,
        groups: [
            {
                'name': 'developer',
                'id': '608000GTNH'
            }
        ]
    },
    jessica3333: {
        id: 3,
        password: "jessica11111",
        displayName: "Jess",
        givenName: "Jessica",
        SN: "User",
        emailAddress: "jessica3333@yopmail.com",
        cn: "Jessica User",
        category: "device",
        score: "90",
        action: "ACTION_MFA_ALWAYS",
        employee_number: "MA86US",
        mobile_number: "555-555-5555",
        accountLocked: false,
        passwordExpired: false,
        groups: []
    }
}

module.exports = data_source;