package com.dut.forum.dao.domain;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Table(name = "discussions")
@Getter
@Setter
@EqualsAndHashCode
public class Discussion {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @ManyToOne
    @JoinColumn(name = "topic_id", nullable = false)
    private Topic topic;

    @ManyToOne
    @JoinColumn(name = "author_id", nullable = false)
    private User author;
    private LocalDateTime creationDate;

    private String title;

    @Length(max = 9999)
    private String text;

    @OneToMany(mappedBy="discussion")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Set<Comment> comments;

    @ManyToMany(mappedBy = "savedDiscussions")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Set<User> users;
}
