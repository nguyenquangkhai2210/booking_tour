/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package khainq.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import javax.servlet.http.HttpServletRequest;
import java.util.*;

/**
 *
 * @author khainguyenquang
 */
public class TokenAuthencationService {

    public static final String SECRET = "Fcode";
    public static final long EXPIRATION_TIME = 864_000_000; // 10 days
    public static final String HEADER_STRING = "Authorization";

    public String addAuthentication(String username, String isAdmin) {
        String token = JWT.create().withSubject(username).withExpiresAt(new Date(System.currentTimeMillis() + EXPIRATION_TIME)).withClaim("isAdmin", isAdmin).sign(Algorithm.HMAC512(SECRET.getBytes()));
        return token;
    }

    public String getRoleFromAuthentication(HttpServletRequest request) {
        String token = request.getHeader(HEADER_STRING).replace("Bearer ", "");
        String role = null;
        if (token != null) {
            // parse the token.

            role = JWT.require(Algorithm.HMAC512(SECRET.getBytes()))
                    .build()
                    .verify(token)
                    .getClaim("isAdmin").asString();
        }
        return role;
    }
    
    public String getUserFromAuthentication(HttpServletRequest request) {
        String token = request.getHeader(HEADER_STRING).replace("Bearer ", "");
        String username = null;
        if (token != null) {
            // parse the token.

            username = JWT.require(Algorithm.HMAC512(SECRET.getBytes()))
                    .build()
                    .verify(token)
                    .getSubject();
        }
        return username;
    }
}
