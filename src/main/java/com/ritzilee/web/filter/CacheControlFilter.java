package com.ritzilee.web.filter;

import org.springframework.core.annotation.Order;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by steveliem on 11/04/2017.
 */
@Component
@Order(1)
public class CacheControlFilter extends OncePerRequestFilter {

    private final String cacheControl = "no-cache;no-store;max-age=0";

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        response.addHeader(HttpHeaders.CACHE_CONTROL, this.cacheControl);
        response.addHeader(HttpHeaders.PRAGMA,"no-cache");
        response.setHeader("X-Frame-Options", "DENY");
        filterChain.doFilter(request, response);
    }
}
