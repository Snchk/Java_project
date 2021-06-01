package com.dut.forum.dao.domain;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "comments")
@Getter
@Setter
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @ManyToOne
    @JoinColumn(name = "discussion_id", nullable = false)
    private Discussion discussion;

    @ManyToOne
    @JoinColumn(name = "author_id", nullable = false)
    private User author;
    private LocalDateTime creationDate;

    @Length(min = 5, max = 9999)
    private String text;
}
