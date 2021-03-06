const OFF = 0, WARN = 1, ERROR = 2;
module.exports = {
    "extends": ["eslint:recommended"],
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
        "no-unused-vars": WARN
    },
    "env": {
        "amd": true,
        "node": true,
        "browser": true
    }
}