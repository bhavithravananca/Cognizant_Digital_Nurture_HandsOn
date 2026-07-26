package com.cognizant.springlearn.util;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import java.security.Key;
import java.util.Date;

public class JwtUtil {

    // Secret key (must be at least 32 characters for HS256)
    private static final String SECRET =
            "mysecretkeymysecretkeymysecretkey12";

    private static final Key KEY =
            Keys.hmacShaKeyFor(SECRET.getBytes());

    // Token validity: 20 minutes
    private static final long TOKEN_VALIDITY = 20 * 60 * 1000;

    public static String generateToken(String username) {

        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + TOKEN_VALIDITY))
                .signWith(KEY, SignatureAlgorithm.HS256)
                .compact();
    }

}
