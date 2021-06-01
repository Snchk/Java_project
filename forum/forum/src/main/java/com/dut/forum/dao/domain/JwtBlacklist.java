package com.dut.forum.dao.domain;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "jwt_blacklist")
@Data
@EqualsAndHashCode
@NoArgsConstructor
public class JwtBlacklist {
    public JwtBlacklist(String token){
        this.token = token;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(unique = true)
    private String token;
}
