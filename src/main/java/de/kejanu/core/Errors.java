package de.kejanu.core;

public class Errors {
    public static ServiceException runNotFound(String runId) {
        return new ServiceException(String.format("Run with id: %s not found", runId));
    }
}
