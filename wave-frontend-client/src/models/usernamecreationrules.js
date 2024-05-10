const usernamerules = [
    {
        rule_name:'Length',
        rule_description:'Usernames must be 1 and 30 characters long'
    },
    {
        rule_name:'Characters Allowed',
        rule_description:'You can use letters(a-z),number(0-9),underscores(_), and periods(.). Periods cannot be used consecutively (eg.,..) and cannot appear at the beginning or end of a username.'
    },
    {
        rule_name:'Avoid Restricted Names',
        rule_description:'Avoid using names that imply you are an official soc or another entity that you are not (eg., using "Styx" or "admin" in your username).'
    },
    {
        rule_name:'Non-offensive',
        rule_description:'Choose a username that is not offensive or explicit. Styx reserves the right to remove or reclaim any username at any time for any reason.'
    }
]

module.exports = usernamerules;