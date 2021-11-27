package com.redtic.messagesms.exceptions;

public class MessagesNotFoundException extends RuntimeException {
    public MessagesNotFoundException(String message) {
        super(message);
    }
}
