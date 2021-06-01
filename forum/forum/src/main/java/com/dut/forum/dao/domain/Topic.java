package com.dut.forum.dao.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "topics")
@Getter
@Setter
@NoArgsConstructor
public class Topic {

    public Topic(String name){
        this.name = name;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String name;

    @OneToMany(mappedBy="topic")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Set<Discussion> discussions;
}
