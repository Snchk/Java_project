package com.dut.forum.dao.domain;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "roles")
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode
public class Role {

    public Role(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    @ManyToMany(mappedBy = "roles", fetch = FetchType.LAZY)
    private List<User> users;

    @Override
    public String toString() {
        return "Role{" +
                "id: " + id + ", " +
                "name: " + name + "}";
    }
}
