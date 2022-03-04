package com.example.wylie_kmj;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class WylieKmjApplication {

    public static void main(String[] args) {
        SpringApplication.run(WylieKmjApplication.class, args);
    }

}
