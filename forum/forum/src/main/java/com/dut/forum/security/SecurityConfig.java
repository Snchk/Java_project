package com.dut.forum.security;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@AllArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private UserDetailsService jwtUserDetailsService;
    private JwtRequestFilter jwtRequestFilter;

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(jwtUserDetailsService).passwordEncoder(passwordEncoder());
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        // We don't need CSRF for this example
        httpSecurity.httpBasic().disable()
                .csrf().disable()
                .cors().and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()

                .authorizeRequests()
                .antMatchers(HttpMethod.POST, "/auth/login", "/auth/register", "/auth/logout").permitAll()
                .antMatchers(HttpMethod.GET, "/auth/is-admin").hasRole("ADMIN")

                .antMatchers(HttpMethod.GET, "/comments", "/comments/discussion/{id}").permitAll()

                .antMatchers(HttpMethod.GET, "/discussions", "/discussions/{id}", "/discussions/topic/{id}", "/discussions/popular/{amount}").permitAll()

                .antMatchers(HttpMethod.GET, "/topics", "/topics/{id}").permitAll()
                .antMatchers(HttpMethod.POST, "/topics").hasRole("ADMIN")
                .antMatchers(HttpMethod.PUT, "/topics").hasRole("ADMIN")
                .antMatchers(HttpMethod.DELETE, "/topics/{id}").hasRole("ADMIN")

                .anyRequest().authenticated();

        // Add a filter to validate the tokens with every request
        httpSecurity.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
    }
}