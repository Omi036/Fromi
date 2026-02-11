module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    
    roots: ['<rootDir>/src'],
    
    testMatch: [
    '**/tests/**/*.test.ts',
    '**/?(*.)+(spec|test).ts'
    ],
    
    moduleFileExtensions: ['ts', 'js', 'json'],
};