package com.fin.auth.config.security.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.crypto.SecretKey;
import java.io.IOException;
import java.util.List;

public class JwtTokenValidator extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String jwt = request.getHeader(IJwtConstant.JWT_HEADER);

        if(jwt!=null) {
            jwt=jwt.substring(7);

            System.out.println("jwt :: ====> "+jwt);

            try {

                SecretKey key= Keys.hmacShaKeyFor(IJwtConstant.SECRET_KEY.getBytes());

                Claims claims= Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt).getBody();

                String username=String.valueOf(claims.get("username"));

                System.out.println("username :: "+username);

                String authorities=String.valueOf(claims.get("authorities"));

                //System.out.println("authorities -------- "+authorities);

                List<GrantedAuthority> auths= AuthorityUtils.commaSeparatedStringToAuthorityList(authorities);
                Authentication athentication=new UsernamePasswordAuthenticationToken(username,null, auths);

                SecurityContextHolder.getContext().setAuthentication(athentication);

            } catch (Exception e) {
                throw new BadCredentialsException("invalid token...");
            }
        }
        filterChain.doFilter(request, response);

    }
}