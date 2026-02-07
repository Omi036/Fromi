# Managers
## Overview

Managers **encapsulate the logic and control over a particular domain**, such as logging, user management, or database interactions, without directly relying on other managers. This separation ensures modularity, maintainability, and predictable behavior.

## Structure and Philosophy

Managers are singleton classes responsible for a single domain of functionality.

Everything is orchestrated through Managers. For example, instead of using `console.log()`, the framework provides a `LoggerManager.info()` method that:

- Prettifies the message for console output (if desired),

- Saves the message to a log file.

This allows developers to standardize logging behavior across the entire application.

## Manager Rules

To ensure consistency and maintainability, Managers must follow these rules:

1. **Initialization**  
Every manager must implement an init() method and call it at the end of its file:
```js
MyManager.init();
```

2. **Isolation**  
Managers must not contact other managers directly. If access to another manager is required, the user must provide the necessary utilities explicitly.

3. **Consistency**  
Managers responsible for the same domain should not rename fields or change data structures across versions. Backward compatibility is key.

## Best Practices

- **Single Responsibility:** A manager should only handle one domain. Avoid combining multiple concerns in a single manager.

- **Encapsulation:** All internal logic and data should be private; expose only the necessary methods.

- **Singleton Usage:** Treat managers as singletons to avoid redundant instances and ensure centralized control.

## Example: LoggerManager
```js
class LoggerManager {
    static init() {
        // Setup logger, e.g., log files, console formatting
    }

    static info(message) {
        // Prettify console message
        console.log(`[INFO] ${message}`);
    }
}

// Initialize the manager
LoggerManager.init();
export { LoggerManager }

// Usage
LoggerManager.info("Application started successfully");
```