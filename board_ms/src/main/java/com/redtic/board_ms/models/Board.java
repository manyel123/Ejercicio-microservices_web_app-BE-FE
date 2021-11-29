package com.redtic.board_ms.models;

import org.springframework.data.annotation.Id;
import java.util.Date;

public class Board {
    @Id
    private String id;
    private String username;
    private String publication;
    private Date pubDate;

    public Board(String id, String username, String publication, Date pubDate) {
        this.id = id;
        this.username = username;
        this.publication = publication;
        this.pubDate = pubDate;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPublication() {
        return publication;
    }

    public void setPublication(String publication) {
        this.publication = publication;
    }

    public Date getPubDate() {
        return pubDate;
    }

    public void setPubDate(Date pubDate) {
        this.pubDate = pubDate;
    }
}
