package br.edu.utfpr.pb.pw25s.server.config.security;

import lombok.SneakyThrows;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity
@Configuration
public class SecurityConfig {

    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtRequestFilter jwtRequestFilter;
    private final UserDetailsService userDetailsService;

    public SecurityConfig(JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint,
                          JwtRequestFilter jwtRequestFilter, UserDetailsService userDetailsService) {
        this.jwtAuthenticationEntryPoint = jwtAuthenticationEntryPoint;
        this.jwtRequestFilter = jwtRequestFilter;
        this.userDetailsService = userDetailsService;
    }

    @SneakyThrows
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http)  {
        http.cors().disable()
                .exceptionHandling()
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .and()
                .authorizeRequests()
                .antMatchers("/api/**").permitAll()
                .antMatchers("/api/users/login").permitAll()
                .antMatchers("/api/users").permitAll()
                .antMatchers("/api/account").permitAll()
                .antMatchers( "/api/movimentation").permitAll()
                .antMatchers("/api/category").permitAll()
                .antMatchers( "/api/users/**").permitAll()
                .antMatchers("/api/account/**").permitAll()
                .antMatchers("/api/movimentation/**").permitAll()
                .antMatchers("/**").permitAll()
                .antMatchers(HttpMethod.POST, "/api/usuarios").authenticated().anyRequest().authenticated().and()
                .exceptionHandling().authenticationEntryPoint(jwtAuthenticationEntryPoint).and().sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS).and().csrf().disable();

        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}