package de.kejanu.util;

import javax.persistence.*;
import java.time.Instant;
import java.util.UUID;

@MappedSuperclass
public class BaseEntity {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(name = "created_at")
    private Instant createdAt;

    @PrePersist
    private void generateCreatedAt() {
        createdAt =  Instant.now();
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public UUID getId() {
        return id;
    }
}
